import React from 'react'
import { ClientRoutes } from './ClientRoutes'
import GuestRoutes from './GuestRoutes'
import AdminRoutes from './AdminRoutes'

const AppRoutes = ({ user }) => {
    const token = localStorage.getItem('jwt')

    if (!token) {
        return <GuestRoutes />
    }

    if (user?.role === 'ADMIN') {
        return <AdminRoutes />
    }

    if (user?.role === 'USER') {
        return (
            <ClientRoutes />
        )
    }
}

export default AppRoutes