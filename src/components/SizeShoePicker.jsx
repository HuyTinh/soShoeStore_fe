import React, { useState } from 'react'

const SizeShoePicker = ({ shoe, setSize, chooseSize }) => {
    const [checked, setChecked] = useState()

    const handlerOnClick = (index) => {
        setChecked(index)
        setSize(shoe.sizes[index])
    }

    return (
        <div>
            <h2 className="font-bold text-lg">Sizes</h2>
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 py-5 gap-1">
                {
                    [...shoe.sizes]?.sort((a, b) => (parseFloat(a.name.replace(" UK", "")) - parseFloat(b.name.replace(" UK", "")))
                    )?.map((size, index) =>
                        <div className="col-span-1" key={index} onClick={() => handlerOnClick(index)}>
                            <div className={`p-2 hover:bg-black hover:text-white border cursor-pointer ${checked === index ? 'bg-black text-white' : ''}`}>
                                <p className="text-center">{size.name}</p>
                            </div>
                        </div>)
                }
            </div>
            {
                chooseSize !== ' ' && chooseSize == false && <div className='text-red-500'>Please choose size</div>
            }
        </div>
    )
}

export default SizeShoePicker