import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((users) => users.filter((user) => user._id !== userId))
  }
  const renderPharse = (number) => {
    const badgeColor = number === 0 ? 'danger' : 'primary'
    const humans = number > 5 || number === 1 ? 'человек' : 'человека'
    const pharse =
      number === 0 ? 'Никто с тобой не тусанет' : `${number} ${humans} тусанет с тобой сегодня`
    return <span class={`badge bg-${badgeColor}`}>{pharse}</span>
  }

  return (
    <>
      <h3>{renderPharse(users.length)}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { name, _id: id, qualities, profession, completedMeetings, rate } = user
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  {qualities.map((quality) => {
                    return (
                      <span className={`badge bg-${quality.color} ms-2`} key={quality._id}>
                        {quality.name}
                      </span>
                    )
                  })}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
