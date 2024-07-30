import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ClientLayout from '../pages/client/ClientLayout'
import ShoeDetailPage from '../pages/client/ShoeDetailPage'
import CartPage from '../pages/client/CartPage'
import ShoesPage from '../pages/client/ShoePage'
import CheckOutPage from '../pages/client/CheckOutPage'
import AccountPage from '../pages/client/AccountPage'
import OrderHistory from '../components/OrderHistory'
import HomePage from '../pages/client/HomePage'
import PrivateRoute from './PrivateRoute'
import { AnimatePresence } from 'framer-motion'
import AccountProfileLayout from '../components/AccountProfileLayout'
import AccountProfile from '../components/AccountProfile'
import AddressBook from '../components/AddressBook'

export const ClientRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<ClientLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="shoes" element={<ShoesPage />} />
                    <Route path="shoes/:id" element={<ShoeDetailPage />} />
                    <Route element={<PrivateRoute />} >
                        <Route path="cart" element={<CartPage />} />
                        <Route path="check-out" element={<CheckOutPage />} />
                        <Route path="my-account" element={<AccountPage />}>
                            <Route path="order-history" element={<OrderHistory />} />
                            <Route path='' element={<AccountProfileLayout />} >
                                <Route index element={<AccountProfile />} />
                                <Route path='address-book' element={<AddressBook />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Route>
            </Routes>
        </AnimatePresence>

    )
}
