import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the favorites list
const initialState = {
  favorites: [],
  projects: [], // Store projects here
  singleProjects: null, // Store projects here
  addProject: null, // Store projects here
  updateProject: null, // Store projects here
  removeProject: null, // Store projects here
  status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

// Thunk to fetch projects from the mock API
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (arg) => {
    const response = await axios.get(
      "https://677fcfb20476123f76a83b79.mockapi.io/api/v1/projects"
    ); // Assume your mock API endpoint
    return response;
  }
);

export const fetchSingleProjects = createAsyncThunk(
  "projects/fetchSingleProjects",
  async (arg) => {
    const response = await axios.get(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/projects/${arg.id}`
    ); // Assume your mock API endpoint
    return response;
  }
);

// Thunks for adding/removing favorites asynchronously
export const addProjects = createAsyncThunk(
  "projects/addProjects",
  async (project) => {
    const response = await axios.post(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/projects`,
      project
    );
    return response; // Assume API returns the updated favorite list
  }
);

// Thunks for adding/removing favorites asynchronously
export const updateProjects = createAsyncThunk(
  "projects/updateProjects",
  async ({ id, project }) => {
    const response = await axios.put(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/projects/${id}`,
      project
    );
    return response; // Assume API returns the updated favorite list
  }
);

export const removeProject = createAsyncThunk(
  "projects/removeProjects",
  async (project) => {
    const response = await axios.delete(
      `https://677fcfb20476123f76a83b79.mockapi.io/api/v1/projects/${project.id}`
    );
    return response; // Assume API returns the updated favorite list
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      // Check if the project is already in favorites
      const existingProject = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProject) {
        state.favorites.push(action.payload); // Add to favorites
      }
    },
    removeFavorite: (state, action) => {
      // Remove the project from favorites
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload; // Store fetched data in state
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProjects = action.payload.data; // Store fetched data in state
      })
      .addCase(fetchSingleProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addProjects = action.payload; // Store fetched data in state
      })
      .addCase(addProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateProject = action.payload; // Store fetched data in state
      })
      .addCase(updateProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.removeProject = action.payload; // Store fetched data in state
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
