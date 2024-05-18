import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function Pay({tite, description, amount, email, phone, name}){
    const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC,
        tx_ref: Date.now(),
        amount: amount,
        currency: 'KES',
        payment_options: 'card,mpesa',
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: tite,
            description: description,
            logo: '/transparent-logo.svg',
        },
    };
    const handleFlutterPayment = useFlutterwave(config);

    return(
        <div>
            <button
                className='font-semibold leading-6 text-white bg-secondary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-xl'
                onClick={e => {
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                            closePaymentModal() // this will close the modal programmatically
                        },
                        onClose: () => {
                            alert('Payment closed');
                        },
                    });
                }}
            >
                Pay
            </button>
        </div>
    )
}