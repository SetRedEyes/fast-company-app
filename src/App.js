import React, { useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((users) => users.filter((user) => user._id !== userId))
  }

  const handleToogleBookmark = (id) => {
    let newUsers = [...users]
    const userIndex = newUsers.findIndex((u) => u._id === id)
    newUsers[userIndex]['status'] = !newUsers[userIndex]['status']
    setUsers(newUsers)
  }
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onBookmark={handleToogleBookmark} />
    </div>
  )
}

export default App
