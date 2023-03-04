import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: false,
  isAdmin: false,
  userData: null,
 
  
};

const authSlice = createSlice({
  name: "auth",

  initialState: initialAuthState,

  reducers: {
    login(state, action) {
      
      state.loggedIn = true;
      
      state.isAdmin = action.payload.isAdmin;
      state.userData = action.payload;
      
    },

    logout: (state) => initialAuthState,

    
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
