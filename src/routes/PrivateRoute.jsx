import React from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {
    const token = localStorage.getItem('jwt')

    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoute;