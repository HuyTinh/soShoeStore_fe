
import { configureStore } from '@reduxjs/toolkit'
import shoesReducer from './slice/shoes.slice'
import cartsReducer from './slice/carts.slice'
import ordersReducer from './slice/orders.slice'
import filterReducer from './slice/filter.slice'
import usersReducer from './slice/users.slice'

export const store = configureStore({
    reducer: {
        shoes: shoesReducer,
        carts: cartsReducer,
        filter: filterReducer,
        orders: ordersReducer,
        users: usersReducer,
    },
})