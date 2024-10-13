import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMess: false,
  message: "",
  type: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    showMessageSuccesss: (state, action) => {
      state.showMess = true;
      state.message = action.payload;
      state.type = "success";
    },
    showMessageError: (state, action) => {
      state.showMess = true;
      state.message = action.payload;
      state.type = "error";
    },

    resetMessage: (state) => {
      state.showMess = false;
      state.message = "";
    },
  },
});

export const { showMessageSuccesss, showMessageError, resetMessage } =
  counterSlice.actions;

export default counterSlice.reducer;
