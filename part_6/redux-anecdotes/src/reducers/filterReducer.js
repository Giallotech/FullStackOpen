import { createSlice } from '@reduxjs/toolkit';
// createSlice automatically generates action creators and action types

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;

export default filterSlice.reducer;