import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay } from 'swiper/modules';
import './HeaderCarousel.scss'
import { golf, running, soccer, tennis, basketball } from '../../assets/index';

const headerImages = [
    {
        image_url: basketball,
        title: "Basketball",
    },
    {
        image_url: soccer,
        title: "Soccer",
    },
    {
        image_url: tennis,
        title: "Tennis",
    },
    {
        image_url: running,
        title: "Running",
    },
    {
        image_url: golf,
        title: "Golf"
    }
]

const HeaderCarousel = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                    }
                }}
                modules={[Autoplay]}
                className="swiper rounded-3xl"
            >
                {
                    headerImages.map(({ title, image_url }, index) =>

                        < SwiperSlide key={index} className='swiper__slide' >
                            <div className='relative h-full w-full'>
                                <img src={image_url} alt="" />
                                <div className='absolute bottom-0 p-5'>
                                    <span className='text-white text-2xl font-bold'>{title}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}
export default HeaderCarousel; 
