const CheckOutItem = ({ cart }) => {
    return (
        <div className="grid grid-cols-2 card-side rounded-none relative gap-2" >
            <figure className="col-span-1">
                <div>
                    <img src={cart.image_url} className="h-full object-cover" alt="Movie" />
                </div>
            </figure>
            <div className="card-body p-0 col-span-1">
                <h2 className="text-lg font-normal">{cart.name}</h2>
                <p className="text-md">{cart.price.toLocaleString()} đ</p>
                <p className="text-md">Quantity: {cart.quantity}</p>
            </div>
        </div>
    )
}

export default CheckOutItem