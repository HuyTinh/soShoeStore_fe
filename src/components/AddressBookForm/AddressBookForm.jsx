import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './AddressBookForm.scss'
import { FaRegTimesCircle } from 'react-icons/fa';
import { updateContact } from '../../redux/slice/users.slice';

const AddressBookForm = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            phone_number: user.phone_number,
            street_number: user.address?.split(',')[0],
            province: user.address?.split(',')[2],
            district_or_town: user.address?.split(',')[1],
        }
    });

    const handleUpdate = (data) => {
        dispatch(updateContact({
            id: user.id,
            phone_number: data.phone_number,
            address: data.street_number + ', ' + data.district_or_town + ', ' + data.province,
        }))
    }

    return (
        <div>
            <form onSubmit={handleSubmit((data) => handleUpdate(data))} className='address-book_form'>
                <div className='space-y-5'>
                    <h3 className='font-extrabold text-3xl uppercase'>edit your address</h3>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-1 font-bold">
                            Phone Number:
                            <input type="text" className="grow font-normal" {...register("phone_number", {
                                required: 'Phone number is required',
                            })} />

                        </label>
                        {
                            errors.phone_number && <span className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.phone_number.message}</span>
                        }
                    </div>
                    <div className='space-y-3'>
                        <label className="input input-bordered flex items-center gap-1 font-bold">
                            Street Number:
                            <input type="text" className="grow font-normal" {...register("street_number", {
                                required: 'Street number is required',
                            })} />

                        </label>
                        {
                            errors.street_number && <span className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.street_number.message}</span>
                        }
                    </div>
                    <div className='flex *:flex-1 gap-x-5'>
                        <div className='space-y-3'>
                            <label className="input input-bordered flex items-center gap-1 font-bold">
                                Province:
                                <input type="text" className="grow font-normal" {...register("province", {
                                    required: 'Province is required',
                                })} />

                            </label>
                            {
                                errors.province && <span className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.province.message}</span>
                            }
                        </div>
                        <div className='space-y-3'>
                            <label className="input input-bordered flex items-center gap-1 font-bold">
                                District or Town:
                                <input type="text" className="grow font-normal" {...register("district_or_town", {
                                    required: 'District or Town is required',
                                })} />

                            </label>
                            {
                                errors.district_or_town && <span className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.district_or_town.message}</span>
                            }
                        </div>
                    </div>
                    <button className='btn btn-neutral uppercase font-bold w-full justify-start'>update address</button>
                    <button type='button' className='btn uppercase font-bold w-full justify-start' onClick={() => { document.getElementById('account_modal').close() }}>cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddressBookForm