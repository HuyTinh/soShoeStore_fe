import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthenticationModal = () => {
    const [on, setOn] = useState('login')


    const changeTo = (to) => {
        setOn(to)
    }

    return (
        <div>
            <dialog id="auth_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    {on === 'register' && <RegisterForm props={{ changeTo: changeTo }} />}
                    {
                        on === 'login' && <LoginForm props={{ changeTo: changeTo }} />
                    }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default AuthenticationModal