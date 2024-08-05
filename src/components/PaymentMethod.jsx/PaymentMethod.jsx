import { useState } from "react"
import { cod_logo, paypay_logo, vnpay_logo } from "../../assets"

const paymentMethods = [
    {
        logo: paypay_logo,
        value: "PayPal"
    },
    {
        logo: vnpay_logo,
        value: "VNPay"
    },
    {
        logo: cod_logo,
        value: "COD"
    }
]


const PaymentMethod = ({ props }) => {
    let { paymentMethod } = props
    const [state, setState] = useState(paymentMethod.current);

    const handleOnChange = (value) => {
        paymentMethod.current = value
        setState(value)
    }

    return (
        <div className="flex gap-5 pb-5">
            {
                paymentMethods.map(paymentMethod =>
                    <div className={`w-24 border-2 rounded-lg overflow-hidden flex items-center cursor-pointer ${paymentMethod.value === state ? 'border-black' : ''}`} onClick={() => { handleOnChange(paymentMethod.value) }}>
                        <img src={paymentMethod.logo} alt="" />
                    </div>
                )
            }
        </div>
    )
}

export default PaymentMethod