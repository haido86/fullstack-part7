import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    appendComment(state, action) {
      return [...state, action.payload];
    },
    setComments(state, action) {
      return action.payload;
    },
  },
});

export const { appendComment, setComments } = commentSlice.actions;

export default commentSlice.reducer;
