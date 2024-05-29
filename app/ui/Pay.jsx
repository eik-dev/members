import { useEffect, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Processing from '@/app/ui/Processing';
import PaymentInfo from '@/app/ui/PaymentInfo'
import Overlay from '@/app/ui/overlay';
import { popupE } from '@/app/lib/trigger';
import { postData, getData } from '@/app/lib/data';

export function FlutterWave({tite, description, amount, email, phone, name}){
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

export default function Pay({title, description, amount, email, phone, name}){
    let [paymentMethod, setPaymentMethod] = useState('mpesa');
    let [overlay, setOverlay] = useState('')
    let [callback, setCallback] = useState(null)

    useEffect(()=>{
        if (callback){
            let interval = setTimeout(()=>{
                if (callback.ResponseCode){
                    console.log('\nQWERTY!!\n')
                    if (callback.ResultCode=='0'){}
                    clearInterval(interval)
                } else {
                    getData(setCallback,'/mpesa/callback',{CheckoutRequestID: callback.requestId})
                }
            }, 5000)
        }
    },[callback])

    let stk = (e,phone,email)=>{
        e.preventDefault();
        popupE('ok', 'Processing', 'Please wait...')
        postData((response)=>{
            if(response.ResponseCode=="0"){
                popupE('ok', 'Success', 'PIN prompt sent to your phone. Please enter to complete payment.')
                getData(setCallback,'/mpesa/callback',{CheckoutRequestID: response.CheckoutRequestID})
            } else popupE('error', 'Error', response.ResponseDescription)
        },{phone, amount, email,AccountReference:title},'/pay/mpesa')
    }

    return (
        <div className='mx-2'>
            <div className='flex gap-6 mb-6'>
                <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('mpesa')}>
                    <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='mpesa'?'bg-primary':'border-2'}`}></div>
                    <img className='w-8' src="/icons/mpesa.svg" alt="" />
                    Mpesa
                </button>
                <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('airtel')}>
                    <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='airtel'?'bg-primary':'border-2'}`}></div>
                    <img className='w-8 mx-2 block' src="/icons/airtel.svg" alt="" />
                    Airtel
                </button>
                <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('visa')}>
                    <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='visa'?'bg-primary':'border-2'}`}></div>
                    <img className='w-10 mx-2 block' src="/icons/visa.svg" alt="" />
                    Card
                </button>
            </div>
            {
                paymentMethod!='visa'?
                <div className='flex gap-2 mb-2'>
                    <div>Phone number: </div>
                    <div>{phone}</div>
                </div>
                :
                <div className='flex gap-2 mb-2'>
                    <div>Name: </div>
                    <div>{`${name}`}</div>
                </div>
            }
            <div className='flex gap-2 mb-2'>
                <div>Amount due: </div>
                <div>{amount} Ksh</div>
            </div>
            <div className='flex gap-2'>
                <div>Receipt to: </div>
                <div>{email}</div>
            </div>

            <div className='flex mt-4 gap-5'>
                <button className='py-2 px-6 border-2 bg-gray-200 hover:scale-105' onClick={e=>setOverlay('payment')}>Edit</button>
                {
                    paymentMethod=='mpesa'?
                    <button onClick={e=>stk(e,phone,email)} className='font-semibold leading-6 text-white bg-secondary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-xl hover:scale-105'>Pay</button>
                    :
                    <FlutterWave title={title} description={description} amount={amount} email={email} phone={phone} name={name} />
                }
            </div>
            <Overlay className={`${overlay!=''?'block':'hidden'}`} >
                {overlay === 'payment' && <PaymentInfo control={setOverlay} amount={amount} trigger={stk}/>}
                {overlay === 'processing' && <Processing control={setOverlay}/>}
            </Overlay>
        </div>
    )
}