import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import React from 'react';

const CarouselItem = React.memo(({ images }) => {
    return (
        <>
            {
                images?.length > 0 && (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                    >
                        {
                            images.map((image, index) => (
                                <SwiperSlide key={index} >
                                    <img src={image.image_url} alt={`image-${index}`} className='w-full' />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
            }
        </>
    );
});

export default CarouselItem;
