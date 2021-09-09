import React, { useState, useEffect } from "react"
import api from "./api"
import Users from "./components/users"

function App() {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers((users) => users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    const newUsers = [...users]
    const userIndex = newUsers.findIndex((u) => u._id === id)
    newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark
    setUsers(newUsers)
  }
  return (
    <div>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  )
}

export default App
