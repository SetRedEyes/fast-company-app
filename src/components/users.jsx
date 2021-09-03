import React, { useState } from "react"
import User from "./user"
import Pagination from "../components/pagiation"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"

const Users = ({ users: allUsers, ...rest }) => {
  const count = allUsers.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const usersCrop = paginate(allUsers, currentPage, pageSize)
  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersCrop.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  )
}
Users.propTypes = {
  users: PropTypes.array
}

export default Users
