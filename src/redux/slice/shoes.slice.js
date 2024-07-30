import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShoeApi from "../../api/services/shoeApi";

const initialState = {
    shoes: [],
    shoe: {},
    currentShoeMustHave: [],
    pageable: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 20,
    },
    shoeSales: [],
    shoeSalesCompareWith: [],
    isLoading: false,
    isError: false,
    error: ''
}


function isPendingAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.includes('shoes')
}

function isRejectedAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/rejected')
}

export const getShoeList = createAsyncThunk('shoes/getShoes', async (_, thunkAPI) => {
    const response = await ShoeApi.getShoeList(thunkAPI);
    return response;
})

export const getShoeById = createAsyncThunk('shoe/getShoeById', async (id, thunkAPI) => {
    const response = await ShoeApi.getShoeById(id, thunkAPI);
    return response;
})

export const getPageShoeList = createAsyncThunk('shoes/getPageShoes', async (params, thunkAPI) => {
    const response = await ShoeApi.getPageShoeList(params, thunkAPI);
    return response;
})

export const createShoe = createAsyncThunk('shoe/createShoe', async (data, thunkAPI) => {
    const response = await ShoeApi.createShoe(data);
    data.setFormLoading(false);
    data.setSelectedId(response.id);
    return response;
})

export const deleteShoe = createAsyncThunk('shoe/deleteShoe', async (id, thunkAPI) => {
    const response = await ShoeApi.deleteShoe(id);
    return response;
})

export const updateShoe = createAsyncThunk('shoe/updateShoe', async (data, thunkAPI) => {
    const response = await ShoeApi.updateShoe(data);
    data.setFormLoading(false);
    data.setSelectedId(response.id);
    return response;
})

export const getShoeYearSales = createAsyncThunk('shoe/getShoeYearSales', async (data, thunkAPI) => {
    const response = await ShoeApi.getShoeYearSales(data.params);
    data.setChartLoading(false);
    return response;
})

export const getShoeYearSalesCompareWith = createAsyncThunk('shoe/getShoeYearSalesCompareWith', async (data, thunkAPI) => {
    const response = await ShoeApi.getShoeYearSales(data.params);
    data.setChartLoading(false);
    return response;
})

export const getShoeMonthSales = createAsyncThunk('shoe/getShoeMonthSales', async (data, thunkAPI) => {
    const response = await ShoeApi.getShoeMonthSales(data.params)
    return response;
})

export const getShoeMonthSalesCompareWith = createAsyncThunk('shoe/getShoeMonthSalesCompareWith', async (data, thunkAPI) => {
    const response = await ShoeApi.getShoeMonthSales(data.params)
    return response;
})

export const getAllCurrentShoeMustHave = createAsyncThunk('shoes/getAllCurrentShoeMustHave', async (_, thunkAPI) => {
    const response = await ShoeApi.getAllCurrentShoeMustHave(thunkAPI);
    return response;
})


const shoesSlice = createSlice({
    name: "shoes",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getShoeList.fulfilled, (state, action) => {
                state.shoes = action.payload;
                state.isLoading = false;
            })
            .addCase(getShoeById.fulfilled, (state, action) => {
                state.shoe = action.payload;
                state.isLoading = false;
            })

            .addCase(getPageShoeList.fulfilled, (state, action) => {
                state.shoes = action.payload.shoes;
                state.pageable = {
                    pageNumber: action.payload.page_number,
                    totalPages: action.payload.total_pages,
                    pageSize: action.payload.page_size
                }
                state.isLoading = false;

            })
            .addCase(createShoe.fulfilled, (state, action) => {
                if (state.pageable.pageNumber === state.pageable.totalPages - 1) {
                    state.shoes = [...state.shoes, action.payload];
                }
                state.shoe = action.payload;
                state.isLoading = false;
            })
            .addCase(updateShoe.fulfilled, (state, action) => {
                state.shoes = state.shoes.map(shoe => shoe.id === action.payload.id ? action.payload : shoe);
                state.shoe = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteShoe.fulfilled, (state, action) => {
                state.shoes = state.shoes.filter(shoe => shoe.id !== action.payload);
            })
            .addCase(getShoeYearSales.fulfilled, (state, action) => {
                state.shoeSales = action.payload;
            })
            .addCase(getShoeYearSalesCompareWith.fulfilled, (state, action) => {
                state.shoeSalesCompareWith = action.payload;
            })
            .addCase(getShoeMonthSalesCompareWith.fulfilled, (state, action) => {
                state.shoeSalesCompareWith = action.payload;
            })
            .addCase(getShoeMonthSales.fulfilled, (state, action) => {
                state.shoeSales = action.payload;
            })
            .addCase(getAllCurrentShoeMustHave.fulfilled, (state, action) => {
                state.currentShoeMustHave = action.payload;
                state.isLoading = false;
            })
            .addMatcher(isPendingAction, (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.isError = true;
                state.shoe = {};
                state.error = action.error.message;
            })
    }
})

export default shoesSlice.reducer;