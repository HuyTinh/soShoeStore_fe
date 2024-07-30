import { useSelector } from "react-redux";
import AccountDetailForm from "./AccountDetailForm";
import VerificationEmailForm from "./VerificationEmailForm";
import { useOutletContext } from "react-router-dom";


const AccountProfile = () => {
    const { user } = useSelector(state => state.users)
    const [form, setForm] = useOutletContext();
    const handleChangeForm = (form) => {
        setForm(form);
        document.getElementById('account_modal').showModal()
    }
    return (
        <div className='p-5 space-y-5'>
            <div className='space-y-3'>
                <h3 className='font-extrabold text-3xl uppercase'>details</h3>
                <p className='uppercase'>{user.first_name + ' ' + user.last_name}</p>
                <p>{user.date_of_birth}</p>
                <span className='inline-block uppercase font-bold underline hover:text-white hover:bg-black cursor-pointer' onClick={() => handleChangeForm(<AccountDetailForm user={user} />)}>edit</span>
            </div>
            <div className='space-y-3'>
                <h3 className='font-extrabold text-3xl uppercase'>login details</h3>
                <div className='space-y-5'>
                    <div className='space-y-3'>
                        <h4 className='font-bold uppercase text-lg'>email</h4>
                        <p className='uppercase'>{user.email}</p>
                    </div>
                    <div>
                        <h4 className='font-bold uppercase text-lg'>password</h4>
                        <p>*************</p>
                        <span className='inline-block uppercase font-bold underline hover:text-white hover:bg-black cursor-pointer' onClick={() => handleChangeForm(<VerificationEmailForm props={{ user, setForm }} />)}>edit</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountProfile