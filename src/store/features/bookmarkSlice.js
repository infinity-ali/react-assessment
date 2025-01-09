import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the favorites list
const initialState = {
  favoritesBookmark: [],
  bookmarkProjects: [], // Store projects here
  singleBookmarkProjects: null, // Store projects here
  addBookmarkProject: null, // Store projects here
  updateBookmarkProject: null, // Store projects here
  removeBookmarkProject: null, // Store projects here
  bookmarkStatus: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
  bookmarkError: null,
};

// Thunk to fetch projects from the mock API
export const fetchBookmarkProjects = createAsyncThunk(
  "bookmark/fetchBookmarkProjects",
  async (arg) => {
    const response = await axios.get(
      "https://677fcfb20476123f76a83b79.mockapi.io/api/v1/FavoriteProject"
    ); // Assume your mock API endpoint
    return response;
  }
);

export const fetchSingleBookmarkProjects = createAsyncThunk(
  "bookmark/fetchSingleBookmarkProjects",
  async (arg) => {
    const response = await axios.get(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1//FavoriteProject/${arg.id}`
    ); // Assume your mock API endpoint
    return response;
  }
);

// Thunks for adding/removing favorites asynchronously
export const addBookmarkProjects = createAsyncThunk(
  "bookmark/addBookProjects",
  async (project) => {
    const response = await axios.post(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/FavoriteProject`,
      project
    );
    return response; // Assume API returns the updated favorite list
  }
);

// Thunks for adding/removing favorites asynchronously
export const updateBookmarkProjects = createAsyncThunk(
  "bookmark/updateBookProjects",
  async ({ id, project }) => {
    const response = await axios.put(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/FavoriteProject/${id}`,
      project
    );
    return response; // Assume API returns the updated favorite list
  }
);

export const removeBookmarkProject = createAsyncThunk(
  "bookmark/removeBookmarkProjects",
  async (id) => {
    const response = await axios.delete(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1//FavoriteProject/${id}`
    );
    return response; // Assume API returns the updated favorite list
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarkProjects.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(fetchBookmarkProjects.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        state.bookmarkProjects = action.payload; // Store fetched data in state
      })
      .addCase(fetchBookmarkProjects.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleBookmarkProjects.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(fetchSingleBookmarkProjects.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        state.singleBookmarkProjects = action.payload.data; // Store fetched data in state
      })
      .addCase(fetchSingleBookmarkProjects.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.bookmarkError = action.error.message;
      })
      .addCase(addBookmarkProjects.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(addBookmarkProjects.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        state.addBookmarkProject = action.payload; // Store fetched data in state
      })
      .addCase(addBookmarkProjects.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.bookmarkError = action.error.message;
      })
      .addCase(updateBookmarkProjects.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(updateBookmarkProjects.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        state.updateProject = action.payload; // Store fetched data in state
      })
      .addCase(updateBookmarkProjects.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.bookmarkError = action.error.message;
      })
      .addCase(removeBookmarkProject.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(removeBookmarkProject.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        state.removeBookmarkProject = action.payload; // Store fetched data in state
      })
      .addCase(removeBookmarkProject.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.bookmarkError = action.error.message;
      });
  },
});

export default bookmarkSlice.reducer;
