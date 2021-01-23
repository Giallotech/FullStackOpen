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
  console.log(result)
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
