import React from "react"
import PropTypes from "prop-types"
import Comments from "../../ui/comments"
import UserCard from "../../ui/userCard"
import QualitiesCard from "../../ui/qualitiesCard"
import MeeatingsCard from "../../ui/meetingsCard"
import { useUsers } from "../../../hooks/useUsers"
import { CommentsProvider } from "../../../hooks/useComments"

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers()
    const user = getUserById(userId)

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
