'use client'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function Page(){
    let amount = 10;
    const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC,
        tx_ref: Date.now(),
        amount: amount,
        currency: 'KES',
        payment_options: 'card,mpesa',
        customer: {
            email: 'onyambusamson@gmail.com',
            phone_number: '0799054011',
            name: 'Samson Mong\`are',
        },
        customizations: {
            title: 'EIK test payment',
            description: 'Registration fee',
            logo: '/transparent-logo.svg',
        },
    };
    const handleFlutterPayment = useFlutterwave(config);
    
    return(
        <div>
            <h1>Flutter wave test payment</h1>
            <p>You will pay {amount}</p>
            <button
                className='bg-primary py-2 px-4 text-white rounded-lg font-semibold ml-2 my-4 w-24'
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