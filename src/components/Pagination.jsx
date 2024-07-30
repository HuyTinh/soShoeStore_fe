import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Pagination = ({ props }) => {
    const navigate = useNavigate();
    const location = useLocation()
    let { sortBy, size, keyword, pageable } = props;

    const handleOnChangePage = (event) => {
        navigate(`${location.pathname}?page=${event.target.value}${size != 20 ? `&size= ${size}
    ` : ""}${sortBy != '' ? `&sortBy=${sortBy}` : ''}${keyword != '' ? `&search=${keyword}` : ''}`)
        window.scrollTo(0, 0)
    }

    return (
        <div className='flex items-center gap-5 text-xl'>
            <span>Page</span>
            <select className="select select-bordered rounded-none text-lg" onChange={(e) => handleOnChangePage(e)} defaultValue={pageable?.pageNumber + 1} aria-label="pagination">
                {
                    [...Array(pageable?.totalPages).keys()].map((num, index) => {
                        return <option value={num + 1} key={index} >{num + 1}</option>
                    })
                }
            </select>
            <span>of {pageable?.totalPages}</span>
        </div>
    )
}

export default Pagination