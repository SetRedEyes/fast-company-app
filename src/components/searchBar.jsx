import React from "react"
import PropTypes from "prop-types"

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="form-control"
      onChange={({ target }) => onSearch(target.value)}
    />
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar
