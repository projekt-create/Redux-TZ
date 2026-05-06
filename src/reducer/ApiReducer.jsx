import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isNewloading: false,
    isNewError: false
}

const API_URL = 'http://localhost:3001/users'

export const fetchReducer = createAsyncThunk(
    'api/fetchReducer',
    async () => {
        const res = await axios.get(API_URL)
        return res.data
    }
)

export const postReducer = createAsyncThunk(
    'api/postReducer',
    async (postData) => {
        const res = await axios.post(API_URL, postData)
        return res.data
    }
)

export const deleteReducer = createAsyncThunk(
    'api/deleteReducer',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`)
        return id
    }
)

const ApiSlice = createSlice({
    name: 'api',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReducer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchReducer.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchReducer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error.message
            })

                .addCase(postReducer.pending, (state) => {
                    state.isNewError = true
                })
                .addCase(postReducer.fulfilled, (state, action) => {
                    state.isNewError = false
                    state.data.push(action.payload)
                })
                .addCase(postReducer.rejected, (state, action) => {
                    state.isNewError = false
                    state.isNewError = action.error.message
                })
    }
})

export default ApiSlice.reducer