import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const createButton = screen.getByText('create')

  await user.type(titleInput, 'this is a title...')
  await user.type(authorInput, 'this is an author...')
  await user.type(urlInput, 'this is an url...')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a title...')
  expect(createBlog.mock.calls[0][0].author).toBe('this is an author...')
  expect(createBlog.mock.calls[0][0].url).toBe('this is an url...')
})