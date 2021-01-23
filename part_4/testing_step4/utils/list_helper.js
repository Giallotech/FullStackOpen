const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map((item) => item.likes)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  const reducer = (accumulator, currentValue) =>
    accumulator.likes > currentValue.likes ? accumulator : currentValue
  const result = blogs.reduce(reducer)

  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

const mostBlogs = (blogs) => {
  // create an object composed of keys which have been repeated through iteration
  const counts = _.countBy(blogs, 'author')
  // getting key with the highest value from counts
  const maxKey = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  )
  // getting the max value among properties of counts
  const arr = Object.values(counts)
  const maxValue = Math.max(...arr)

  return {
    author: maxKey,
    blogs: maxValue,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
