import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../pageStyle/form.css";

const NewsForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      setError("All fields are required!");
      return;
    }

    setError("");
    const newNews = { title, category, content };

    try {
      const response = await fetch("http://localhost:3000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNews),
      });

      if (response.ok) {
        setTitle("");
        setCategory("");
        setContent("");
      } else {
        setError("Error adding news.");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Add News</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-select"
          >
            <option value="" disabled>Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Politics">Politics</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      <button className="home-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NewsForm;
