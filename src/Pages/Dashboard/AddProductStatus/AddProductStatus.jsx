import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProductStatus = () => {

    const [products,setProducts]=useState([])
    const {user}=useContext(AuthContext)
    useEffect(()=>{
        fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct`)
        .then(res=>res.json())
        .then(data=>{

            const myProducts=data.filter((pd)=>pd?.email=== user?.email)
          
            setProducts(myProducts)
        })
       },[])




       const handleDelete=(id)=>{


   
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result)=>{
        if (result.isConfirmed){
      
          fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProducts/${id}`,{
            method:'DELETE'
           })
           .then(res=>res.json())
           .then(data=>{
            if (data.deletedCount > 0) {
              refetch()
              Swal.fire(
                  'Deleted!',
                  'Your User has been deleted.',
                  'success'
              )
          }
           })
        }
      })
       
      
      
      
      
      }
console.log(products);

    return (
        <div className='bg-[#a849b8] rounded-md p-5 text-white'>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          No
        </th>
        <th>Product Image</th>
        <th>Product Name </th>
        <th>Price </th>
        <th>Product Status</th>
        <th>Product Update</th>
        <th>Product Delete</th>
        <th>Product Feedback</th>
      </tr>
    </thead>
    <tbody>
    
      {
        products?.map((dt,index)=>(<>
        
        <tr>
        <th>
          <label>
           {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={dt.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          
          </div>
        </td>
        <td>
        {dt.productName}
        </td>
        <td>
        ${dt.price}
        </td>
        <td>{dt.status}</td>
        <td><Link to={`/dashboard/updateProduct/${dt._id}`}>Update</Link></td>
        <th>
         <button onClick={()=>handleDelete(dt._id)}>Delete</button>
        </th>
        <th>
         {dt.feedback}
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

export default AddProductStatus;