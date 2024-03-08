import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        notification: `New anecdote '${newAnecdote.content}' created!`,
      });
      setTimeout(
        () => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }),
        5000
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    if (content.length < 5) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Anecdote must be at least 5 characters long.',
      });
      setTimeout(
        () => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }),
        5000
      );
      return;
    }

    newAnecdoteMutation.mutate({ content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
