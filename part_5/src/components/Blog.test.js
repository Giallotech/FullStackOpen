import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: { username: 'mluukkai', name: 'Matti Luukkainen', id: '64262adc91d18a56a7e95b86' }
  }

  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai'
  }

  const mockHandler = jest.fn()

  // eslint-disable-next-line no-unused-vars
  let container

  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      user={user}
      handleLikes={mockHandler}
    />).container
  })

  test('renders content', () => {
    const title = screen.getByText('Type wars', { exact: false })
    const author = screen.getByText('Robert C. Martin', { exact: false })
    const likes = screen.queryByText(2)
    const url = screen.queryByText(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('after clicking the view button, the URL and number of likes are shown', async () => {
    const event = userEvent.setup()
    const button = container.querySelector('.viewButton')
    await event.click(button)

    const title = screen.getByText('Type wars', { exact: false })
    const author = screen.getByText('Robert C. Martin', { exact: false })
    const likes = screen.queryByText(2)
    const url = screen.queryByText(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )


    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(likes).toBeVisible()
    expect(url).toBeVisible()
  })

  test('clicking the button calls event handler once', async () => {
    const event = userEvent.setup()
    const button = container.querySelector('.viewButton')
    await event.click(button)

    const likeButton = container.querySelector('.likeButton')
    await event.click(likeButton)
    await event.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

