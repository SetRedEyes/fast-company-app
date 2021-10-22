import React from "react"
import PropTypes from "prop-types"

const Quality = ({ color, name, _id, label }) => {
  return (
    <span className={`badge bg-${color} ms-2`} key={_id}>
      {name || label}
    </span>
  )
}

Quality.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  _id: PropTypes.string,
  label: PropTypes.string
}

export default Quality
