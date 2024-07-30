import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearOtp, sendOtp } from '../redux/slice/users.slice';
import VerificationOtpForm from './VerificationOtpForm';

const VerificationEmailForm = ({ props }) => {
    const dispatch = useDispatch()
    const { user, setForm } = props
    const { otp } = useSelector(state => state.users)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            "email": user?.email,
        }
    });

    const handleUpdate = (data) => {
        dispatch(sendOtp({
            id: user.id,
        }))
        document.getElementById('account_modal').close()
        setTimeout(() => {
            setForm(<VerificationOtpForm props={{ setForm }} />);
            document.getElementById('account_modal').showModal()
        }, 100)
    }

    const handleCloseModal = () => {
        document.getElementById('account_modal').close()
    }

    return (
        <div>
            <form onSubmit={handleSubmit((data) => handleUpdate(data))}>
                <div className='space-y-5'>
                    <h3 className='font-extrabold text-3xl uppercase'>Verification Email</h3>
                    <div className='space-y-3 flex gap-x-5'>
                        <label className="input input-bordered flex items-center gap-2 flex-1">
                            Email:
                            <input type="text" className='grow' {...register("email")} disabled />

                        </label>
                        {/* {
                        errors.first_name && <span className='text-red-500 block'>{errors.first_name.message}</span>
                    } */}
                        <button className='btn btn-neutral uppercase font-bold justify-start !m-0'>verify</button>
                    </div>

                    <button type='button' className='btn uppercase font-bold w-full justify-start' onClick={() => handleCloseModal()}>cancel</button>
                </div>
            </form>
        </div>
    )
}

export default VerificationEmailForm