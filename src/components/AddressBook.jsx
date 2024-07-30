import { useSelector } from "react-redux"
import { useOutletContext } from "react-router-dom";
import AddressBookForm from "./AddressBookForm/AddressBookForm";

const AddressBook = () => {
    const { user } = useSelector(state => state.users)
    const [form, setForm] = useOutletContext();

    const handleChangeForm = (form) => {
        setForm(form);
        document.getElementById('account_modal').showModal()
    }

    return (
        <div className='p-5 space-y-5'>
            <div className="space-y-3">
                <h1 className="text-3xl font-bold uppercase">
                    Address Book
                </h1>
                <div>
                    <div className="card bg-base-100 w-96 border p-5">
                        <h2 className="card-title">Address</h2>
                        <div className="card-body p-1">
                            <div>
                                <span className="font-bold">Email: </span>
                                <span className="font-thin text-xl italic">{user.email}</span>
                            </div>
                            <div>
                                <span className="font-bold">Phone Number: </span>
                                <span className="font-thin text-xl italic">{user.phone_number}</span>
                            </div>
                            <div>
                                <span className="font-bold">Address:</span>
                                <span className="font-thin text-xl italic">{user.address}</span>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-neutral btn-md" onClick={() => handleChangeForm(<AddressBookForm />)}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressBook