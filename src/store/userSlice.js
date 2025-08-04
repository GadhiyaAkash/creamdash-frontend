import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Or your default user state, e.g., { name: '', email: '' }
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
