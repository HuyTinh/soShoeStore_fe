import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/users.slice'
import AccountDetailForm from './AccountDetailForm'
import AccountModal from './AccountModal'
import VerificationEmailForm from './VerificationEmailForm'

const AccountProfileLayout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState();

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }


    return (
        <div className='min-h-screen'>
            <div className='px-36'>
                <div className='flex gap-x-14 py-20'>
                    <div>
                        <div className='space-y-5'>
                            <h3 className='uppercase font-extrabold text-xl'>account overview</h3>
                            <div>
                                <ul className="bg-white w-64 *:text-lg">
                                    <Link to={''} className='hover:text-white hover:font-bold hover:bg-black hover:underline cursor-pointer p-3 block'>
                                        <span>Personal Information</span>
                                    </Link>
                                    <Link to={'./address-book'} className='hover:text-white hover:font-bold hover:bg-black hover:underline cursor-pointer p-3 block'>
                                        <span>Address Book</span>
                                    </Link>
                                    <li className='hover:text-white hover:font-bold hover:bg-black hover:underline cursor-pointer p-3' onClick={() => handleLogout()}>
                                        <span>Log out</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white flex-1'>
                        <Outlet context={[form, setForm]} />
                    </div>
                </div>
            </div>
            <AccountModal>
                {form}
            </AccountModal>
        </div>
    )
}

export default AccountProfileLayout