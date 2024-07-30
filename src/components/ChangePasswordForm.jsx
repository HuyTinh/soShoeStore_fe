import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../redux/slice/users.slice'

const ChangePasswordForm = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
    });

    const handleChangePassword = (data) => {
        if (data.password == data.confirm_password) {
            dispatch(changePassword({ id: user.id, data: data }))
            document.getElementById('account_modal').close()
        }
    }

    const handleCloseModal = () => {
        document.getElementById('account_modal').close()
    }

    return (
        <div>
            <form onSubmit={handleSubmit((data) => handleChangePassword(data))}>
                <div className='space-y-5'>
                    <h3 className='font-extrabold text-3xl uppercase'>Change Password</h3>
                    <div className='space-y-3 flex gap-x-5'>
                        <label className="input input-bordered flex items-center gap-2 flex-1">
                            OTP:
                            <input type="password" className='grow' {...register("password")} />
                        </label>
                        {/* {
                        errors.first_name && <span className='text-red-500 block'>{errors.first_name.message}</span>
                    } */}

                    </div>
                    <div className='space-y-3 flex gap-x-5'>
                        <label className="input input-bordered flex items-center gap-2 flex-1">
                            OTP:
                            <input type="password" className='grow' {...register("confirm_password")} />
                        </label>
                        {/* {
                        errors.first_name && <span className='text-red-500 block'>{errors.first_name.message}</span>
                    } */}

                    </div>
                    <button className='btn btn-neutral uppercase font-bold w-full justify-start '>change password</button>
                    <button type='submit' className='btn uppercase font-bold w-full justify-start' onClick={() => { handleCloseModal() }}>cancel</button>
                </div>
            </form>
        </div>)
}

export default ChangePasswordForm