import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({ name, rows, label, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value })
  }

  return (
    <div className="mb-4">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows={rows}
        onChange={handleChange}
        name={name}
        value={value}
      ></textarea>
    </div>
  )
}
TextAreaField.defaultProps = {
  rows: "3"
}

TextAreaField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.string,
  value: PropTypes.string
}
export default TextAreaField
