import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import CartApi from "../../api/services/cartApi";

const initialState = {
    carts: [],
    isLoading: false,
    isError: false,
    error: ''
}

function isPendingAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.includes('carts')
}

function isRejectedAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/rejected') && action.type.includes('carts')
}

export const getCartList = createAsyncThunk('carts/getCarts', async (cartId, thunkAPI) => {
    return await CartApi.getListCart(cartId, thunkAPI);
})

export const addToCart = createAsyncThunk('carts/addToCart', async (data, thunkAPI) => {
    return await CartApi.addToCart(data, thunkAPI);;
})

export const updateFromCart = createAsyncThunk("carts/updateFromCart", async (data, thunkAPI) => {
    const response = await CartApi.updateFromCart(data.data, thunkAPI);
    data?.setIsProcess(false);
    return response;

})


export const removeFromCart = createAsyncThunk("carts/removeFromCart", async (data, thunkAPI) => {
    const response = await CartApi.removeFromCart(data, thunkAPI);
    return response;
})

export const clearCart = createAsyncThunk("carts/clearCart", async (id, thunkAPI) => {
    const response = await CartApi.clearCart(id, thunkAPI);
    return response;
})

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        refeshCart: (state) => {
            state.carts = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCartList.fulfilled, (state, action) => {
                state.carts = action.payload.cart_details;
                state.isLoading = false;
            }).addCase(addToCart.fulfilled, (state, action) => {
                state.carts = action.payload.cart_details;
                state.isLoading = false;
            }).addCase(removeFromCart.fulfilled, (state, action) => {
                state.carts = action.payload.cart_details;
                state.isLoading = false;
            }).addCase(updateFromCart.fulfilled, (state, action) => {
                state.carts = action.payload.cart_details;
                state.isLoading = false;
            }).addCase(clearCart.fulfilled, (state, action) => {
                state.carts = action.payload.cart_details;
                state.isLoading = false;
            }).addMatcher(isPendingAction, (state, action) => {
                state.isLoading = true;
            }).addMatcher(isRejectedAction, (state, action) => {
                state.isError = true;
                state.error = action.error.message
            })
    },
})

export const { refeshCart } = cartsSlice.actions;

export const selectCartInfor = createSelector([(state => state.carts.carts)], (carts) => {
    return {
        carts: carts,
        totalQuantity: carts.map(c => c.quantity).reduce((n1, n2) => n1 + n2, 0),
        totalPrice: carts.map(c => c.quantity * c.price).reduce((n1, n2) => n1 + n2, 0)
    };
})
export default cartsSlice.reducer;