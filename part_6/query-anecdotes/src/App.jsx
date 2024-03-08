import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateVotes } from './requests';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => queryClient.invalidateQueries('anecdotes'),
  });

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote);
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      notification: `You voted '${anecdote.content}'`,
    });
    setTimeout(
      () => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }),
      5000
    );
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server.</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
