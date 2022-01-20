import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/user.service"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersRecieved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: usersReducer } = usersSlice
const { usersRecieved, usersRequestFailed, usersRequested } = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersRecieved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error))
    }
}

export const getUsersList = () => (state) => state.users.entities

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId)
    }
}
export default usersReducer
