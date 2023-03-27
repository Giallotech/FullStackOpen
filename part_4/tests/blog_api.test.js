const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  // This code is needed when we want to create a user
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('secret', saltRounds)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

// I created a function to login a user and extract the token
const token = async () => {
  const userForToken = {
    username: 'root',
    password: 'secret'
  }

  const response = await api
    .post('/api/login')
    .send(userForToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return response.body.token
}

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('The unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body.map(item => item.id)
    expect(id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "6 use cases of the useEffect ReactJS hook",
      author: "Damian Demasi",
      url: "https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o",
      likes: 136
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await token()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('missing likes property will default to the value 0', async () => {
    const newBlog = {
      title: "6 use cases of the useEffect ReactJS hook",
      author: "Damian Demasi",
      url: "https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await token()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(item => item.likes)

    expect(likes).toContain(0)
  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await token()}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('adding a new blog fails because of missing token', async () => {
    const newBlog = {
      title: '4 Ways to useEffect()',
      author: 'Linas Spukas',
      url: 'https://dev.to/spukas/4-ways-to-useeffect-pf6',
      likes: 64,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const newBlog = {
      title: 'How to make ESLint work with Prettier avoiding conflicts and problems',
      author: 'Raffaele Pizzari',
      url: 'https://dev.to/s2engineers/how-to-make-eslint-work-with-prettier-avoiding-conflicts-and-problems-57pi',
      likes: 39,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await token()}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${await token()}`)
      .expect(204)
  })
})

describe('updating of a blog', () => {
  test('a blog can be updated', async () => {
    const updatedBlog = {
      title: "Removing duplicates in an Array of Objects in JS with Sets",
      author: "Marina Mosti",
      url: "https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep",
      likes: 47,
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(47)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rt',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})