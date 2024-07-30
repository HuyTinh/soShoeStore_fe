import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/slice/users.slice';

const AccountDetailForm = ({ user }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            dd: user.date_of_birth?.split('-')[2],
            mm: user.date_of_birth?.split('-')[1],
            yyyy: user.date_of_birth?.split('-')[0]
        }
    });

    const handleUpdate = (data) => {
        dispatch(updateProfile({
            id: user.id,
            first_name: data.first_name,
            last_name: data.last_name,
            date_of_birth: `${data.yyyy}-${data.mm}-${data.dd}`
        }))
    }


    return (
        <div>
            <form onSubmit={handleSubmit((data) => handleUpdate(data))}>
                <div className='space-y-5'>
                    <h3 className='font-extrabold text-3xl uppercase'>edit your details</h3>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            First Name:
                            <input type="text" className="grow" {...register("first_name", {
                                required: 'First Name is required',
                            })} />
                        </label>
                        {
                            errors.first_name && <span className='text-red-500 block'>{errors.first_name.message}</span>
                        }
                    </div>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            Last Name:
                            <input type="text" className="grow" {...register("last_name", {
                                required: 'Last Name is required',
                            })} />

                        </label>
                        {
                            errors.last_name && <span className='text-red-500 block'>{errors.last_name.message}</span>
                        }
                    </div>
                    <div className='space-y-2'>
                        <h3 className='font-bold text-lg uppercase'>date of birth</h3>
                        <div className='flex gap-x-5'>
                            <div className='space-y-3'>
                                <label className="input input-bordered flex items-center gap-2 ">
                                    dd:
                                    <input type="text" className="w-full" {...register("dd", {
                                        required: 'day is required',
                                    })} />
                                </label>
                                {
                                    errors.dd && <span className='text-red-500 block'>{errors.dd.message}</span>
                                }
                            </div>
                            <div className='space-y-3'>
                                <label className="input input-bordered flex items-center gap-2">
                                    mm:
                                    <input type="text" className="w-full" {...register("mm", {
                                        required: 'month is required',
                                    })} />

                                </label>
                                {
                                    errors.mm && <span className='text-red-500 block'>{errors.mm.message}</span>
                                }
                            </div>
                            <div className='space-y-3'>
                                <label className="input input-bordered flex items-center gap-2">
                                    yyyy:
                                    <input type="text" className="w-full" {...register("yyyy", {
                                        required: 'year is required',
                                    })} />

                                </label>
                                {
                                    errors.yyyy && <span className='text-red-500 block'>{errors.yyyy.message}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-neutral uppercase font-bold w-full justify-start'>update details</button>
                    <button type='button' className='btn uppercase font-bold w-full justify-start' onClick={() => { document.getElementById('account_modal').close() }}>cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetailForm