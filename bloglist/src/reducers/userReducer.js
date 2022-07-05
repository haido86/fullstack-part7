import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    appendUser(state, action) {
      return [...state, action.payload];
    },
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { appendUser, setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUser();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
