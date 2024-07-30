import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom"
import { getCartList, refeshCart, selectCartInfor } from "../redux/slice/carts.slice";
import { logo } from '../assets/index'
import { useEffect } from "react";
import SearchField from "./SearchField/SearchField";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import AuthenticationRoute from "./AuthenticationRoute";

const Navbar = () => {
    const { totalPrice, totalQuantity } = useSelector((state) => selectCartInfor(state));
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.id) {
            const promise = dispatch(getCartList(user?.id));
            return () => {
                promise.abort()
            }
        } else {
            dispatch(refeshCart())
        }
    }, [dispatch, user])

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar lg:px-10 py-4 border-b">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 max-lg:justify-center max-lg:translate-x-8">
                        <Link to={"/"} className="text-3xl" aria-label="go back home">
                            <img src={logo} className="w-20" alt="" />
                        </Link></div>
                    <div className="flex-1 pe-2 me-2 max-lg:hidden">
                        <ul className="*:font-bold text-lg flex gap-5">
                            {
                                ['Home', 'Shoes'].map((item, index) =>
                                    <li className="border-b-4 border-transparent hover:border-black px-2 pt-4 text-2xl" key={index}>
                                        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="flex-none gap-x-3">
                        <SearchField />
                        <div className="dropdown dropdown-end">
                            <AuthenticationRoute user={user} to={'/cart'}>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="cart-btn">
                                    {
                                        user && totalQuantity > 0 && <span className="absolute -top-1 -right-1 bg-slate-200  p-1 px-2 rounded-badge text-xs">{totalQuantity}</span>
                                    }
                                    <div>
                                        <IoCartOutline size={18} />
                                    </div>
                                </div>
                            </AuthenticationRoute>
                            {/* <div tabIndex={0} className="mt-3 z-20 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{totalQuantity} Items</span>
                                    <span className="text-info">Subtotal: {totalPrice.toLocaleString()} đ</span>
                                    <div className="card-actions">
                                        <Link className="btn btn-block" to={'/cart'}>View cart</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="dropdown dropdown-end">
                            <AuthenticationRoute user={user} to={'/my-account'}>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="avatar-btn">
                                    <div>
                                        <FaRegUser size={18} />
                                    </div>
                                </div>
                            </AuthenticationRoute>

                            {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><Link to={"/order-history"}>
                                    Order
                                </Link></li>
                                <li><a>Logout</a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 py-6 w-80 min-h-full bg-base-200 font-bold text-xl">
                    {/* Sidebar content here */}
                    <li><Link to={'/shoes'}>Shoes</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar