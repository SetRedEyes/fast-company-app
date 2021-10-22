import React from "react"
import Select from "react-select"
import PropTypes from "prop-types"

const MultiSelectField = ({ label, options, onChange, name, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
          color: options[optionName].color
        }))
      : options

  const defaultValueArray = Array.isArray(defaultValue)
    ? defaultValue.map((value) => ({
        label: value.name || value.label,
        value: value._id || value.value,
        color: value.color
      }))
    : defaultValue

  const handleChange = (value) => {
    onChange({ name: name, value })
  }

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        defaultValue={defaultValue && defaultValueArray.map((v) => v)}
        styles={{ backgroundColor: "red" }}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default MultiSelectField
