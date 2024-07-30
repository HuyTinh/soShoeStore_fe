import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ChangePasswordForm from './ChangePasswordForm'
import { clearOtp } from '../redux/slice/users.slice'

const VerificationOtpForm = ({ props }) => {
    const { setForm } = props
    const dispatch = useDispatch()
    const { otp } = useSelector(state => state.users)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
    });

    const handleVerificationOtp = (data) => {
        if (otp == data.otp) {
            document.getElementById('account_modal').close()
            dispatch(clearOtp())
            setTimeout(() => {
                setForm(<ChangePasswordForm />);
                document.getElementById('account_modal').showModal()
            }, 100)

        }
    }

    const handleCloseModal = () => {
        document.getElementById('account_modal').close()
    }

    return (
        <div>
            <form onSubmit={handleSubmit((data) => handleVerificationOtp(data))}>
                <div className='space-y-5'>
                    <h3 className='font-extrabold text-3xl uppercase'>Verification Otp</h3>
                    <div className='space-y-3 flex gap-x-5'>
                        <label className="input input-bordered flex items-center gap-2 flex-1">
                            OTP:
                            <input type="text" className='grow' {...register("otp")} />

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

export default VerificationOtpForm