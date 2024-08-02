import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromCart, updateFromCart } from "../redux/slice/carts.slice";

const CartItem = ({ cart }) => {
    const dispatch = useDispatch();
    const [isProcess, setIsProcess] = useState(false);
    const { user } = useSelector(state => state.users)


    const handleRemove = () => {
        setIsProcess(true)
        setTimeout(() => {
            dispatch(updateFromCart({ data: { cartId: user.id, cart: { ...cart, quantity: 0 } }, setIsProcess: setIsProcess }))
        }, 500)
    }

    const handleChange = (event) => {
        dispatch(updateFromCart(
            { data: { cartId: user.id, cart: { ...cart, quantity: parseInt(event.target.value) } } }))
    }

    return (
        <div className={`card card-side border rounded-none border-black relative ${isProcess ? 'opacity-50' : ''}`} >
            <figure className="w-48">
                <img src={cart.image_url} className="h-full object-cover" alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-normal">{cart.name}</h2>
                <p>{cart.price.toLocaleString()} đ</p>
                <p>Size: {cart.size.name}</p>
                <div className="card-actions justify-between">
                    <select className="select rounded-none select-bordered border-black w-full max-w-28 text-xl"
                        onChange={(e) => handleChange(e)} value={cart.quantity}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                                <option key={index} >{num}</option>
                            ))
                        }
                    </select>
                    <button className="btn" onClick={() => handleRemove()} disabled={isProcess}>{!isProcess ? 'Remove' : <span className="loading loading-spinner loading-lg"></span>}</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem