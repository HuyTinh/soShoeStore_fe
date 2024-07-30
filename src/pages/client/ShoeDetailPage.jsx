import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BiRuler } from "react-icons/bi";
import CarouselItem from "../../components/CarouselItem";
import { addToCart, selectCartInfor } from "../../redux/slice/carts.slice";
import { getShoeById } from "../../redux/slice/shoes.slice";
import ImageZoom from "react-image-zooom";
import { ColourShoePicker } from "../../components/ColourShoePicker";
import SizeShoePicker from "../../components/SizeShoePicker";
import { motion } from "framer-motion";


const ShoeDetailPage = () => {
    const [check, setCheck] = useState(false);
    const [size, setSize] = useState()
    const { id } = useParams();
    const dispatch = useDispatch();
    const [chooseSize, setChooseSize] = useState(' ');

    const { shoe, isLoading } = useSelector((state) => state.shoes);
    const { totalPrice, totalQuantity } = useSelector(state => selectCartInfor(state));
    const { name, description, price, images } = shoe;
    const { user } = useSelector(state => state.users)


    useEffect(() => {
        const promise = dispatch(getShoeById(id))
        return () => {
            promise.abort()
        }
    }, [dispatch, id])

    const handleAddToCart = () => {
        if (!user?.role) {
            document.getElementById('auth_modal').showModal();
        } else {
            if (!size) {
                setChooseSize(false)
            } else {
                dispatch(addToCart(
                    {
                        cartId: user.id
                        , cart:
                        {
                            shoe_id: shoe.id,
                            name: shoe.name,
                            price: shoe.price,
                            image_url: shoe.image_url,
                            quantity: 1, size:
                                size
                        }
                    }));
                document.getElementById('add_cart_modal').showModal();
                setChooseSize(true)
            }
        }
    }



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            className="grid lg:grid-cols-3 grid-cols-2 ">

            <div className="col-span-2 grid grid-cols-2 border-r">
                <div className="col-span-2 grid grid-cols-2 gap-0.5 relative pb-2">
                    <div className="text-sm breadcrumbs lg:absolute  max-lg:p-5 col-span-2 *:text-xl left-10 top-5 space-y-5 z-10">
                        <ul className="*:underline">
                            <li ><Link className="hover:bg-black hover:text-white px-1" to={'/'}>Home</Link></li>
                            <li><Link className="hover:bg-black hover:text-white px-1" to={'/shoes'}>Shoes</Link></li>
                        </ul>
                        <div className="col-span-2 lg:hidden">
                            <h2 className="font-bold text-4xl">{name?.toUpperCase()}</h2>
                            <p className="pt-5 font-bold text-xl">{price?.toLocaleString()} đ</p>
                        </div>
                    </div>

                    <div className="max-lg:hidden absolute bottom-0 z-10 w-full" >
                        <div >
                            <button className="btn  mx-auto bg-white flex items-center text-lg" onClick={() => setCheck(!check)} >

                                {check ? <>Show less  <RiArrowDropUpLine size={32} /></>
                                    : <>Show more
                                        <RiArrowDropDownLine size={32} /></>}
                            </button>
                        </div>

                    </div>
                    {/* Carousel */}
                    <div className="col-span-2 lg:hidden">
                        <CarouselItem images={images} className={"lg:hidden"}></CarouselItem></div>
                    {/* <div className="bg-red-400 col-span-2">a</div> */}
                    <div className="max-lg:hidden col-span-2 grid grid-cols-2 gap-0.5"> {
                        images?.slice(0, 4).map((img, index) =>
                            <div className="col-span-1" key={index}>
                                <div className="flex justify-center">
                                    <ImageZoom src={img.image_url} />
                                </div>
                            </div>)
                    }
                        <div className="collapse rounded-none col-span-2 pb-2">
                            <input type="checkbox" name="my-accordion-1" className="col-span-2 " hidden checked={check} readOnly />
                            <div className="collapse-content !p-0">
                                <div className="grid grid-cols-2 gap-0.5">
                                    {
                                        images?.slice(4).map((img, index) =>
                                            <div className="col-span-1" key={index}>
                                                <div className="flex justify-center">
                                                    <ImageZoom src={img.image_url} />
                                                </div>
                                            </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 lg:py-10 lg:px-16 py-20">
                    <div className="divider"></div>
                    <div className="collapse">
                        <input type="checkbox" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-bold">
                            Review (0)
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="collapse">
                        <input type="checkbox" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-bold">
                            Description
                        </div>
                        <div className="collapse-content">
                            <div className="grid grid-cols-2">
                                <div className="lg:col-span-1 col-span-2  flex items-center">
                                    <div>
                                        <h1 className="font-extrabold text-4xl mb-5">{name}</h1>
                                        <p className="text-xl text-justify">{description}</p>
                                    </div>
                                </div>
                                <div className="col-span-1 lg:flex items-center hidden">
                                    <div className="p-5">
                                        {images?.length > 0 && <img src={images[4].image_url} className="rounded-lg " />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="collapse">
                        <input type="checkbox" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-bold">
                            Details
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="col-span-2 px-5 pb-20 space-y-20">
                    <div>
                        <h2 className="font-bold uppercase text-4xl mb-10">Completed your style</h2>
                        <div className="flex overflow-auto gap-x-5 py-2">
                            {

                                ["https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"].map((img, index) =>
                                        <div className="carousel-item" key={index}>
                                            <img src={img} className="rounded-box" />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold uppercase text-4xl mb-10">Some Shoe You May Like</h2>
                        <div className="flex overflow-auto gap-x-5 py-2">
                            {

                                ["https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"].map((img, index) =>
                                        <div className="carousel-item" key={index}>
                                            <img src={img} className="rounded-box" />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold uppercase text-4xl mb-10">Some Shoe Other People Like</h2>
                        <div className="flex overflow-auto gap-x-5 py-2">
                            {

                                ["https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
                                    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"].map((img, index) =>
                                        <div className="carousel-item" key={index}>
                                            <img src={img} className="rounded-box" />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 hidden lg:block p-10">
                <div className="w-full">
                    <h2 className="font-bold text-4xl">{name?.toUpperCase()}</h2>
                    <p className="pt-5 font-bold text-2xl">{price?.toLocaleString()} đ</p>
                </div>
                <div className="sticky top-0">
                    <div className="divider mb-0"></div>
                    <div>
                        <h2 className="font-bold text-lg py-5">Colours</h2>
                        {shoe.shoe_different_colour?.length > 0 &&
                            <ColourShoePicker shoe={shoe} />}
                    </div>
                    <div className="divider before:bg-transparent my-0.5 after:bg-transparent"></div>
                    {shoe.sizes?.length > 0 &&
                        <SizeShoePicker shoe={shoe} setSize={setSize} chooseSize={chooseSize} />}
                    <p onClick={() => document.getElementById('size_guide').showModal()} className="underline cursor-pointer text-lg hover:text-white hover:bg-black inline px-1"><BiRuler className="inline me-2" size={24} />Size guide</p>
                    <dialog id="size_guide" className="modal">
                        <div className="modal-box max-w-4xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-4xl">MEN'S AND WOMEN'S ADIDAS FOOTWEAR SIZING</h3>
                            <p className="py-4 mt-5 italic font-bold text-3xl">FOOTWEAR SIZING</p>
                            <div className="overflow-x-auto">
                                <table className="table table-xs table-pin-rows table-pin-cols">
                                    <thead>
                                        <tr className="*:text-lg *:px-8 *:text-center *:bg-black *:text-white h-16">
                                            <th>Heel-toe (INCH)</th>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                            <td>8.7"</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ["EU", "UK", "US - Men", "US - Women", "Heel-toe (cm)"].map((num, index) =>
                                                <tr className="*:text-lg *:px-10 h-16" key={index}>
                                                    <th className="col">{num}</th>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                    <td>3.5</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <p className="pt-2">Scroll horizontally to see more.</p>
                            <div className="py-5">
                                <h2 className="font-bold text-3xl italic mb-3">IN BETWEEN SIZES?</h2>
                                <p className="text-lg">
                                    For tight fit, go one size down.
                                    <br />
                                    For a loose fit, go one size up.</p>
                            </div>
                            <div className="py-5">
                                <h2 className="font-bold text-3xl italic mb-3">HOW TO MEASURE</h2>
                                <p className="text-lg">
                                    Follow these easy steps to get the right size. For the best fit, measure your feet at the end of the day.</p>
                                <div className="grid grid-cols-2 p-5 bg-gray-200">
                                    <div className="col-span-1">
                                        <img src="https://brand.assets.adidas.com/image/upload/Footwear_Image_tcm221_745073_bddbc1a61f.png" alt="" />
                                    </div>
                                    <div className="col-span-1">
                                        <p><span className="font-bold">1. Length:</span> Measure the distance from the big toe's tip to the heel's outermost part.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-5">
                                <h2 className="font-bold text-3xl italic mb-3">NOT THE RIGHT SIZE OR COLOR?</h2>
                                <p className="text-lg">
                                    No problem, we offer free size exchanges and we have a free return service.</p>
                            </div>
                        </div>
                    </dialog>
                    <div className="mt-10">
                        <button className="btn w-full font-bold text-xl" onClick={handleAddToCart}>Add to cart</button>
                        <dialog id="add_cart_modal" className="modal">
                            <div className="modal-box max-w-6xl">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-4xl">SUCCESSFULLY ADDED TO BAG!</h3>
                                <div className="flex pt-5">
                                    <div className="col-span-1 grid w-2/3">
                                        <div className="card rounded-none card-side">
                                            <figure>
                                                <img src={shoe.image_url} alt="Album" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{shoe.name}</h2>
                                                <p>{shoe.price?.toLocaleString()} đ</p>
                                                <p>Quantity: 1</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider divider-horizontal before:bg-black after:bg-black"></div>
                                    <div className="col-span-1 grid flex-grow space-y-5"><div className="card lg:card-side bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <p className="font-bold">Your Bag</p>
                                            <p>{totalQuantity} Items</p>
                                            <div className="flex text-justify"><p>Total Product Cost: </p><span>{totalPrice.toLocaleString()} đ</span></div>
                                            <div className="flex text-justify"><p>Total Delivery Cost:</p><span>Free</span></div>
                                            <div className="divider before:bg-black after:bg-black"></div>
                                            <div className="flex text-justify"><p>Total:</p> <span>{totalPrice.toLocaleString()} đ</span></div>
                                        </div>
                                    </div>
                                        <div className="card lg:card-side">
                                            <Link to="/cart" className="btn w-full">
                                                <button className="btn uppercase w-full">View cart</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default ShoeDetailPage