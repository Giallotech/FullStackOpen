const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Removing duplicates in an Array of Objects in JS with Sets",
    author: "Marina Mosti",
    url: "https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep",
    likes: 161,
  },
  {
    title: "4 ways of finding elements in a JavaScript Array",
    author: "Anshuman Bhardwaj",
    url: "https://dev.to/anshuman_bhardwaj/4-ways-of-finding-elements-in-a-javascript-array-5g09",
    likes: 4,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}