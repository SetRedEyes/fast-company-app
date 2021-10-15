import React from "react"
import PropTypes from "prop-types"

const Search = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="form-control"
      onChange={({ target }) => onSearch(target.value)}
    />
  )
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
