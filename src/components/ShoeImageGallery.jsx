import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { CiZoomIn } from 'react-icons/ci';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { motion } from 'framer-motion';
import { set } from 'react-hook-form';

const ShoeImageGallery = ({ props }) => {
    let { images, imageDetailFile, setImageDetailFile, previewUrlList, setPreviewUrlList } = props;

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#imgGallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
            padding: { top: 20, bottom: 40, left: 100, right: 100 },
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };


    }, []);


    useEffect(() => {
        setPreviewUrlList(images);
    }, [images])

    useLayoutEffect(() => {
        if (!imageDetailFile) {
            return;
        }

        [...imageDetailFile].forEach((f) => {
            setPreviewUrlList((prev) => [...prev, { image_url: URL.createObjectURL(f) }]);
        })
    }, [imageDetailFile]);

    const handleRemoveImage = (index) => {
        setPreviewUrlList((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <motion.div className="pswp-gallery flex flex-wrap gap-1" id="imgGallery">
            <div className="flex items-center justify-center w-20 h-20">
                <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                    </div>
                    <input id="dropzone-file" multiple type="file" className="hidden" onChange={e => setImageDetailFile(e.target.files)} />
                </label>
            </div>
            {previewUrlList?.map((image, index) => (
                <div className="avatar rounded-md overflow-auto relative w-20 group" key={index}>
                    <span className='absolute transition-all w-full h-full flex justify-center items-center bg-black/20 opacity-0 group-hover:opacity-100 gap-2'>
                        <span className='hover:bg-gray-600 rounded-md p-1 font-bold text-white cursor-pointer' onClick={() => handleRemoveImage(index)}>
                            <IoIosRemoveCircleOutline size={24} />
                        </span>
                        <a
                            href={image.image_url}
                            data-pswp-width={1500}
                            data-pswp-height={1500}
                            key={"imgGallery" + '-' + index}
                            target="_blank"
                            rel="noreferrer" className='hover:bg-gray-600 rounded-md p-1 font-bold text-white'>
                            <CiZoomIn size={24} />
                        </a>
                    </span>
                    <img src={image.image_url} />
                </div>
            ))}


        </motion.div>
    )
}

export default ShoeImageGallery