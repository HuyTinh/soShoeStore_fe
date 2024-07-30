import React, { useEffect, useState } from 'react'
import TotalSalesLineChart from '../../components/TotalSalesLineChart'
import ShoeCategorySalesPieChart from '../../components/ShoeCategorySalesPieChart'
import SalesApi from '../../api/services/salesApi'

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();

const DashBoardPage = () => {
    const [topShoeSalesInMonth, setTopShoeSalesInMonth] = useState([])
    useEffect(() => {
        (async () => {
            setTopShoeSalesInMonth(await SalesApi.getTopShoeSalesInMonth())
        })()
    }, [])

    return (
        <div className='space-y-5'>
            <div className='flex gap-x-5'>
                <div className="card bg-white">
                    <div className="card-body">
                        <h2 className="card-title">Total Sales</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card bg-white">
                    <div className="card-body">
                        <h2 className="card-title">Product</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card bg-white">
                    <div className="card-body">
                        <h2 className="card-title">Order</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card bg-white">
                    <div className="card-body">
                        <h2 className="card-title">Customer</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex gap-x-3'>
                    <div className='w-2/3 *:flex-1 flex items-center bg-white rounded-2xl'>
                        <TotalSalesLineChart />
                    </div>
                    <div className='space-y-5 flex-1'>
                        <div className='bg-white rounded-2xl pt-5'>
                            <ShoeCategorySalesPieChart />
                        </div>
                        <div className='bg-white rounded-2xl pt-5'>
                            <ShoeCategorySalesPieChart />
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div className='bg-white p-5 rounded-2xl'>
                    <h3 className='text-2xl'>Best Seller <span className='font-bold italic underline text-black'>{month[d.getMonth()]} - {d.getFullYear()}</span> </h3>
                    <div className="overflow-x-auto max-h-96">
                        <table className="table">
                            {/* head */}
                            <thead className='sticky top-0 bg-white z-10'>
                                <tr className='text-lg'>
                                    <th>Name</th>
                                    <th>Sales</th>
                                    <th>Order Count</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    topShoeSalesInMonth.map((shoe, index) =>
                                        <tr key={index} className=''>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-24 w-24">
                                                            <img
                                                                src={shoe.imageUrl}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{shoe.name}</div>
                                                        {/* <div className="text-sm opacity-50">United States</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='font-bold'>
                                                {shoe.sales.toLocaleString()} VND
                                            </td>
                                            <td className='font-bold'>
                                                {shoe.orderCount}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage