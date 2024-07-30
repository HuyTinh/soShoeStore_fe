import React from 'react'
import { Link } from 'react-router-dom'

const AuthenticationRoute = ({
    user,
    to,
    children
}) => {
    return (
        <>
            {
                user?.id ? <Link to={to} aria-label="to authentication link">
                    {children}
                </Link> : <div onClick={(e) => document.getElementById('auth_modal').showModal()}>
                    {children}
                </div>
            }
        </>
    )
}

export default AuthenticationRoute