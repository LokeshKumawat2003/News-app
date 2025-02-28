import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch("http://localhost:3000/news");
  const data = await response.json();
  return data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    status: "idle",
  },
  reducers: {
    addnews: (state, action) => {
      state.newsList.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newsList = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addnews } = newsSlice.actions;
export default newsSlice.reducer;
