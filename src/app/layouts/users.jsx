import React from "react"
import { useParams } from "react-router-dom"
import EditPage from "../components/page/editPage"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/usersListPage"

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  return (
    <>
      {userId ? (
        edit ? (
          <EditPage userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}
export default Users
