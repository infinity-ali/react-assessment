import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // This uses localStorage by default
import favoritesReducer from "./features/favoritesSlice";
import { combineReducers } from "redux";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites"], // Only persist the 'favorites' slice
};

// Combine reducers (in case you have more slices in the future)
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the middleware configuration to handle non-serializable values
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore actions related to persistence
        ignoredPaths: ["favorites"], // Ignore the favorites path from serializability checks
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
