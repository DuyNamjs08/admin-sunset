import counterReducer from "../feature/homeSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    home: counterReducer,
  },
});
