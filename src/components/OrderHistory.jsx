import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getOrderByUserId } from '../redux/slice/orders.slice';
import { AnimatePresence, motion } from 'framer-motion';
import { set } from 'react-hook-form';

const OrderHistory = () => {
    const { orders, isLoading, pageable } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const [orderDetail, setOrderDetail] = useState();
    const [selectedId, setSelectedId] = useState(null)
    const { user } = useSelector(state => state.users)

    useEffect(() => {
        if (user?.id) {
            const promise = dispatch(getOrderByUserId(user.id));
            return () => {
                promise.abort();
            }
        }
    }, [dispatch, user])

    const handleClickOrderDetail = (orderId) => {
        setOrderDetail(orders.find(order => order.id === orderId))
        setSelectedId(orderId)
    }


    return (
        <div>
            <div className="py-10 px-12 lg:px-24 xl:px-48">
                <div className="grid grid-cols-3">
                    <div className="md:col-span-3">
                        <div className="overflow-hidden">
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th ></th>
                                        <th className='text-lg'>Order Id</th>
                                        <th className='text-lg'>Order Date</th>
                                        <th className='text-lg'>Shipping Date</th>
                                        <th className='text-lg'>Total Money</th>
                                        <th className='text-lg'>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isLoading && [...orders]?.sort((a, b) => {
                                            return new Date(b.order_date).getTime() - new Date(a.order_date).getTime()

                                        }).map((order, index) =>
                                            <motion.tr layoutId={order.id} key={index}>
                                                <th>{index + 1}</th>
                                                <td>#{order.id}</td>
                                                <td>{order.order_date}</td>
                                                <td>{order.shipping_date}</td>
                                                <td>{order.total_money.toLocaleString()} đ</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <button className="btn btn-info btn-xs" onClick={() =>
                                                        handleClickOrderDetail(order.id)}>Detail</button>
                                                </td>
                                            </motion.tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence >
                {selectedId && (
                    <motion.div className="fixed w-full h-full top-0 flex justify-center items-center z-50" >
                        <motion.div className="absolute bg-black/15 w-full h-full" onClick={() => setSelectedId(null)} ></motion.div>
                        <motion.div className="bg-white w-4/5 rounded-lg p-5 z-10" layoutId={selectedId} >
                            <div className="px-5">
                                <div>
                                    <div className="mb-5 space-y-2">
                                        <div className="flex justify-between font-extrabold text-2xl mb-5">
                                            <h2 className="uppercase">Order Detail #{orderDetail.id}</h2>
                                        </div>
                                        <div>
                                            <p className='font-bold underline'>Order Info</p>
                                        </div>
                                        <div className='ps-2'>
                                            <div className='mb-3 flex *:flex-1'>
                                                <div className='space-x-2'>
                                                    <span>+ First Name: </span>
                                                    <span className='font-bold text-xl'>{`${orderDetail?.first_name}`}</span>
                                                </div>
                                                <div className='space-x-2'>
                                                    <span>+ Last Name:</span>
                                                    <span className='font-bold text-xl'>
                                                        {orderDetail?.last_name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span>+ Phone Number: </span>
                                                    <span className='font-bold text-xl'>{orderDetail?.phone_number}</span>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className='space-x-2'>
                                                    <span>+ Address: </span>
                                                    <span className='font-bold text-xl'>{orderDetail?.address}</span></div>
                                            </div>
                                            {orderDetail?.note != null && <div className='space-x-2 mb-3'>
                                                <span>+ Note: </span>
                                                <span className='font-bold text-xl'>{orderDetail?.note}</span>
                                            </div>
                                            }
                                            <div className='mb-3 flex *:flex-1'>
                                                <div>
                                                    <span>+ Total Money: </span>
                                                    <span className='font-bold text-xl'>{orderDetail?.total_money.toLocaleString()} đ</span>
                                                </div>
                                                <div>
                                                    <span>+ Shipping Method: </span>
                                                    <span className='font-bold text-xl'>{orderDetail?.shipping_method}</span>
                                                </div>
                                                <div>
                                                    <span>+ Payment Method: </span>
                                                    <span className='font-bold text-xl'>{orderDetail?.payment_method}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider before:bg-black after:bg-black"></div>
                            <div className="overflow-auto max-h-80">
                                <table className="table table-pin-rows">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-lg'>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Total Money</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderDetail?.order_details.map((item, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle h-24 w-24">
                                                                    <img
                                                                        src={item.image_url}
                                                                        alt="Avatar Tailwind CSS Component" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{item.shoe_name} x {item.number_of_product}</div>
                                                                <div className="text-sm opacity-50">
                                                                    Size: {item.size.name}</div>
                                                                <div className="text-sm opacity-50">Colour: {
                                                                    item.colour.vamp.name + ' / '
                                                                    + item.colour.quarter.name + ' / '
                                                                    + item.colour.sole.name
                                                                }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.price.toLocaleString()} đ
                                                    </td>
                                                    <td>{item.total_money.toLocaleString()} đ</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    )
}

export default OrderHistory