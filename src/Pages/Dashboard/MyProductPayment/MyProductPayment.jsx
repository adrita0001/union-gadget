import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyProductPayment = () => {
    const[myBuyProduct,setMyBuyProduct]=useState([])
    const{user}=useContext(AuthContext)
    useEffect(()=>{
        fetch('https://fanal-project-server-muntasirmamuon.vercel.app/payments')
        .then(res=>res.json())
        .then(data=>{

         const myProductshs=data.filter((pd)=>pd?.payment?.userEmail=== user?.email)
          setMyBuyProduct(myProductshs);
            // setPaymentHistory(product);
           
          
        })
    },[])
    return (
        <div>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
           No
          </label>
        </th>
        <th>Product Image</th>
        <th>Product Name</th>
        <th>Buy Date</th>
        <th>Product Price</th>
        <th>My TransactionId</th>
        <th>Product Seller</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
     myBuyProduct.map((dt,index)=>(<>
     
     <tr>
        <th>
          <label>
           {index}
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={dt?.payment?.image} />
              </div>
            </div>
            
          </div>
        </td>
        <td>
         {dt?.payment?.productName}
        </td>
        <td>{dt?.date}</td>
        <td>${dt?.payment?.price} 
        </td>
        <td>{dt?.transactionId} 
        </td>
        <td>{dt?.email} 
        </td>
      </tr>
     </>))
     }

     
    </tbody>
    
    
  </table>
</div> 
        </div>
    );
};

export default MyProductPayment;