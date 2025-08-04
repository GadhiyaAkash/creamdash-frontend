import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Define your initial state properties here
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    }
});

export const { 
    setUser, 
    clearUser 
} = userSlice.actions;

export default userSlice.reducer;