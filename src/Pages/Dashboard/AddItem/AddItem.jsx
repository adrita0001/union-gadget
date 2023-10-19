import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
const img_hosting_token=import.meta.env.VITE_Image_Upload_token

const AddItem = () => {
  const {user}=useContext(AuthContext)
  console.log(user?.email);
  const[axiosSecure]=useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url= `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const navigate=useNavigate()
    const onSubmit = (data) => {

      const formData=new FormData()
      formData.append('image',data.image[0])

      fetch(img_hosting_url,{
        method:"POST",
        body:formData
      })
      .then(res=>res.json())
      .then(imgResponse=>{
          console.log(imgResponse);
          const imgURL = imgResponse.data.display_url;
          const status='pending';
          const{productName, category,price,previousPrice,productStockQuantity,rating,sellerEmail,productDescription}=data
          const addProduct={
            productName:productName,
            image:imgURL,
            email:sellerEmail,
            AvailableQuantity:parseInt(productStockQuantity),
            price:price,
            status:status,
            productDescription:productDescription,
            ProductPreviousPrice:previousPrice,
            productCategory:category,
            rating:rating
          }
          axiosSecure.post('/addProduct',addProduct)
          .then((data)=>{
            if(data.data.insertedId){
              reset()
              // navigate('/dashboard')
              toast.success('Add Product Successfully')
            }
          })
      })
        console.log(data);
        console.log("hi");
    }

    return (
        <div>
          <h1 className='text-4xl font-bold text-[#a849b8]'>Apply To Product</h1>
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
              {...register("rating")}
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
              {...register("previousPrice")}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Seller Email*</span>
            </label>
            <input
              type="email"
              {...register("sellerEmail", { required: true })}
             
              defaultValue={user?.email}
              className="input input-bordered w-full "
            />
          </div>
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

        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
       <div className="text-center mb-3"> <input className="btn  bg-[#a849b8] text-white  text-2xl  mt-4" type="submit" value="Add Item" /></div>
      </form>
    </div>
        </div>
    );
};

export default AddItem;