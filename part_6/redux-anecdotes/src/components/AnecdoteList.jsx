import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVote(id));

    // Find the anecdote from your state
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

    if (anecdote) {
      dispatch(setNotification(`You voted for '${anecdote.content}'`));
    } else {
      console.error(`No anecdote found with id: ${id}`);
    }
  };

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
