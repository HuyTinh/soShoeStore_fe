import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/users.slice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const LoginForm = ({ props }) => {
    const { changeTo } = props
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleLogin = (data) => {
        dispatch(login({
            data: data, modal: document.getElementById('auth_modal')
        }))

    }

    return (
        <div className='px-10 space-y-5'>
            <h1 className='font-bold text-2xl'>Login</h1>
            <form onSubmit={handleSubmit((data) => handleLogin(data))} className='space-y-5'>
                <div className='space-y-3'>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="text" {...register("email", {
                            required: 'Email is required',
                        })} className="grow" placeholder="daisy@site.com" />

                    </label>
                    {
                        errors.email && <span className='text-red-500 block'>{errors.email.message}</span>
                    }
                </div>
                <div className='space-y-3'>
                    <label className="input input-bordered flex items-center gap-2">
                        Password
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                        })} className="grow" placeholder="***********" />
                    </label>
                    {
                        errors.password && <span className='text-red-500 block'>{errors.password.message}</span>
                    }
                </div>
                <div>
                    <span className='underline text-blue-400 cursor-pointer' onClick={() => { changeTo('register') }}>I don't have account?</span>
                </div>
                <button className='btn btn-neutral w-full' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm