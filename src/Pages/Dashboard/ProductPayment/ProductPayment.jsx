import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const ProductPayment = () => {

    const [paymentData,setPaymentData]=useState({})
    const {id}=useParams()
console.log(paymentData);

    useEffect(() => {
        if (id) {
          fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/selectedProduct/${id}`)
            .then(res => res.json())
            .then(data => {
              setPaymentData(data);
            
            })
            .catch(error => {

             
            });
        }
      }, []);
   

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentData={paymentData}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default ProductPayment;