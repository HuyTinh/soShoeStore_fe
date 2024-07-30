import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../pages/admin/AdminLayout'
import DashBoardPage from '../pages/admin/DashBoardPage'
import ShoeManagementPage from '../pages/admin/ShoeManagementPage'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />} >
                <Route index element={<DashBoardPage />} />
                <Route path="dashboard" element={<DashBoardPage />} />
                <Route path="shoe-management" element={<ShoeManagementPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes