import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useProfessions } from "../../hooks/useProfession"
const UserCard = ({ user }) => {
    const history = useHistory()
    const { currentUser } = useAuth()
    const { name: profession } = useProfessions().getProfession(user.profession)

    const handleClick = () => {
        history.push(history.location.pathname + "/edit")
    }
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear" />
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h1>{user.name}</h1>
                        <h2>Профессия: {profession}</h2>
                        <i className="bi bi-caret-down-fill text-primary"></i>
                        <i className="bi bi-caret-up text-primary"></i>

                        <span className="ms-2">Rate: {user.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object
}

export default UserCard
