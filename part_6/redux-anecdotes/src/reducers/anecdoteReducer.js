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

// Redux Toolkit's createSlice function doesn't directly support async actions, but with the help of the redux-thunk middleware, we can create async action creators outside of the slice.

// This is an async action creator that dispatches the setAnecdotes action with the anecdotes as the payload
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
}

// This is an async action creator that dispatches the appendAnecdote action with the new anecdote as the payload
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
}

// This is an async action creator that dispatches the setAnecdotes action with the updated anecdotes as the payload
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