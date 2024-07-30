import { BsArrowRight } from "react-icons/bs"
import CartItem from "../../components/CartItem"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartInfor } from "../../redux/slice/carts.slice";
import { motion } from 'framer-motion'

const CartPage = () => {
    const { carts, totalPrice, totalQuantity } = useSelector(state => selectCartInfor(state));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }} className="py-20 px-10 lg:px-24 xl:px-48">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <div>
                        <h2 className="font-bold text-5xl">YOUR BAG {!totalQuantity && 'IS EMPTY'}</h2>

                        {totalQuantity ? <p className="my-5 text-lg">TOTAL ({totalQuantity} items) {totalPrice.toLocaleString()}₫
                            <br />
                            Items in your bag are not reserved — check out now to make them yours.</p> : <p className="my-5 text-lg">Once you add something to your bag - it will appear here. Ready to get started?</p>}
                    </div>
                    {totalQuantity ? <div className="space-y-5">
                        {
                            carts.map((cart, index) => (
                                <CartItem cart={cart} key={index} />
                            ))

                        }
                    </div> :
                        <div>
                            <Link to={'/shoes'}>
                                <button className="btn font-bold text-2xl rounded-none uppercase">Get started<BsArrowRight size={32} /></button>
                            </Link>
                        </div>}
                </div>
                {!!totalQuantity &&
                    <div className="px-5">
                        <div>
                            <Link to={'/check-out'}>
                                <button className="btn w-full rounded-none text-2xl font-bold justify-between">
                                    <span>CHECKOUT</span>
                                    <BsArrowRight size={32} />
                                </button>
                            </Link>
                        </div>
                        <div className="my-10">
                            <div className="mb-5">
                                <h2 className="font-bold text-xl mb-5">ORDER SUMMARY</h2>
                                <div className="flex justify-between">
                                    <p className="text-lg">{totalQuantity} items</p>
                                    <p>{totalPrice.toLocaleString()} đ</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-lg">Delivery</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className="divider before:bg-black after:bg-black"></div>
                            <div className="mb-5">
                                <div className="flex justify-between font-bold text-lg ">
                                    <h2 className="mb-5">TOTAL</h2>
                                    <p>{totalPrice.toLocaleString()} đ</p>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </motion.div>
    )
}

export default CartPage