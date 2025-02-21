import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("picShelf_access_token") || false, // double negation
    status: "idle",
    error: null,
  },

  reducers: {
    logInUser: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { logInUser } = authSlice.actions;
export default authSlice;
