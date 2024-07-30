import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/client/HomePage'
import ShoesPage from '../pages/client/ShoePage'
import ShoeDetailPage from '../pages/client/ShoeDetailPage'
import ClientLayout from '../pages/client/ClientLayout'

const GuestRoutes = () => {
    return (
        <Routes>
            <Route element={<ClientLayout />} >
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="shoes" element={<ShoesPage />} />
                <Route path="shoes/:id" element={<ShoeDetailPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default GuestRoutes