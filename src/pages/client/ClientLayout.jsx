import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import AuthenticationModal from '../../components/AuthenticationModal'



const ClientPage = () => {

    return (
        <div>
            <Navbar />
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <Footer />
            <AuthenticationModal />
        </div>
    )
}

export default ClientPage