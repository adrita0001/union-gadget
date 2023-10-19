import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUserShield,FaHandPaper } from "react-icons/fa";
import {FcCancel} from "react-icons/fc";
const ManageProduct = () => {


    const [allProducts,setAllProducts]=useState([])

    useEffect(()=>{
        fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct`)
        .then(res=>res.json())
        .then(data=>setAllProducts(data))
       },[allProducts])
      const [axiosSecure] = useAxiosSecure();


      const  handleFeedback= (Product) => {
    
        Swal.fire({
          title: "Send Feedback",
          icon: "info",
          html: '<input type="text" id="feedbackInput" placeholder="Enter your feedback" class="input bg-emerald-300 w-full max-w-xs border-error">',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Send",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            const feedback = document.getElementById("feedbackInput").value;
            console.log(feedback)
      
           
      
            fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/ProductFeedback/${Product}`,{
              method:'PUT',
              headers:{
                  'content-type': 'application/json'
              },
              body:JSON.stringify({feedback})
            })
            .then(res=>res.json())
            .then(data=>{
             console.log(data);
              if(data.modifiedCount > 0){
                  //  update state 
                 const remaining=allProducts.filter(classes => classes._id !== id)
                 const updated=allProducts.find(classes=> classes._id === id);
                 updated.status='denied'
                 const newClasses=[updated,...remaining];
                 setAllProducts(newClasses)
              }
            })
          }
        });
      
      };
      







  // ==================================================
//  Seller Add Product Select get db Section Part start
// ============================================================

const handleStatus=id=>{
    fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct/${id}`,{
      method:'PATCH',
      headers:{
          'content-type': 'application/json'
      },
      body:JSON.stringify({status:"approved"})
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data.modifiedCount);
       toast.success("Approved Successfully")
      if(data.modifiedCount > 0){
          //  update state 
         const remaining=allProducts.filter(classes => classes._id !== id)
         const updated=allProducts.find(classes=> classes._id === id);
         updated.status='approved'
         const newClasses=[updated,...remaining];
         setAllProducts(newClasses)
         toast.success("Approved Successfully")
      }
    })
    }

// ==================================================
//  Seller Add Product Select get db Section Part end
// ============================================================

// Denied function start 
const handleStatusDenied=id=>{
    fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct/${id}`,{
        method:'PATCH',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({status:"denied"})
      })
      .then(res=>res.json())
      .then(data=>{

        if(modifiedCount > 0){
            //  update state 
           const remaining=allProducts.filter(classes => classes._id !== id)
           const updated=allProducts.find(classes=> classes._id === id);
           updated.status='denied'
           const newClasses=[updated,...remaining];
           setAllProducts(newClasses)
        }
      })
}
    return (
        <div>
          <h1 className='font-bold text-4xl mb-4 text-[#00d4ff]'>All Product </h1>
             <div>

<div>
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
  
        </div>
      <div className="overflow-x-auto  rounded-md p-5 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status&Approved Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((classList, index) => (
              <tr key={index}>
                <th>{`${index + 1}`}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={classList.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{classList.productName}</td>
                <td>{classList.AvailableQuantity}</td>
                <td>${`${classList.price}`}</td>
                <th>
                 {classList.status ==='approved'?  <FaHandPaper className='text-2xl ' /> :<button onClick={()=>handleStatus(classList._id)} className="btn btn-ghost bg-[#FFAEBC] btn-xs">
                     {classList.status}
                  </button>}
                </th>
                <th>
               
                 {classList.status ==='denied'? ("denied") :(<button onClick={()=>handleStatusDenied(classList._id)}>
                      <FcCancel className='text-2xl ' />
                  
                  </button>)}
                </th>
                <th>
                 <button  htmlFor="my_modal_6" onClick={()=>handleFeedback(classList._id)} className="btn btn-ghost bg-[#0077b6] btn-xs">
                    feedback 
                  </button>

                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    );
};

export default ManageProduct;

