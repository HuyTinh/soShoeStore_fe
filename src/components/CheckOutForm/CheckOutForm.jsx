import React from 'react'
import { useForm } from 'react-hook-form';
import { FaRegTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './CheckOutForm.scss';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/slice/orders.slice';


const CheckOutForm = ({ props }) => {
    const { totalPrice, carts } = props;
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const onSubmit = (data) => {
        dispatch(createOrder(
            {
                order: {
                    user_id: user.id,
                    email: data.email,
                    phone_number: data.phone_number,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    address: data.street_number + ' ' + data.district_or_town + ' ' + data.province,
                    shipping_method: "express",
                    payment_method: "cod",
                    total_money: totalPrice
                },
                cart: carts
            }
        ))
        showSwal()
    }

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: "Checkout Successfully!",
            icon: "success",
            willClose: reset()
        })
    }

    const handlerUseCurrentContact = (event) => {
        if (event.target.checked) {
            reset({
                email: user.email,
                phone_number: user.phone_number,
                first_name: user.first_name,
                last_name: user.last_name,
                street_number: user.address.split(',')[0],
                province: user.address.split(',')[1],
                district_or_town: user.address.split(',')[2],
            })
        } else {
            reset({
                email: '',
                phone_number: '',
                first_name: '',
                last_name: '',
                street_number: '',
                province: '',
                district_or_town: '',
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="checkout_form">

            <div className="mb-5 grid grid-cols-2 space-y-2 gap-5">
                <div className="flex col-span-2 justify-between font-extrabold text-2xl mb-5">
                    <h2 className="uppercase">contact</h2>
                    <div className="form-control font-normal ">
                        <label className="label cursor-pointer space-x-2">
                            <input type="checkbox" className="checkbox" onChange={(event) => handlerUseCurrentContact(event)} />
                            <span className="label-text">Use Your Current Contact</span>
                        </label>
                    </div>
                </div>

                <div className="col-span-1">
                    <label
                        htmlFor="UserEmail"
                        className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                    >
                        <input
                            type="email"
                            id="UserEmail"
                            {...register("email", {
                                required: "Please enter your email", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder=""
                            className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md "
                        />

                        <span
                            className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                        >
                            Email
                        </span>
                    </label>
                    <div>
                        {errors.email && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.email.message}</p>}
                    </div>
                </div>
                <div className="col-span-1">
                    <label
                        htmlFor="UserPhoneNumber"
                        className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                    >
                        <input
                            type="text"
                            id="UserPhoneNumber"
                            {...register("phone_number", {
                                required: "Please enter your phone number"
                            })}
                            placeholder=""
                            className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md "
                        />

                        <span
                            className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                        >
                            Phone Number
                        </span>
                    </label>
                    <div>
                        {errors.phone_number && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.phone_number.message}</p>}
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="mb-5 space-y-2">
                <div className="flex flex-col font-extrabold text-2xl mb-5">
                    <h2 className="uppercase">address</h2>
                    <p className="text-sm">Delivery address</p>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-1 col-span-2">
                        <label
                            htmlFor="UserFirstName"
                            className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                        >
                            <input
                                type="text"
                                id="UserFirstName"
                                {...register("first_name", { required: "Please enter your First Name" })}
                                placeholder=""
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md"
                            />

                            <span
                                className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                            >
                                First Name
                            </span>
                        </label>
                        <div>
                            {errors.first_name && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.first_name.message}</p>}
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <label
                            htmlFor="UserLastName"
                            className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                        >
                            <input
                                type="text"
                                id="UserLastName"
                                {...register("last_name", { required: "Please enter your Last Name" })}
                                placeholder=""
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md"
                            />

                            <span
                                className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                            >
                                Last Name
                            </span>
                        </label>
                        <div>
                            {errors.last_name && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.last_name.message}</p>}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label
                            htmlFor="UserStreetNumberandName"
                            className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                        >
                            <input
                                type="text"
                                id="UserStreetNumberandName"
                                {...register("street_number", { required: "Please enter your Street Number/Street Name" })}
                                placeholder=""
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md"
                            />

                            <span
                                className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"

                            >
                                Street Number/Street Name
                            </span>
                        </label>
                        <div>
                            {errors.street_number && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.street_number.message}</p>}
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <label
                            htmlFor="UserProvince"
                            className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                        >
                            <input
                                type="text"
                                id="UserProvince"
                                {...register("province", { required: "Please enter your Province" })}
                                placeholder=""
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md"
                            />

                            <span
                                className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                            >
                                Province
                            </span>
                        </label>
                        <div>
                            {errors.province && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.province.message}</p>}
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <label
                            htmlFor="UserDistrictorTown"
                            className={"relative block overflow-hidden rounded-none border border-b-4 border-black px-3 pt-3 shadow-sm mb-3"}
                        >
                            <input
                                type="text"
                                id="UserDistrictorTown"
                                {...register("district_or_town", { required: "Please enter your District or Town" })}
                                placeholder=""
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-md"
                            />

                            <span
                                className="absolute start-2 top-4 -translate-y-1/2 text-lg text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-focus:top-4"
                            >
                                District or Town
                            </span>
                        </label>
                        <div>
                            {errors.district_or_town && <p className='error_badges'><FaRegTimesCircle className="inline mb-1 mr-1" />{errors.district_or_town.message}</p>}
                        </div>
                    </div>
                    <div>
                        {/* <Link to={'/shoes'}> */}
                        <button className="btn font-bold text-2xl rounded-none uppercase" type="submit">CheckOut</button>
                        {/* </Link> */}
                    </div>
                </div>

            </div>
        </form>
    )
}

export default CheckOutForm