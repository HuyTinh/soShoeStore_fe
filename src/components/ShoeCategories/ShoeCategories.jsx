import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import './ShoeCategories.scss'
import ShoeApi from '../../api/services/shoeApi';
import { useNavigate } from 'react-router-dom';

const ShoeCategories = () => {
    const navigate = useNavigate();

    const [shoeCategories, setShoeCategories] = useState([]);

    useEffect(() => {
        ShoeApi.getShoeCategories().then(res => {
            setShoeCategories(res)
        })
    }, [])


    const handleSearch = (value) => {
        navigate("/shoes?page=1&search=" + value)
    }


    return (
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
            animate="show">
            <Swiper
                slidesPerView={8}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className='my-swiper'
            >

                {
                    shoeCategories?.length && shoeCategories.map((category, index) =>
                        <SwiperSlide key={index} className='my-swiper-slide' onClick={() => handleSearch(category.title)}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                    delay: index % 20 * 0.05
                                }} className="card rounded-none overflow-hidden">
                                <figure>
                                    <img src={category.image_url} className='!h-44' alt='' />
                                </figure>
                                <div className="card-body p-4 pt-6">
                                    <h2 className="card-title">
                                        <span className='underline hover:bg-black hover:text-white font-bold'>{category.title}</span></h2>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </motion.section>
    );
}

export default ShoeCategories