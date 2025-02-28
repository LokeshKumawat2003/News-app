import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewsFilter.css";

const categoryLabels = {
    all: "All News",
    tech: "Technology",
    business: "Business & Finance",
    sports: "Sports & Athletics",
    entertainment: "Entertainment & Media",
    health: "Health & Wellness",
};

const NewsFilter = ({ categories, selectedCategory, onCategoryChange, onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <img
                    src="https://media.istockphoto.com/id/929047972/vector/world-news-flat-vector-icon-news-symbol-logo-illustration-business-concept-simple-flat.jpg?s=612x612&w=0&k=20&c=5jpcJ7xejjFa2qKCzeOXKJGeUl7KZi9qoojZj1Kq_po="
                    alt="News Logo"
                />
                <span>NewsPortal</span>
            </div>

            <div className="navbar-categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`category-button ${selectedCategory === category ? "active" : ""}`}
                    >
                        {categoryLabels[category] || category}
                    </button>
                ))}
            </div>

            <div className="navbar-buttons">
                <button className="nav-button" onClick={() => navigate("/")}>Home</button>
                <button className="nav-button" onClick={() => navigate("/add-news")}>Add News</button>
            </div>
        </nav>
    );
};

export default NewsFilter;
