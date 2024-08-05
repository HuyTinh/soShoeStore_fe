import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderApi from "../../api/services/orderApi";
import { clearCart } from "./carts.slice";
import OrderDetailApi from "../../api/services/orderDetailApi";

const initialState = {
    orders: [],
    order: {},
    pageable: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 20,
    },
    isLoading: false,
    isError: false,
    error: '',
}

function isPendingAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.includes('orders')
}

function isRejectedAction(action) {
    return action.type === 'string' && action.type.endsWith('/rejected') && action.type.includes('orders')
}

export const createOrder = createAsyncThunk('orders/createOrder', async (orderRequest, thunkAPI) => {
    const response = await OrderApi.createOrder({ newOrder: orderRequest.order }, thunkAPI);
    await OrderDetailApi.createMultiOrderDetail(orderRequest.cart.map((c) => {
        return {
            order_id: response.id,
            shoe_id: c.shoe_id,
            price: c.price,
            number_of_product: c.quantity,
            total_money: c.price * c.quantity,
            size_id: c.size.id
        }
    }), thunkAPI)

    thunkAPI.dispatch(clearCart(orderRequest.order.user_id));
})

export const getOrderByUserId = createAsyncThunk('orders/getOrderList', async (userId, thunkAPI) => {
    const response = await OrderApi.getOrderByUserId({ userId }, thunkAPI);
    return response;
})

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        initOrder: (state, action) => {
            state.order = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(createOrder.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(getOrderByUserId.fulfilled, (state, action) => {
            state.orders = action.payload.orders;
            state.pageable = {
                pageNumber: action.payload.page_number,
                totalPages: action.payload.total_pages,
                pageSize: action.payload.page_size,
            }
            state.isLoading = false;
        }).addMatcher(isPendingAction, (state, action) => {
            state.isLoading = true;

        }).addMatcher(isRejectedAction, (state, action) => {
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export const { initOrder } = ordersSlice.actions;

export default ordersSlice.reducer;