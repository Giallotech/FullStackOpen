const _ = require('lodash')

const dummy = array => {
  const mostLikedBlog = [array.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    }
  )]
  return mostLikedBlog.length
}

const totalLikes = array => {
  const likes = array.map(item => item.likes).reduce((prev, next) => prev + next)
  return likes
}

const favoriteBlog = array => {
  const mostLikedBlog = array.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    }
  )
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogs = array => {
  const authors = array.map(item => item.author)
  const blogsPerAuthor = _.countBy(authors)
  const values = Object.values(blogsPerAuthor)
  const maxNumber = Math.max(...values)
  const authorWithMostBlogs = Object.keys(blogsPerAuthor).reduce((total, currentValue) =>
    blogsPerAuthor.total > blogsPerAuthor.currentValue
      ? total
      : currentValue)
  return {
    author: authorWithMostBlogs,
    blogs: maxNumber
  }
}

const mostLikes = array => {
  const likesPerAuthor = _(array)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes')
    }))
    .value()
  const maxLikes = Math.max(...likesPerAuthor.map(item => item.likes))
  const mostLikedAuthor = likesPerAuthor.find(item => item.likes === maxLikes)
  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}