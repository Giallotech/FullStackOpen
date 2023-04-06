import { useState } from 'react'

const Blog = ({ blog, user, blogs, setBlogs, blogService, handleLikes }) => {
  const [viewLabel, setViewLabel] = useState('view')

  const toggle = () => {
    viewLabel === 'view'
      ? setViewLabel('hide')
      : setViewLabel('view')
  }

  const deleteStyle = {
    backgroundColor: 'lightBlue'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(item => item.id !== blog.id))
        })
    }
  }

  return (
    <div className='blog' style={blogStyle}>

      <div className='defaultView'>
        {blog.title} {blog.author}{' '}
        <button className='viewButton' onClick={() => toggle(viewLabel)}>{viewLabel}</button>
      </div>

      {viewLabel === 'hide' &&
        <div>
          <div>{blog.url}</div>
          <div className='wtf'>
            <span>{blog.likes}</span>{' '}<button className='likeButton' onClick={() => handleLikes(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username &&
            <button className='remove' style={deleteStyle} onClick={deleteBlog}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog