import React from 'react'
import BookMark from './bookmark'
import Qualitie from './qualitie'

const User = ({ users, ...rest }) => {
  return (
    <>
      {users.map((user) => {
        const { name, _id: id, qualities, profession, completedMeetings, rate } = user
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>
              {qualities.map((qualitie) => (
                <Qualitie key={qualitie._id} {...qualitie} />
              ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
              <BookMark {...user} {...rest} />
            </td>
            <td>
              <button type='button' className='btn btn-danger' onClick={() => rest.onDelete(id)}>
                Delete
              </button>
            </td>
          </tr>
        )
      })}
    </>
  )
}

export default User
