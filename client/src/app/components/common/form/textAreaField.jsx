import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({ name, rows, label, onChange, value, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value })
    }

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "")
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    rows={rows}
                    onChange={handleChange}
                    name={name}
                    value={value}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
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
    value: PropTypes.string,
    error: PropTypes.string
}
export default TextAreaField
