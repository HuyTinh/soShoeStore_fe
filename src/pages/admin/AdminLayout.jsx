import React, { useEffect, useLayoutEffect } from 'react'
import { GiRunningShoe } from 'react-icons/gi'
import { MdManageAccounts, MdSpaceDashboard } from 'react-icons/md'
import { TbFileInvoice } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {

    return (
        <div>
            <main>
                <div className="flex flex-wrap bg-gray-100 w-full h-full min-h-screen">
                    <div className="w-2/12 bg-white rounded p-3 shadow-lg">
                        <div className='sticky top-0'>
                            <div className="flex items-center space-x-4 p-2 mb-5 ">
                                <img className="h-12 rounded-full" src="http://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="James Bhatta" />
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">Huy tính</h4>
                                    <span className="text-sm tracking-wide flex items-center space-x-1">
                                        <svg className="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg><span className="text-gray-600">Verified</span>
                                    </span>
                                </div>
                            </div>
                            <ul className="menu p-0 space-y-2">
                                <li>
                                    <Link to={''}
                                        className="px-2">
                                        <MdSpaceDashboard size={24} />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <details open>
                                        <summary className='px-2 pe-3 '><MdManageAccounts size={24} /> Management</summary>
                                        <ul className='space-y-2 py-2'>
                                            <li>
                                                <NavLink to={'/shoe-management'}
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "bg-slate-300" : ""
                                                    }
                                                >
                                                    <GiRunningShoe /> Shoe
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/order-management'}
                                                    className={({ isActive, isPending }) =>
                                                        isPending ? "pending" : isActive ? "bg-slate-300" : ""
                                                    }
                                                >
                                                    <TbFileInvoice />Order
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="w-10/12">
                        <div className="p-4 text-gray-500">
                            <Outlet />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default AdminLayout