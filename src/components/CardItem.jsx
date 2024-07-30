import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ shoe }) => {
    const { id, name, price, image_url, image_url_back, shoe_different_colour } = shoe;

    return (
        <Link to={`/shoes/${id}`} onClick={() =>
            window.scrollTo(0, 0)} className="overflow-auto hover:scale-105 transition flex">
            <div className="card card-compact border group cursor-pointer group">
                <figure className="relative">
                    <img src={image_url} className="w-full group-hover:hidden" alt="Shoes" />
                    <img src={image_url_back} className="w-full group-hover:block hidden" alt="Shoes" />
                    <span className="absolute bottom-0 left-2 bg-white px-1 transition ease-in-out group-hover:-translate-y-2">{price.toLocaleString()} VNĐ</span>
                </figure>
                <div className="card-body flex flex-col justify-between">
                    <h2 className="font-semibold">{name}</h2>
                    <span className="text-gray-500">{shoe_different_colour.length} Colours</span>
                </div>
            </div>
        </Link>
    )
}

export default React.memo(CardItem)