import React, { useState, useEffect } from "react"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UsersTable from "../../ui/usersTable"
import _ from "lodash"

import { useSelector } from "react-redux"
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions"
import { getCurrentUserId, getUsersList } from "../../../store/users"

const UsersListPage = () => {
    const users = useSelector(getUsersList())
    const currentUserId = useSelector(getCurrentUserId())
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const [searchQuery, setSearchQuery] = useState("")
    const pageSize = 8

    // const handleDelete = (userId) => {
    //      setUsers((users) => users.filter((user) => user._id !== userId))
    //     console.log(userId)
    // }

    const handleToggleBookMark = (id) => {
        const newUsers = [...users]
        const userIndex = newUsers.findIndex((u) => u._id === id)
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark
        // setUsers(newUsers)
        console.log(newUsers)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("")
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const handleSearch = ({ target }) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf._id)
              )
            : data
        return filteredUsers.filter((u) => u._id !== currentUserId)
    }
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => setSelectedProf()

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <input
                    type="text"
                    className="form-control"
                    name="searchQuery"
                    placeholder="Search..."
                    onChange={handleSearch}
                    value={searchQuery}
                />
                {count > 0 && (
                    <UsersTable
                        users={usersCrop}
                        onSort={handleSort}
                        // onDelete={handleDelete}
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

UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage
