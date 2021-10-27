import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import api from "../../../api"
import Qualities from "../../ui/qualities"
import Comments from "../../ui/comments"

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
    history.push(`${userId}/edit`)
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
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                  <i className="bi bi-gear" onClick={handleClick} />
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="mt-3">
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name ?? professionName}</h2>
                    <i className="bi bi-caret-down-fill text-primary"></i>
                    <i className="bi bi-caret-up text-primary"></i>

                    <span className="ms-2">Rate: {user.rate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="title">
                  <span>Qualities</span>
                </h5>
                <p className="card-text">
                  <Qualities qualities={user.qualities} />
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Completed meetings</span>
                </h5>
                <p className="display-1"> {user.completedMeetings}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <Comments pageId={userId} />
          </div>
          <div></div>
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
