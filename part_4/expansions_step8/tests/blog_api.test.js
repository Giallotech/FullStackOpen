/* eslint-disable max-len */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({
  })

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a new blog post is created', async () => {
    const newBlog = {
      title: 'Removing duplicates in an Array of Objects in JS with Sets',
      author: 'Marina Mosti',
      url: 'https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep',
      likes: 74,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'Using morgan with Express for Backend Logging',
      author: 'Arifa',
      url: 'https://dev.to/arifamujawar/using-morgan-with-express-for-backend-logging-30g7',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Reed Barger',
      likes: 49,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(item => item.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating the likes of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blog = {
      likes: 37,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd.length)
    const updatedBlog = blogsAtEnd[0]
    console.log(helper.initialBlogs.length)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(updatedBlog.likes).toBe(37)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
