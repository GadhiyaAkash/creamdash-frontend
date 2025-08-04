import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success', // e.g., 'success', 'error', 'info'
  isVisible: false,
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.isVisible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideNotification(state) {
      state.isVisible = false;
    },
  },
});

export const { 
  showNotification, 
  hideNotification 
} = notificationSlice.actions;

// // This is an action creator "thunk" that will let us show a notification
// // and automatically hide it after a few seconds.
export const notify = (payload) => (dispatch) => {
  dispatch(showNotification(payload));
  setTimeout(() => {
    dispatch(hideNotification());
  }, 3000); // The notification will disappear after 3 seconds
};

export default notificationSlice.reducer;
