import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// Redux Toolkit's createSlice function doesn't directly support async actions, but with the help of the redux-thunk middleware, we can create async action creators outside of the slice.
// This is an async action creator that dispatches the setNotification action with the message as the payload
export const setNotificationWithTimeout = (message, duration) => dispatch => {
  dispatch(setNotification(message));
  setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000);
};

export default notificationSlice.reducer;
