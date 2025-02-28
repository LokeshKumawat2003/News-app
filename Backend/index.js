const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const getDb = require("./config/server");
const NewsModel = require("./models/newsModel");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/news", async (req, res) => {
  try {
    const newsData = await NewsModel.aggregate([
      { $sort: { timestamp: -1 } },
      { $limit: 20 },
    ]);
    res.status(200).json(newsData);
  } catch (error) {
    console.error("Fetching news err:", error.message);
    res.status(500).json({ message: "Fetching news error" });
  }
});

app.post("/news", async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newsDataPost = new NewsModel({ title, category, content });
    const savedData = await newsDataPost.save();

    io.emit("newsUpdated", savedData);

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Adding news err:", error.message);
    res.status(500).json({ message: "Adding news error" });
  }
});

const startServer = () => {
  getDb();
  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
