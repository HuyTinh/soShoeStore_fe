import React from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const ShoeManageTable = () => {
    const [selectedId, setSelectedId] = useState(null)
    const { shoes, isLoading, pageable } = useSelector(state => state.shoes)
    let [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    let page = searchParams.get('page') || 0;
    let size = searchParams.get('size') || 20;
    let sortBy = searchParams.get('sortBy') || '';
    let keyword = searchParams.get('search') || '';


    useEffect(() => {
        const promise = dispatch(getPageShoeList({ page: page, size: size, sortBy: sortBy, search: keyword }))
        return () => {
            promise.abort()
        }

    }, [page, size, sortBy, keyword, dispatch])

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
    )
}

export default ShoeManageTable