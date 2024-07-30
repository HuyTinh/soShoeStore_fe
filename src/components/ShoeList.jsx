import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";

import Pagination from "../components/Pagination";
import { getPageShoeList } from '../redux/slice/shoes.slice';
import CardItem from './CardItem';

const ShoeList = ({ props }) => {
    const dispatch = useDispatch();
    const { shoes, isLoading, pageable } = useSelector(state => state.shoes);
    let { sortBy, page, size, keyword } = props;

    useEffect(() => {
        if (page > 0) {
            page -= 1
        }
        const promise = dispatch(getPageShoeList({ page: page, size: size, sortBy: sortBy, search: keyword }));
        return () => {
            promise.abort();
        }
    }, [page, size, sortBy, keyword])


    if (isLoading) return <div className="grid grid-cols-5 px-20">
        {
            [...Array(15).keys()].map((item, index) =>
                <div className="flex flex-col col-span-1 m-2" key={index}>
                    <div className="skeleton h-80 w-full"></div>
                </div>)
        }
    </div>

    return (
        <div className='space-y-10 py-5 px-20'>
            <motion.section
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 1
                        }
                    }
                }}
                initial="hidden"
                animate="show"
                className="col-span-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-4">

                {
                    shoes.length > 0 && shoes.map((shoe, index) =>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                                delay: index % 20 * 0.05
                            }}
                            className="flex relative"
                            key={index}
                        >
                            <CardItem shoe={shoe} />
                        </motion.div>
                    )
                }
            </motion.section>
            <div className="flex justify-end col-span-5 px-10">
                <Pagination props={{ sortBy, size, keyword, pageable }} />
            </div>
        </div>
    )
}

export default ShoeList