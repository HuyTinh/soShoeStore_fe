import React from 'react'

const AccountModal = ({ children }) => {
    return (
        <dialog id="account_modal" className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AccountModal