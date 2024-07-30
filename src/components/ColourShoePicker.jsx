import React, { useEffect, useState } from 'react'
import { get } from 'react-hook-form';
import { Link } from 'react-router-dom'

function getColor(shoe) {
    return shoe.colour.vamp.name + ' / '
        + shoe.colour.quarter.name + ' / '
        + shoe.colour.sole.name
}

export const ColourShoePicker = ({ shoe }) => {

    const [color, setColor] = useState('');

    const handleOnEnterImage = (color) => {
        setColor(color);
    }

    const handleOnLeaveImage = () => {
        setColor(getColor(shoe));
    }

    useEffect(() => {
        setColor(getColor(shoe));
    }, [shoe])

    return (
        <div className="grid grid-cols-5 gap-y-5">
            <div className="grid grid-cols-5 col-span-5 gap-1">
                {
                    shoe.shoe_different_colour?.map((s, index) =>
                        <div className={'col-span-1'} key={index} onMouseOut={() => handleOnLeaveImage()}>
                            <div className={`rounded border-b-4 hover:border-black border-transparent cursor-pointer bg-base-200 ${s.id === shoe.id ? ' !border-black' : ''}`}>
                                <Link to={`/shoes/${s.id}`} onClick={() =>
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                                }>
                                    <img onMouseEnter={() => handleOnEnterImage(s.colour)} src={s.image_url} alt="" />
                                </Link>
                            </div>
                        </div>)
                }
            </div>
            <div className="col-span-5">{color}</div>
        </div>
    )
}
