import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const anecdotes = await axios.get(baseUrl);
  const anecdoteToChange = anecdotes.data.find((n) => n.id === id);
  const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 };
  const updatedAnecdote = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return updatedAnecdote.data;
};

export default { getAll, createNew, vote }