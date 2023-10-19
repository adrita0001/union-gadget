import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
const id=useParams()
console.log(id.id);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {

console.log(data);

const{category,rating,productStockQuantity,productName,productDescription,price,previousPrice,}=data;

  const newData={
    productName:productName,
    AvailableQuantity:productStockQuantity,
    price:price,
    productDescription:productDescription,
    ProductPreviousPrice:previousPrice,
    productCategory:category,
    rating:rating
  }

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
}).then ((result)=>{
  fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/updateProduct/${id.id}`, {
    method:'PATCH',
    headers:{
      'content-type':'application/json'
  },
  body:JSON.stringify(newData)
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire(
        'Updated!',
        'Your User has been updated.',
        'success'
    )
    });
})
    
  
    }


    return (
        <div>
              <div>
          <h1 className='text-4xl font-bold text-[#a849b8]'>Update To Product</h1>
            <div className="w-full px-10">
    
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Product Name*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            {...register("productName", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Please Select</option>
              <option>Ladies Watches</option>
              <option>Accessories Watches</option>
              <option>Fashion</option>
              <option>iphone</option>
              <option>Nokia</option>
              <option>maximus mobile</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
        </div>


        <div className="flex my-4">
          
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Product Stock Quantity*</span>
            </label>
            <input
              type="number"
              {...register("productStockQuantity", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Rating*</span>
            </label>
            <input
              type="text"
              {...register("rating", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex my-4">
         
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Previous Price*</span>
            </label>
            <input
              type="number"
              {...register("previousPrice", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          {/* <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Seller Email*</span>
            </label>
            <input
              type="email"
              {...register("sellerEmail", { required: true })}
             

              className="input input-bordered w-full "
            />
          </div> */}
        </div>



        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            {...register("productDescription", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        {/* <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div> */}
       <div className="text-center mb-3"> <input className="btn  bg-[#a849b8] text-white  text-2xl  mt-4" type="submit" value="Update Product" /></div>
      </form>
    </div>
        </div>
        </div>
    );
};

export default UpdateProduct;