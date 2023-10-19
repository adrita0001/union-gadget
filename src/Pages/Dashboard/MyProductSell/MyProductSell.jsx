import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyProductSell = () => {
const [productSell,setProductSell]=useState()
const {user}=useContext(AuthContext)
    useEffect(()=>{
        fetch("https://fanal-project-server-muntasirmamuon.vercel.app/addProduct")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
          const myProductshs=data.filter((pd)=>pd?.email=== user?.email)
          console.log(myProductshs);
          setProductSell(myProductshs);
        })
      },[])
    return (
        <div>
            <div className="overflow-x-auto bg-[#a849b8] p-5 rounded-md text-white">
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
        <th>Product Price</th>
        <th>Product Sell</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        productSell?.map((dt,index)=>(<>
        <tr>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={dt.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {dt.productName}
        </td>
        <td>${dt.price}</td>
        <th>
         {dt.productSell}
        </th>
      </tr>
        </>))
      }
   
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default MyProductSell;