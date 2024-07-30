import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const AccountPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
            exit={{ opacity: 0 }} className='min-h-screen bg-slate-100'>
            <div className='sticky top-0 bg-white z-10'>
                <ul className='flex justify-center border-b border-b-slate-300 gap-x-5'>
                    <NavLink
                        to={'/my-account'}
                        className={({ isActive, isPending }) =>
                            `px-2 py-5 border-b-[3px] hover:border-b-black border-b-transparent ${isActive ? 'border-b-black font-bold' : ''} ${!isActive ? 'border-b-transparent' : ''}`
                        } end>
                        <span className='uppercase'>account</span>
                    </NavLink>
                    <NavLink to={'/my-account/order-history'}
                        className={({ isActive, isPending }) =>
                            `px-2 py-5 border-b-[3px] hover:border-b-black border-b-transparent ${isActive ? 'border-b-black font-bold' : ''}`
                        }>
                        <span className='uppercase'>orders</span>
                    </NavLink>
                </ul>
            </div>
            <Outlet />
        </motion.div>
    )
}

export default AccountPage