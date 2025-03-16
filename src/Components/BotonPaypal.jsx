import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from "react-router"




const PaypalButtonComponent = () => {
    const navigate = useNavigate()


    const initialOptions = {
        "client-id": "AfE2YsA1DwI9Rbzha1bccIWTwFZp5abKZG8YfKIhYbDYy1VHkniyNpU2CrxKjAXSf8eal7Q308vLjkBj",
        currency: "USD",
        intent: "capture",
    }





    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100",
                    },
                },
            ],
        })
    }


    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const name = details.payer.name.given_name

            console.log(name)
            console.log("")

            navigate('/exitosa')

        })
    }


    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    )





}



















export default function BotonPaypal() {
    return (
        <>


            <PaypalButtonComponent />

        </>
    )
}
