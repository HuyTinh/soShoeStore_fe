import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getShoeFilterList } from '../../redux/slice/filter.slice';
import './SearchField.scss'

const SearchField = () => {
    const { shoes, isLoading, pageable } = useSelector(state => state.filter);
    const [inp, setIpn] = useState('');

    const dispatch = useDispatch();

    const handleOnSearch = (e) => {
        e.preventDefault();
        dispatch(getShoeFilterList({ page: 0, size: 20, sortBy: '', search: e.target.value }))
        setIpn(e.target.value);
    }

    return (
        <div className='relative'>
            <label className="input input-bordered flex items-center gap-2 group">
                <input value={inp} onChange={(e) => handleOnSearch(e)} type="text" className="grow search__field" placeholder="Search" />

                {
                    shoes?.length > 0 && <div
                        className="absolute top-[105%] w-[150%] bg-base-100 right-0 z-20 hidden hover:block h-[26.5rem] overflow-auto">
                        <Link to={`/shoes?page=1${inp != '' ? `&search=${inp}` : ''}`} className='px-2 underline hover:bg-black hover:text-white'>Xem tất cả {pageable.totalElements}</Link>
                        {
                            shoes.map((shoe, index) =>
                                <Link to={`/shoes/${shoe.id}`} key={index}>
                                    <div className="flex p-2 gap-2">
                                        <figure className='w-1/3 h-full'>
                                            <img src={shoe.image_url}
                                                className='h-full object-cover'
                                                alt="Album" />
                                        </figure>
                                        <div className="w-2/3">
                                            <h2 className="card-title">{shoe.name}</h2>
                                            <p>{shoe.price?.toLocaleString()} đ</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                }
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
        </div>
    )
}

export default SearchField