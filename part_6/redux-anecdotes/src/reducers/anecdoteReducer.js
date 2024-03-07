import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
});

export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
}

export const incrementVotes = (id) => {
  return async (dispatch, getState) => {
    const updatedAnecdote = await anecdoteService.vote(id);
    const anecdotes = getState().anecdotes;
    const updatedAnecdotes = anecdotes.map(anecdote =>
      anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
    );
    dispatch(setAnecdotes(updatedAnecdotes));
  };
};

export default anecdotesSlice.reducer;