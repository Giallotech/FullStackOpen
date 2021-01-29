/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

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

test('note without title and url is not added', async () => {
  const newBlog = {
    author: 'Reed Barger',
    likes: 49,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
