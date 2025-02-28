import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsList from "../pages/NewsList";
import NewsForm from "../pages/NewsForm";

export const AllRoutes = () => {
  return (
   <x className="rou">
    <Routes>
      <Route path="/" element={<NewsList />} />
      <Route path="/add-news" element={<NewsForm />} />
    </Routes>
   </x>
  );
};
