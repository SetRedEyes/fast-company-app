import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../api"
import Qualitie from "./qualitie"
import { useHistory, useParams } from "react-router-dom"

const UserPage = () => {
  const [user, setUser] = useState(null)
  const history = useHistory()

  const { userId } = useParams()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const handleUsersList = () => {
    history.push("/users")
  }

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        {user.qualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button
          onClick={() => {
            handleUsersList()
          }}
        >
          все пользователи
        </button>
      </>
    )
  }

  return <h2>Loading...</h2>
}
UserPage.propTypes = {
  match: PropTypes.object
}

export default UserPage
