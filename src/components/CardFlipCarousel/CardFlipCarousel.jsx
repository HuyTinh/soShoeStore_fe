import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import "./CardFlipCarousel.scss";
import 'swiper/css/effect-cards';

const CardFlipImages = [
    "https://static.pxlecdn.com/photos/666459998/medium/445a1b55e75a2c616093.jpg",
    "https://static.pxlecdn.com/photos/570047942/medium/8c860ccc775143338b3c.jpg",
    "https://static.pxlecdn.com/photos/668763942/medium/2c27f1abf805736e2aeb.jpg",
    "https://static.pxlecdn.com/photos/669230981/medium/da2ad1e557d84b04a382.jpg",
    "https://static.pxlecdn.com/photos/653176348/medium/6223574f6ff2016e76a2.jpg",
    "https://static.pxlecdn.com/photos/653754208/medium/06b7d3f4c9e5d498f079.webp",
    "https://static.pxlecdn.com/photos/654007575/medium/f2e378197c6f59067f00.jpg",
    "https://static.pxlecdn.com/photos/666776522/medium/312d074ee45db45ae860.jpg",
    "https://static.pxlecdn.com/photos/665918508/medium/a9ab933b88db29dcb9e3.jpg",
    "https://static.pxlecdn.com/photos/654007574/medium/616af1631d8276bc08bf.jpg",
    "https://static.pxlecdn.com/photos/667884286/medium/58306557c7740e0c3419.jpg",
    "https://static.pxlecdn.com/photos/568362001/medium/b247edd9dbd1869cf58f.jpg",
    "https://static.pxlecdn.com/photos/566638057/medium/93c3db033bb925dfc099.jpg",
    "https://static.pxlecdn.com/photos/671638881/medium/dd6af196cdd8b8ee948b.jpg"
]

const CardFlipCarousel = () => {
    return (
        <div className="card-flip">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay, EffectCards]}
                className="swiper"
            >
                {
                    CardFlipImages.map((num, index) =>
                        <SwiperSlide key={index} className='swiper__slide'>
                            <img src={num} alt="" className='h-full object-cover' />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
}

export default CardFlipCarousel;