import { useSelector, useDispatch } from 'react-redux';
import { incrementVotes } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    } else {
      return state.anecdotes;
    }
  });

  // We sort the anecdotes by the number of votes they have. In redux the state is immutable, so we need to create a copy of the array of anecdotes before sorting it.
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(incrementVotes(id));

    const anecdote = sortedAnecdotes.find((anecdote) => anecdote.id === id);

    if (anecdote) {
      dispatch(
        setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5)
      );
    } else {
      console.error(`No anecdote found with id: ${id}`);
    }
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
