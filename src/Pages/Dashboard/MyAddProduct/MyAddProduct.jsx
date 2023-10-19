import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAddProduct from '../../../hooks/useAddProduct';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyAddProduct = () => {
   const[myProduct,isProductLoading,refetch]=useAddProduct()
    const [axiosSecure] = useAxiosSecure();


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
  
        fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/selectedProduct/${id}`,{
          method:'DELETE'
         })
         .then(res=>res.json())
         .then(data=>{
          if (data.deletedCount > 0) {
            refetch()
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        }
         })
      }
    })
     




    }


    return (
        <div>
        <div className="overflow-x-auto">
       
<table className="table">
{/* totalEnrolledStudent > 0 ? totalEnrolledStudent : */}
{/* head */}
<thead>
  <tr>
    <th>
     #
    </th>
    <th>Product Image</th>
    <th>Product Name</th>
    <th>Previous Price</th>
    <th>Price</th>
    <th>Payment</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>

  {/* row 1 */}
 {
  myProduct?.map((selectProduct,index)=>( <tr>
    <th>
     {index+1}
    </th>
    <td>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={selectProduct.image} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
         

        </div>
      </div>
    </td>
    <td>{selectProduct.productName}</td>
    <td className='font-bold'>    
      ${selectProduct.AvailableQuantity}  
    </td>
  
    <td className='font-bold'>    
      {`$${selectProduct.price}`}  
    </td>
    <td>
      {console.log(selectProduct._id)}
      <Link to={`/dashboard/payment/${selectProduct._id}`}>
        <button className='bg-[#99d98c] hover:bg-[#ffc2d1] p-2 rounded-lg font-bold'>Pay</button>
      </Link>
    </td>
    <td><button onClick={()=>handleDelete(selectProduct?._id)} className='bg-[#ff758f] hover:bg-[#ca1551] p-2 rounded-lg font-bold'>delete</button></td>
   
  </tr>))
 }
 
</tbody>


</table>
</div>
    </div>
    );
};

export default MyAddProduct;