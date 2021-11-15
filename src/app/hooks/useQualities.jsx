import React, { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import qualityService from "../services/quality.service"
import PropTypes from "prop-types"

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function getQuality(id) {
        return qualities.find((p) => p._id === id)
    }

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
