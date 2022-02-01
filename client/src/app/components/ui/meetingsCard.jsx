import React from "react"
import PropTypes from "prop-types"

const MeeatingsCard = ({ value }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>
                <p className="display-1">{value}</p>
            </div>
        </div>
    )
}

MeeatingsCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MeeatingsCard
