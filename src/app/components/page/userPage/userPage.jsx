import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import Comments from "../../ui/comments"
import UserCard from "../../ui/userCard"
import QualitiesCard from "../../ui/qualitiesCard"
import MeeatingsCard from "../../ui/meetingsCard"

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeeatingsCard value={user.meetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
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
