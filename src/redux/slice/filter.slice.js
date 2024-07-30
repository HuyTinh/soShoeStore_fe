import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ShoeApi from "../../api/services/shoeApi"

const initialState = {
    shoes: [],
    pageable: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 20,
        totalElements: 0
    },
    isLoading: false,
    isError: false,
    error: ''
}


function isPendingAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.includes('filter')
}

function isRejectedAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/rejected') && action.type.includes('filter')
}

export const getShoeFilterList = createAsyncThunk('filter/getShoesFilterList', async (params, thunkAPI) => {
    const response = await ShoeApi.getPageShoeList(params, thunkAPI);
    return response;
})

const filterSlice = createSlice({
    name: "filter",
    initialState,
    extraReducers: builder => {
        builder.addCase(getShoeFilterList.fulfilled, (state, action) => {
            state.shoes = action.payload.shoes
            state.pageable = {
                pageNumber: action.payload.page_number,
                totalPages: action.payload.total_pages,
                pageSize: action.payload.page_size,
                totalElements: action.payload.total_elements
            }
            state.isLoading = false
        })
            .addMatcher(isPendingAction, (state, action) => {
                state.isLoading = true
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.isError = true
                state.error = action.error.message
            })
    }
})

export default filterSlice.reducer