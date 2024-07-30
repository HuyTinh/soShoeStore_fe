import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import ColourApi from '../api/services/colourApi';
import { IoCloseOutline } from 'react-icons/io5';
import SizeApi from '../api/services/sizeApi';
import ShoeImageGallery from './ShoeImageGallery';
import { AnimatePresence, motion } from 'framer-motion';
import ShoeManageForm from './ShoeManageForm/ShoeManageForm';
import ShoeSalesLineChart from './ShoeSalesLineChart';

const tabs = [
    {
        label: "Shoe Details", icon: "👟",
        tab: (props) => <ShoeManageForm props={props} />
    },
    { label: "Sales", icon: "💰", tab: (props) => <ShoeSalesLineChart props={props} /> },
]

const ShoeManageModalTab = ({ props }) => {
    const { selectedId, setSelectedId } = props
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className='space-y-2 transition-all relative p-5'>
            <div className='flex justify-between items-center'>
                <nav>
                    <ul className='flex gap-x-5'>
                        {tabs.map((item) => (
                            <motion.li
                                key={item.label}
                                className={`text-xl p-2 relative ${item === selectedTab ? "bg-base-200 rounded-tl-md rounded-tr-md " : ""}`}
                                onClick={() => setSelectedTab(item)}
                            >
                                {`${item.icon} ${item.label}`}
                                {item === selectedTab ? (
                                    <motion.div className="absolute -bottom-1 left-0 right-0 h-1 bg-black" layoutId="underline" />
                                ) : null}
                            </motion.li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <button className='btn btn-ghost bg-base-200 ' onClick={() => setSelectedId(null)} ><IoCloseOutline size={24} /></button>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {selectedTab ? selectedTab.tab(props) : null}
                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default ShoeManageModalTab