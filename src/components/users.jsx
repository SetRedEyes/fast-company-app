import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((users) => users.filter((user) => user._id !== userId))
  }
  const renderPharse = (number) => {
    const badgeColor = number > 0 ? 'primary' : 'danger'
    let humans = 'человек тусанет'
    const lastOne = Number(number.toString().slice(-1))

    if ([2, 3, 4].indexOf(lastOne) >= 0) humans = 'человека тусанут'

    if (number > 4 && number < 15) humans = 'человек тусанет'

    if (lastOne === 0 || lastOne === 1) humans = 'человек тусанет'
    const pharse = number === 0 ? 'Никто с тобой не тусанет' : `${number} ${humans} с тобой сегодня`
    return <span className={`badge bg-${badgeColor}`}>{pharse}</span>
  }

  return (
    <>
      <h3>{renderPharse(users.length)}</h3>

      {users.length > 0 && (
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
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
