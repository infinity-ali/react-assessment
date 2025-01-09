import favoritesReducer from "./features/favoritesSlice";
import bookmarkReducer from "./features/bookmarkSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
