import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCartInfor } from "../../redux/slice/carts.slice";
import CheckOutItem from "../../components/CheckOutItem";
import { useEffect } from "react";
import CheckOutForm from "../../components/CheckOutForm/CheckOutForm";

const CheckOutPage = () => {
    const { carts, totalPrice, totalQuantity } = useSelector(state => selectCartInfor(state));
    const navigate = useNavigate();

    useEffect(() => {
        if (totalQuantity === 0) {
            navigate('/cart');
        }
    }, [carts])

    return (
        <div className="py-20 px-12 lg:px-24 xl:px-48">
            <div className="grid grid-cols-3">
                <div className="col-span-3 text-center mb-10">
                    <h2 className="font-extrabold text-5xl uppercase">CheckOut</h2>

                    {<p className="my-5 text-xl font-semibold">({totalQuantity} items) {totalPrice.toLocaleString()} ₫</p>}
                </div>
                <div className="col-span-3 md:col-span-2">
                    <CheckOutForm props={{ totalPrice, carts }} />
                </div>
                {!!totalQuantity &&
                    <div className="px-5">
                        <div>
                            <div className="mb-5 space-y-2">
                                <div className="flex justify-between font-extrabold text-2xl mb-10">
                                    <h2 className="uppercase">your cart</h2>
                                    <Link className="hover:bg-black hover:no-underline underline hover:text-white px-1 font-medium" to={'/cart'}>Edit</Link>
                                </div>
                                <div className="flex justify-between text-xl">
                                    <p>{totalQuantity} items</p>
                                    <p>{totalPrice.toLocaleString()} đ</p>
                                </div>
                                <div className="flex justify-between text-xl">
                                    <p>Delivery</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-between font-bold text-2xl">
                                    <h2 className="mb-5">TOTAL</h2>
                                    <p>{totalPrice.toLocaleString()} đ</p>
                                </div>
                            </div>
                            <div className="divider before:bg-black after:bg-black"></div>
                            <div className="space-y-5">
                                {
                                    carts.map((cart, index) => (
                                        <CheckOutItem cart={cart} key={index} />
                                    ))

                                }
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default CheckOutPage