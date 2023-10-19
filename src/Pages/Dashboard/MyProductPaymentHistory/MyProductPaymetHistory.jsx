import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyProductPaymetHistory = () => {
const {user}=useContext(AuthContext)
console.log(user.email);
const [paymentHistory,setPaymentHistory]=useState([])

useEffect(()=>{
  fetch("https://fanal-project-server-muntasirmamuon.vercel.app/payments")
  .then(res=>res.json())
  .then(data=>{
    const myProductshs=data.filter((pd)=>pd?.payment?.userEmail=== user?.email)
    setPaymentHistory(myProductshs);
  })
},[])
console.log(paymentHistory);
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th>No</th> 
        <th>Product Image</th> 
        <th>Product Name</th> 
        <th>Price</th> 
        <th>Date</th> 
        <th>status</th> 
        <th>TransactionId</th> 
        <th>Seller Email</th>
      </tr>
    </thead> 
    <tbody>
     {
        paymentHistory.map((hs,index)=>(<>
         <tr>
        <th>{index}</th> 
        <th> <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={hs?.payment?.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div></th> 
        <td>{hs?.payment?.productName}</td> 
        <td>${hs?.payment?.price}</td> 
        <td>{hs.date}</td> 
        <td>{hs.status}</td> 
        <td>{hs.transactionId}</td> 
        <td>{hs.email}</td>
      </tr>
        
        </>))
     }
     
    </tbody> 
   
  </table>
</div>
        </div>
    );
};

export default MyProductPaymetHistory;