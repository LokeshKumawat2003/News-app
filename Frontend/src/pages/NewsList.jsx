import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./../redux/newsSlice";
import NewsFilter from "../componets/NewsFilter";
import "../pageStyle/newlist.css";

const NewsList = () => {
  const dispatch = useDispatch();
  const { newsList, status } = useSelector((state) => state.news);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === "loading") return <p className="loading">Loading news...</p>;
  if (status === "failed") return <p className="error">Error loading news.</p>;

  const categories = ["all", ...new Set(newsList.map((news) => news.category))];

  const filteredNews =
    selectedCategory === "all"
      ? newsList
      : newsList.filter((news) => news.category === selectedCategory);

  return (
    <div className="news-container">
      <h2 className="news-header">Latest News</h2>

      <div className="filter-section">
        <NewsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="news-list">
        {filteredNews.map((news) => (
          <div key={news._id} className="news-card">
            <h3 className="news-title">{news.title}</h3>
            <p className="news-category">
              <strong>Category:</strong> {news.category}
            </p>
            <p className="news-content">{news.content}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
