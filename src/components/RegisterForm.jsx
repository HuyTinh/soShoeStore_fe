import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAccount } from '../redux/slice/users.slice';

const RegisterForm = ({ props }) => {
    const dispatch = useDispatch();
    const { changeTo } = props
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleRegister = (data) => {
        dispatch(registerAccount({
            data: data, modal: document.getElementById('auth_modal')
        }))

    }

    return (
        <div className='px-10 space-y-5'>
            <h1 className='font-bold text-2xl'>Register</h1>
            <form onSubmit={handleSubmit((data) => handleRegister(data))} className='space-y-5'>
                <div className='space-y-3'>
                    <label className="input input-bordered flex items-center gap-2">
                        Last Name:
                        <input type="text" {...register("last_name", {
                            required: 'Last Name is required',
                        })} placeholder="Last Name" />

                    </label>
                    {
                        errors.last_name && <span className='text-red-500 block'>{errors.last_name.message}</span>
                    }
                </div>
                <div className='space-y-3'>
                    <label className="input input-bordered flex items-center gap-2">
                        First Name:
                        <input type="text" {...register("first_name", {
                            required: 'First Name is required',
                        })} placeholder="First Name" />

                    </label>
                    {
                        errors.first_name && <span className='text-red-500 block'>{errors.first_name.message}</span>
                    }
                </div>
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
                <div className='flex gap-x-5'>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            Password
                            <input type="password" {...register("password", {
                                required: 'Password is required',
                            })} className="w-full" placeholder="***********" />
                        </label>
                        {
                            errors.password && <span className='text-red-500 block'>{errors.password.message}</span>
                        }
                    </div>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            Retype Password
                            <input type="password" {...register("retype_password", {
                                required: 'Retype Password is required',
                            })} className="w-full" placeholder="***********" />
                        </label>
                        {
                            errors.retype_password && <span className='text-red-500 block'>{errors.retype_password.message}</span>
                        }
                    </div>
                </div>
                <div>
                    <span onClick={() => { changeTo('login') }} className='underline text-blue-400 cursor-pointer'>Already have account?</span>
                </div>
                <button className='btn btn-neutral w-full' type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterForm