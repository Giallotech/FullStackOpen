const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(item => item.likes)
  return likes.reduce((prev, current) => prev + current)
}

const favoriteBlog = blogs => {
  const result = blogs.reduce((prev, current) =>
    prev.likes > current.likes
      ? prev
      : current
  )

  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

const mostBlogs = blogs => {
  // create an object composed of keys which have been repeated through iteration
  const counts = _.countBy(blogs, 'author')

  // getting key with the highest value from counts
  const maxKey = Object.keys(counts).reduce((prev, current) =>
    counts[prev] > counts[current]
      ? prev
      : current
  )
  // getting the max value among properties of counts
  const arr = Object.values(counts)
  const maxValue = Math.max(...arr)

  return {
    author: maxKey,
    blogs: maxValue,
  }
}

// Implicit Chaining helped me using different lodash methods in conjunction.
const mostLikes = blogs => {
  const authors = _(blogs)
    .groupBy('author')
    .map((item, key) => {
      return {
        author: key,
        likes: _.sumBy(item, 'likes'),
      }
    })
    .value()
  console.log(authors)
  const mostLiked = authors.reduce((prev, current) =>
    prev.likes > current.likes
      ? prev
      : current
  )
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
