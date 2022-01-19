import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions"
import { loadQualitiesList } from "../../store/qualities"

const Profession = ({ id }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getProfessionsLoadingStatus())

    const prof = useSelector(getProfessionById(id))

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])
    if (!isLoading) {
        return <p>{prof.name}</p>
    } else return "Loading"
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
