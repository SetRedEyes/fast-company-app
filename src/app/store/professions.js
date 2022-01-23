import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"
import isOutdated from "../utils/isOutDated"

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: professionsReducer } = professionsSlice
const { professionsRecieved, professionsRequestFailed, professionsRequested } =
    actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professionsRecieved(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading
export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((q) => q._id === id)
    }
}
export default professionsReducer
