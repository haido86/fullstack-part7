import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  isShow: false,
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      // console.log('action', action);
      state.content = action.payload.content;
      state.type = action.payload.type;
      state.isShow = true;
    },
    clearNotification(state) {
      state.isShow = false;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

let timeOutId = null;

export const setNotification = (content, duration, type) => {
  return async (dispatch) => {
    await dispatch(showNotification({ content, duration, type }));
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };
};

export default notificationSlice.reducer;
