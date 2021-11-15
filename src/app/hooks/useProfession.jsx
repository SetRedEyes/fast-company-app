import React, { useContext } from "react"
import PropTypes from "prop-types"

const ProfessionContext = React.createContext()

export const useProfession = () => {
    return useContext(ProfessionContext)
}

const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)

    return "sd"
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default ProfessionProvider
