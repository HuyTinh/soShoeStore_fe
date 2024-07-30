import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import ColourApi from '../../api/services/colourApi';
import SizeApi from '../../api/services/sizeApi';
import ShoeImageGallery from '../ShoeImageGallery';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import './ShoeManageForm.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createShoe, getShoeById, updateShoe } from '../../redux/slice/shoes.slice';
import { MdErrorOutline } from 'react-icons/md';


async function fetchData(setColours, setSizes) {
    await ColourApi.getColours().then(res => {
        setColours(res)
    })

    await SizeApi.getSizes().then(res => {
        setSizes(res)
    })
}

const ShoeManageForm = ({ props }) => {
    let { shoeId, setSelectedId } = props
    const { shoe } = useSelector(state => state.shoes)
    const dispatch = useDispatch()
    const [colours, setColours] = useState([])
    const [sizes, setSizes] = useState([])
    const [thumbnailFile, setThumbnailFile] = useState([])
    const [formLoading, setFormLoading] = useState(false)
    const [thumbnailPreview, setThumbnailPreview] = useState(['', ''])
    const [imageDetails, setImageDetails] = useState([]);
    const [imageDetailFile, setImageDetailFile] = useState(null);
    const [previewUrlList, setPreviewUrlList] = useState([]);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        mode: "all",
        defaultValues: {
            name: "",
            price: "",
            description: "",
            image_url: "",
            image_url_back: "",
            shoe_colour: {
                vamp_id: "",
                quarter_id: "",
                sole_id: "",
            },
            size_id: []
        }
    });

    useEffect(() => {
        fetchData(setColours, setSizes);
    }, [])


    useEffect(() => {
        if (shoeId > 0) {
            const promise = dispatch(getShoeById(shoeId))
            return () => {
                promise.abort()
            }
        }
    }, [dispatch])

    useEffect(() => {
        if (shoeId > 0) {
            reset(
                {
                    name: shoe.name,
                    price: shoe.price,
                    description: shoe.description,
                    image_url: shoe.image_url,
                    image_url_back: shoe.image_url_back,
                    shoe_colour: {
                        vamp_id: shoe.colour?.vamp?.id,
                        quarter_id: shoe.colour?.quarter?.id,
                        sole_id: shoe.colour?.sole?.id,
                    },
                    size_id: shoe.sizes?.map(size => size.id + '')
                }
            )
            setThumbnailPreview([shoe.image_url, shoe.image_url_back])
            setImageDetails(shoe.images)
            console.log(shoe.images);
        }
    }, [shoeId, shoe])

    useEffect(() => {
        if (!thumbnailFile) return;

        [...thumbnailFile].forEach((f, index) => {
            if (f) {
                thumbnailPreview[index] = URL.createObjectURL(f);
                setThumbnailPreview([...thumbnailPreview]);
            };

        })
        setValue('imageThumbnail', thumbnailFile[0])
        setValue('imageHoverThumbnail', thumbnailFile[1])
    }, [thumbnailFile])

    const handleChangeThumbnailFile = (e, i) => {
        e.preventDefault();
        let file = e.target.files[0];

        if (file != null) {
            thumbnailFile[i] = file;
            setThumbnailFile([...thumbnailFile]);
        }

    }

    const handleCreateShoe = (data) => {
        data.images = previewUrlList.filter(image => !!image.id)
        setFormLoading(true)
        if (shoeId > 0) {
            dispatch(updateShoe({ id: shoe.id, shoe: data, imageUrl: thumbnailFile, imageDetail: imageDetailFile, setFormLoading: setFormLoading, setSelectedId: setSelectedId }))
        } else {
            dispatch(createShoe({ shoe: data, imageUrl: thumbnailFile, imageDetail: imageDetailFile, setFormLoading: setFormLoading, setSelectedId: setSelectedId }))
        }
    }

    const handleDeleteShoe = (id) => {

    }

    if (formLoading) return <div>Loading...</div>

    return (
        <form onSubmit={handleSubmit((data) => handleCreateShoe(data))}>
            <div className='grid grid-cols-2 gap-5 h-full'>
                <div className='col-span-1 space-y-2'>
                    <div className='flex justify-center gap-x-36'>
                        <motion.div className="avatar flex-col space-y-2 items-center">
                            {errors.imageThumbnail && <span className='flex '>
                                <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                    <MdErrorOutline className='me-1' />{errors.imageThumbnail.message}
                                </span>
                            </span>}
                            <label htmlFor='imageUrl' className="mask mask-squircle w-32 h-32 cursor-pointer">
                                <img src={thumbnailPreview[0] ? thumbnailPreview[0] : "https://placehold.co/64x64@2x.png"} />
                                <input type="file" className="hidden"
                                    // {...register("imageThumbnail", {
                                    //     required: 'Thumbnail is required',
                                    // })}
                                    onChange={(e) => handleChangeThumbnailFile(e, 0)} id='imageUrl' />
                                {
                                    shoeId < 0 && <input type="text" className="hidden"
                                        {...register("imageThumbnail", {
                                            required: 'Thumbnail is required',
                                        })}
                                    />
                                }
                            </label>
                            <p className='text-center'>Thumbnaid</p>
                        </motion.div>
                        <motion.div className="avatar flex-col items-center space-y-2">
                            {errors.imageHoverThumbnail && <span className='flex '>
                                <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                    <MdErrorOutline className='me-1' />{errors.imageHoverThumbnail.message}
                                </span>
                            </span>}
                            <label htmlFor='imageUrlBack' className="mask mask-squircle w-32 h-32 cursor-pointer">
                                <img src={thumbnailPreview[1] ? thumbnailPreview[1] : "https://placehold.co/64x64@2x.png"} />
                                <input type="file" className="hidden"
                                    // {...register("imageHoverThumbnail", {
                                    //     required: 'Hover Thumbnail is required',
                                    // })}
                                    onChange={(e) => handleChangeThumbnailFile(e, 1)} id='imageUrlBack' />
                                {
                                    shoeId < 0 && <input type="text" className="hidden"
                                        {...register("imageHoverThumbnail", {
                                            required: 'Hover Thumbnail is required',
                                        })}
                                    />
                                }

                            </label>
                            <p className='text-center'>Hover Thumbnaid</p>
                        </motion.div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-2'>
                        <div className='col-span-1 space-y-2'>
                            <label className="input input-bordered flex items-center gap-2">
                                Name:
                                <input type="text" className="grow w-full" {...register("name", {
                                    required: 'Name is required',
                                })} />
                            </label>
                            {errors.name && <span className='flex '>
                                <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                    <MdErrorOutline className='me-1' />{errors.name.message}
                                </span>
                            </span>}
                        </div>
                        <div className='col-span-1 space-y-2'>
                            <label className="input input-bordered flex items-center gap-2"  >
                                Price:
                                <input type="text" className="grow w-full"  {...register("price", {
                                    required: 'Price is required',
                                    valueAsNumber: true,
                                    validate: (value) => isNaN(value) && 'Price must be a number' || value > 0 || 'Price must be greater than 0',

                                })} />
                            </label>
                            {errors.price && <span className='flex '>
                                <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                    <MdErrorOutline className='me-1' />{errors.price.message}
                                </span>
                            </span>}
                        </div>
                    </div>
                    <label className='flex flex-col gap-y-2'>
                        <div className='flex'>
                            Description:
                            {errors.description && <span className='flex px-2'>
                                <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                    <MdErrorOutline className='me-1' />{errors.description.message}
                                </span></span>}
                        </div>
                        <textarea
                            className="textarea textarea-bordered textarea-lg w-full h-52"
                            {...register("description", {
                                required: 'Description is required',
                            })}></textarea>
                    </label>
                </div>
                <div className='col-span-1 space-y-2 pb-2 h-[28rem] overflow-auto'>
                    {colours?.length > 0 &&
                        <label className='flex flex-col space-y-2'>
                            <div className='flex'>
                                Colour:
                                <div className='flex px-2 space-x-2'>
                                    {errors.shoe_colour?.vamp_id && <span className='flex '>
                                        <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                            <MdErrorOutline className='me-1' />{errors.shoe_colour.vamp_id.message}
                                        </span>
                                    </span>}
                                    {errors.shoe_colour?.quarter_id && <span className='flex '>
                                        <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                            <MdErrorOutline className='me-1' />{errors.shoe_colour.quarter_id.message}
                                        </span>
                                    </span>}
                                    {errors.shoe_colour?.sole_id && <span className='flex '>
                                        <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                            <MdErrorOutline className='me-1' />{errors.shoe_colour.sole_id.message}
                                        </span>
                                    </span>}
                                </div>
                            </div>
                            <div className='flex gap-x-2'>
                                <select className="select select-bordered select-md w-full" {...register("shoe_colour.vamp_id", {
                                    required: 'Vamp is required'
                                })}>
                                    <option value={""} disabled selected>Vamp</option>
                                    {
                                        colours.map((colour, index) =>
                                            <option key={index} value={colour.id}>{colour.name}</option>
                                        )
                                    }
                                </select>
                                <select className="select select-bordered select-md w-full" {...register("shoe_colour.quarter_id", {
                                    required: 'Quarter is required'
                                })}>
                                    <option value={""} disabled selected>Quarter</option>
                                    {
                                        colours.map((colour, index) =>
                                            <option key={index} value={colour.id}>{colour.name}</option>
                                        )
                                    }
                                </select>
                                <select className="select select-bordered select-md w-full" {...register("shoe_colour.sole_id", {
                                    required: 'Sole is required'
                                })}>
                                    <option value={""} disabled selected>Sole</option>
                                    {
                                        colours.map((colour, index) =>
                                            <option key={index} value={colour.id} >
                                                {colour.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </label>
                    }
                    {
                        sizes?.length > 0 &&
                        <div className='flex flex-col space-y-2'>
                            <div className='flex'>
                                Sizes:
                                {errors.size_id && <span className='flex px-2'>
                                    <span className='bg-red-400 text-white rounded-full flex items-center px-2'>
                                        <MdErrorOutline className='me-1' />{errors.size_id.message}
                                    </span></span>}
                            </div>

                            <div className='flex flex-wrap p-2 gap-1 border rounded-lg max-h-80 overflow-auto'>
                                {
                                    sizes.map((size, index) =>
                                        <div className='flex items-center space-x-2 w-24' key={index}>
                                            <input type="checkbox" className="checkbox checkbox-sm"
                                                value={size.id}
                                                {...register("size_id", {
                                                    required: 'Size is required',
                                                })}
                                            />
                                            <span>{size.name}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                    <div className='flex flex-col gap-2'>
                        <div>
                            Imgages Gallery:
                        </div>

                        {/* {
                                    shoe.images.map((image, index) =>
                                        <div className="avatar rounded-md overflow-auto">
                                            <div className="w-20">
                                                <img src={image} />
                                            </div>
                                        </div>
                                    )
                                } */}
                        <AnimatePresence>
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            >
                                <ShoeImageGallery props={{
                                    images: imageDetails || [],
                                    imageDetailFile: imageDetailFile,
                                    setImageDetailFile: setImageDetailFile,
                                    previewUrlList: previewUrlList
                                    , setPreviewUrlList: setPreviewUrlList
                                }} />

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <button type='submit' className='btn btn-success btn-sm' on>Save</button>
            </div>
        </form>
    )
}

export default ShoeManageForm