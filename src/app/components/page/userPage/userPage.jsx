import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom"
import api from "../../../api"
import Qualities from "../../ui/qualities"

const UserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const handleClick = () => {
    history.push("/users")
  }

  let professionName
  if (professions && !user.profession.name) {
    const profArray = Object.keys(professions).map((p) => ({
      name: professions[p].name,
      _id: professions[p]._id
    }))
    professionName = profArray.find((p) => p._id === user.profession).name
  }

  if (user && professions) {
    return (
      <div className="ms-3">
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name || professionName}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <Link to={`${userId}/edit`} className="btn btn-primary mt-3">
          Изменить
        </Link>
        <div>
          <button className="btn btn-secondary mt-3" onClick={handleClick}>
            Все пользователи
          </button>
        </div>
      </div>
    )
  } else {
    return <h1 className="ms-3">Loading...</h1>
  }
}
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
