import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderCarousel from "../../components/HeaderCarousel/HeaderCarousel";
import CardFlipCarousel from "../../components/CardFlipCarousel/CardFlipCarousel";
import { motion } from 'framer-motion'
import { getAllCurrentShoeMustHave } from "../../redux/slice/shoes.slice";
import CardItem from "../../components/CardItem";
import { banner } from '../../assets/index'

const HomePage = () => {
    const dispatch = useDispatch();
    const { currentShoeMustHave } = useSelector(state => state.shoes)

    useEffect(() => {
        const promise = dispatch(getAllCurrentShoeMustHave());
        return () => promise.abort();
    }, [dispatch])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
            exit={{ opacity: 0 }} className="min-h-screen space-y-10">
            <div className="overflow-hidden relative">
                <div className="absolute bottom-1/4 px-24 space-y-5">
                    <div className="space-y-2">
                        <span className="text-xl lg:text-4xl font-bold uppercase">Fresh fits your summer</span>
                        <p className="text-md lg:text-2xl">EXPLORE SUMMER SHOP</p>
                    </div>
                    <button className="btn btn-neutral text-md lg:text-xl rounded-full">View more</button>
                </div>
                <img src={banner} alt="" />
            </div>
            <div className="px-10 space-y-5 pb-10">

                <div className="flex gap-5 flex-col">
                    <div>
                        <span className="text-3xl font-bold ps-5 uppercase">Shop by Sport</span>
                    </div>
                    <div className="w-full flex gap-5">
                        <div className="w-4/5 relative rounded-3xl">
                            <HeaderCarousel />
                            <div className="absolute bottom-0 right-0 px-5 py-3 bg-white rounded-br-2xl rounded-tl-3xl z-10">
                                <div className="relative">
                                    <button className="btn btn-neutral text-xl rounded-full">Shop now</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/5 overflow-auto rounded-3xl">
                            <video src="https://res.cloudinary.com/dprkvtle0/video/upload/v1718685596/mpxyf7ry0cwdq7pwvrnc.mp4" autoPlay={true} loop muted className="h-full object-cover"></video>
                        </div>
                    </div>
                </div>
                <div className="space-y-5">
                    <span className="font-bold uppercase text-3xl ps-5">CURRENT MUST-HAVES</span>
                    <div className="flex rounded-3xl overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-transparent gap-x-5 p-5">
                        {

                            currentShoeMustHave.map((shoe, index) =>
                                <div className="carousel-item" key={index}>
                                    <CardItem shoe={shoe} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex h-[30rem] gap-5 pb-5">
                    <div className="w-2/5 overflow-hidden rounded-3xl relative">
                        <div className="absolute w-full h-1/6 py-10 px-5 bottom-28  z-10">
                            <div className="inline-block bg-black/25 p-5 rounded-xl space-y-3">
                                <span className="block text-white text-xl font-bold uppercase">Fashion your style</span>
                                <button className="btn  text-xl rounded-full">View more</button>
                            </div>
                        </div>
                        <CardFlipCarousel />
                    </div>
                    <div className="w-4/5">
                        <div className="flex h-2/5 gap-2 ">
                            <div className="w-full bg-base-200/65 rounded-3xl">
                                <div className="flex w-full h-full flex-col justify-evenly">
                                    <span className="w-full text-3xl ps-24 space-x-5 uppercase">
                                        <span>Aways</span> <span className="bg-white h-6 w-36 inline-block relative rounded-full">
                                            <p className=" inline-block pb-5 absolute -top-5 text-4xl font-bold">unique</p>
                                        </span>
                                    </span>
                                    <span className="w-full uppercase text-3xl">
                                        <div className="flex justify-center ">
                                            <div className="flex items-center gap-x-16">
                                                <div className="h-16">
                                                    <img src="https://pluspng.com/img-png/shoes-png-nike-shoes-transparent-background-800.png" className="h-full object-cover" alt="" />
                                                </div>
                                                <div className="space-x-3">
                                                    <span>with the</span>
                                                    <span className="bg-white h-6 w-24 inline-block relative rounded-full text-start">
                                                        <p className=" inline-block pb-5 absolute -top-5 text-4xl font-bold text-center w-24">best</p>
                                                    </span>
                                                    <span>materials</span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-3/5">
                            <div className="w-full flex">
                                <div className="flex w-full flex-col gap-y-3 pt-3">
                                    <div className="flex justify-between items-center px-5">
                                        <span className="uppercase text-3xl font-bold">
                                            Best Seller
                                        </span>
                                        <button className="btn btn-neutral text-lg rounded-full">View more</button>
                                    </div>
                                    <div className="flex gap-4 h-full">
                                        {
                                            [...Array(3)].map((_, index) =>
                                                <div className="w-1/3 h-full bg-base-200/65 relative rounded-3xl" key={index}>
                                                    <img src="https://th.bing.com/th/id/R.419db887db8cd173efcf6dda8300f139?rik=pLaeXW5uSNCj8Q&pid=ImgRaw&r=0" className="h-40 object-cover -rotate-[24deg] transform -scale-x-100 translate-x-1/2
                                                    " alt="" />
                                                    <div className="absolute bottom-0 right-0 p-2 rounded-br-3xl rounded-tl-3xl bg-white">
                                                        <button className="btn btn-neutral rounded-full" aria-label="cart-btn">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-[48rem] gap-5">
                    <div>
                        <span className="font-bold uppercase text-3xl ps-5">SHOP BY CATEGORY</span>
                    </div>
                    <div className="flex-1 gap-5">
                        <div className="w-full flex gap-x-4 h-1/4">
                            {
                                [...Array(6)].map((_, index) =>
                                    <div className="w-1/6 h-full rounded-3xl bg-base-200/65 relative" key={index}>
                                        <img src="https://th.bing.com/th/id/R.419db887db8cd173efcf6dda8300f139?rik=pLaeXW5uSNCj8Q&pid=ImgRaw&r=0" className="h-3/4 object-cover -rotate-[45deg] transform -scale-x-100 translate-x-1/3
                                                    " alt="" />
                                        <span className="absolute bottom-1/4 translate-y-5 left-1/2 -translate-x-1/2 text-xl font-bold">Running</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full h-3/4 flex pt-5 gap-x-5">

                            <div className="w-1/2 bg-slate-400 h-full overflow-hidden rounded-3xl relative">
                                <img src="https://img.freepik.com/premium-photo/person-wearing-black-shoes-with-word-adidas-side_361821-2703.jpg" className="h-full object-cover" alt="" />
                                <div className="absolute bottom-0 bg-white rounded-br-3xl rounded-tl-3xl right-0 p-5">
                                    <button className="btn btn-neutral text-xl rounded-full">View more</button>
                                </div>
                                <div className="absolute top-1/3 right-[25%]  text-white uppercase">
                                    <span className="relative space-x-4 font-bold">
                                        <span className="text-3xl">Looks</span>
                                        <div className="h-full inline-block relative bottom-6">
                                            <span className="text-4xl absolute inline-block bg-black text-transparent h-6 rounded-full top-1 px-1">Smooth</span>
                                            <span className="text-4xl px-1 absolute -top-4 left-0">Smooth</span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="w-1/2 bg-slate-300 h-full overflow-hidden rounded-3xl relative">
                                <img src="https://i.pinimg.com/originals/00/d8/48/00d848dfc83c8c13cd7baa4f395e1a85.jpg" className="h-full object-cover" alt="" />
                                <div className="absolute bottom-0 bg-white rounded-br-3xl rounded-tl-3xl right-0 p-5">
                                    <button className="btn btn-neutral text-xl rounded-full">View more</button>
                                </div>
                                <div className="absolute top-1/4 left-[5%] text-white uppercase">
                                    <span className="relative space-x-4 font-bold">
                                        <span className="text-3xl">Keep It</span>
                                        <div className="h-full inline-block relative bottom-6">
                                            <span className="text-4xl absolute inline-block bg-black text-transparent h-6 rounded-full top-1 px-1">Iconnic</span>
                                            <span className="text-4xl px-1 absolute -top-4 left-0">Iconnic</span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-[48rem] gap-5">
                    <div className="w-full relative overflow-hidden rounded-3xl">
                        <div className="absolute w-1/3 h-1/3 bottom-28 text-center z-10 text-white space-y-10">
                            <div>
                                <span className="text-[5rem] italic">F50</span>
                                <p className="text-xl">Engineered for Speed</p>
                            </div>
                            <button className="btn  text-xl rounded-full">Shop now</button>
                        </div>
                        <div className="h-full relative">
                            <div className="absolute h-full w-[30rem] left-1/2 -translate-x-1/2">
                                <video src="https://brand.assets.adidas.com/video/upload/f_auto:video,q_auto/if_w_gt_400,w_400/football_fw24_f50_launch_hp_teaser_carousel_animated_d_a21571d8ad.mp4" autoPlay={true} muted loop className="h-full object-cover"></video>
                            </div>

                            <img src="https://brand.assets.adidas.com/video/upload/f_auto,q_auto/if_w_gt_1920,w_1920/football_fw24_f50_launch_hp_banner_hero_animated_d_558784013e.jpg" className="object-cover h-full w-full" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HomePage