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

    logoutUser: (state) => {
      localStorage.removeItem("picShelf_access_token");
      state.isAuthenticated = false;
    },
  },
});

export const { logInUser, logoutUser } = authSlice.actions;
export default authSlice;
