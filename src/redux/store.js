import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";
import auth from "./services/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// configure listeners using the provided defaults
setupListeners(store.dispatch);

//example for adding additional apiendpoints https://github.com/wpcodevo/setup-redux-toolkit/blob/master/src/redux/store.ts
