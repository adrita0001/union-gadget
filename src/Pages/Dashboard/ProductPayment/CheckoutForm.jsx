import React, { useContext } from 'react';
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
const CheckoutForm = ({paymentData}) => {
console.log(paymentData);

const{user}=useContext(AuthContext)
console.log(user.displayName
    );
   const stripe=useStripe();
   const elements=useElements();
   const price = parseFloat(paymentData?.price).toFixed(2);
   const sellerEmail = paymentData?.email;



   const [axiosSecure] = useAxiosSecure();
   const [cardError, setCardError] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const [processing, setProcessing] = useState(false);
   const [transactionId, setTransactionId] = useState("");


   useEffect(() => {
    if (price > 0) {
  
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);





   const handleSubmit= async (e)=>{
    e.preventDefault();

    if(!stripe||!elements){
        return
    }



    const card=elements.getElement(CardElement);
    if(card=== null){
        return
    }

    const {error,paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card
    })


    if(error){
        console.log("error",error);
        setCardError(error.message)
    }else{
        setCardError("")
        console.log("paymentMethod",paymentMethod);
    }

 setProcessing(true)
 const{paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
        card:card,
        billing_details: {
            email: sellerEmail || "unknown",
            name: user?.displayName || "anonymous",
          },
    },
 });
 if(confirmError){

 }

 setProcessing(false)


 if(paymentIntent.status === "succeeded"){
    setTransactionId(paymentIntent.id);
    const payment = {
        payment: { ...paymentData },
        email: sellerEmail,
        transactionId: paymentIntent.id,
        category:paymentData.productCategory,
        price:parseInt(price),
        date: new Date(),
        menuItems:paymentData.productID,
        status: "successfully",
        itemName:paymentData.productName
       
      };
      axiosSecure.post("/payments",payment)
      .then((res)=>{

      })
 }

   }






    return (
        <div>
              <form className="w-8/12 mx-auto m-8" onSubmit={handleSubmit}>
        <CardElement />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
        </div>
    );
};

export default CheckoutForm;