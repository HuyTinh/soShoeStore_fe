import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import { deleteShoe, getPageShoeList } from '../../redux/slice/shoes.slice'
import Pagination from '../../components/Pagination'
import ShoeManageModalTab from '../../components/ShoeManageModalTab'
import queryString from 'query-string'

const ShoeManagementPage = () => {
    const [selectedId, setSelectedId] = useState()
    const { shoes, isLoading, pageable } = useSelector(state => state.shoes)
    let [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    // const searchParams = queryString.parse(location.search);
    let page = searchParams.get('page') || 0;
    let size = searchParams.get('size') || 20;
    let sortBy = searchParams.get('sortBy') || '';
    let keyword = searchParams.get('search') || '';

    useEffect(() => {
        if (page > 0) {
            page -= 1
        }
        const promise = dispatch(getPageShoeList({ page: page, size: size, sortBy: sortBy, search: keyword }))
        return () => {
            promise.abort()
        }

    }, [dispatch, page, size, sortBy, keyword])

    const handleClickShoeDetail = (e, shoeId) => {
        e.preventDefault()
        setSelectedId(shoeId)
    }

    const handleClickDeleteShoe = (e, shoeId) => {
        e.preventDefault()
        dispatch(deleteShoe(shoeId))
    }

    if (isLoading) {
        return <div>Loading...</div>
    }



    return (
        <div>
            <div className='flex flex-col w-full h-[675px] gap-y-2'>
                <div className='flex justify-end'>
                    <Pagination props={{ page: page, size: size, sortBy: sortBy, keyword: keyword, pageable: pageable }} />
                </div>
                <div>
                    <button className='btn btn-accent' onClick={(e) =>
                        handleClickShoeDetail(e, -1)}>create</button>
                </div>
                <div className="overflow-x-auto flex-1 bg-white">
                    <motion.table className="table table-pin-rows">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Shoe Infor</th>
                                <th>Price</th>
                                <th>Create At</th>
                                <th>Update At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <motion.tr layoutId={-1} className='hidden'>
                            </motion.tr>
                            {
                                shoes.map((shoe, index) =>
                                    <motion.tr layoutId={shoe.id} key={index} >
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-24 w-24">
                                                        <img
                                                            src={shoe.image_url} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {shoe.name}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        Colour: {
                                                            shoe.colour.vamp.name + ' / '
                                                            + shoe.colour.quarter.name + ' / '
                                                            + shoe.colour.sole.name
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {shoe.price.toLocaleString()} đ
                                        </td>
                                        <td>{shoe.created_at}</td>
                                        <td>{shoe.updated_at}</td>
                                        <th className='space-x-2'>
                                            <button className="btn btn-info btn-sm" onClick={(e) =>
                                                handleClickShoeDetail(e, shoe.id)}>details</button>
                                            <button className="btn btn-primary btn-sm" onClick={(e) =>
                                                handleClickDeleteShoe(e, shoe.id)}>delete</button>
                                        </th>
                                    </motion.tr>
                                )
                            }
                        </tbody>
                    </motion.table>
                </div>
            </div> <AnimatePresence>
                {selectedId && (
                    <motion.div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-50">
                        <motion.div className="absolute bg-black/15 w-full h-full" onClick={() => setSelectedId(null)} ></motion.div>
                        <motion.div className="bg-white w-4/5 rounded-lg z-10" layoutId={selectedId}
                        >
                            <ShoeManageModalTab props={{
                                shoeId: selectedId,
                                setSelectedId: setSelectedId
                            }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ShoeManagementPage