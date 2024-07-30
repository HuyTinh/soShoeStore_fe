import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const FilterAndSort = ({ props }) => {
    let { sortBy, size, keyword } = props;
    const navigate = useNavigate();

    const handleOnFilterAndSort = (value) => {
        navigate(`/shoes?page=1${size != 20 ? `&size= ${size}
    ` : ""}${value != '' ? `&sortBy=${value}` : ''}${keyword != '' ? `&search=${keyword}` : ''}`)
        window.scrollTo(0, 0)
    }

    return (
        <div className="drawer drawer-end flex justify-end sticky top-0 p-5 bg-white z-10">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" aria-label="filter" />
            <div className="drawer-content felx">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-outline">Filter & Sort<FaFilter /></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu w-96 min-h-full bg-base-200 text-base-content p-0 py-5">
                    <div className="flex justify-between items-center border-b-2 border-b-gray-300 px-3 py-2">
                        <span className="text-xl font-bold">Filter & Sort</span>
                        <div className='flex items-center gap-x-2'>
                            <span className="text-lg hover:underline cursor-pointer" onClick={() => handleOnFilterAndSort('')}>Clear</span>
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="cursor-pointer pe-2"><IoCloseOutline size={32} /></label>
                        </div>
                    </div>
                    <div className="collapse rounded-none border-b-2 border-b-gray-300">
                        <input type="checkbox" />
                        <div className="collapse-title px-3 font-bold text-lg ">
                            Sort by
                        </div>
                        <div className="collapse-content px-3 uppercase space-y-5">
                            {
                                [
                                    {
                                        title: "Price (Low - High)",
                                        value: 'price-low-high'
                                    },
                                    {
                                        title: "Price (High - Low)",
                                        value: 'price-high-low'
                                    },
                                    {
                                        title: "Name (A - Z)",
                                        value: 'name-a-z'
                                    },
                                    {
                                        title: "Name (Z - A)",
                                        value: 'name-z-a'
                                    }
                                ].map((item, index) =>
                                    <div key={index} className={sortBy === item.value ? 'border-s-2 border-s-black ps-2' : ''} >
                                        <span onClick={() => handleOnFilterAndSort(item.value)} className='cursor-pointer '>{item.title}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterAndSort