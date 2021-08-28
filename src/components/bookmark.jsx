import React from 'react'

const BookMark = ({ status, ...rest }) => {
  console.log('BookStatus', status)
  return (
    <button onClick={() => rest.onBookmark(rest._id)}>
      {status ? <i className='bi bi-bookmark-fill'></i> : <i className='bi bi-bookmark'></i>}
    </button>
  )
}

export default BookMark
