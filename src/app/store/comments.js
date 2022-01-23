import { createAction, createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import commentService from "../services/comment.service"

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        commentRemoved: (state, action) => {
            state.entities.filter((el) => el.id !== action.payload.id)
        }
    }
})

const { actions, reducer: commentsReducer } = commentsSlice
const {
    commentsRecieved,
    commentsRequestFailed,
    commentsRequested,
    commentCreated,
    commentRemoved
} = actions

const commentCreateRequested = createAction("comments/commentCreateRequested")

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsRecieved(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error))
    }
}

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentCreateRequested)
    const comment = {
        ...payload,
        _id: nanoid(),
        pageId: payload.userId,
        created_at: Date.now(),
        userId: payload.currentUserId
    }
    try {
        const { content } = await commentService.createComment(comment)

        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const removeComment = (payload) => async (dispatch) => {
    const { commentId, userId } = payload
    try {
        const { content } = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(commentRemoved(commentId))
            dispatch(loadCommentsList(userId))
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
