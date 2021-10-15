import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import api from "../api"
import SearchStatus from "./searchStatus"
import UsersTable from "./usersTable"
import _ from "lodash"
import Search from "./search"

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchValue, setSearchValue] = useState("")
  const pageSize = 8

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

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSearch = (value) => {
    setSearchValue(value)
    console.log(value)
  }

  if (users) {
    const searchedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    const filteredUsers = selectedProf
      ? searchedUsers.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : searchedUsers

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => setSelectedProf()

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <Search onSearch={handleSearch} />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    )
  }
  return "Loading..."
}
UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList
