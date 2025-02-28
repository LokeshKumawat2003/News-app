import io from "socket.io-client";
import store from "./store";
import { addnews } from "./newsSlice";

const socket = io("http://localhost:3000");

socket.on("newsUpdated", (newNews) => {
  store.dispatch(addnews(newNews));
});

export default socket;
