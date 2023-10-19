import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import Lottie from "lottie-react";;
import animation from "../../../public/woman-shopping-online.json"
const Register = () => {



   const navigate=useNavigate()
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const{createUser, userDetails}=useContext(AuthContext)


const onSubmit=data=>{

  const name=data.name
  const email=data.email
  const photo=data.photo
  const password=data.password
console.log(data);
createUser(email,password)
.then(result=>{
  userDetails(name,photo)
  const saveUser={name:name,email:email,photoURL:photo,role:'user'}
 
  fetch('https://fanal-project-server-muntasirmamuon.vercel.app/users',{
      method:'POST',
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(saveUser)
  })
  .then(res=>res.json())
  .then(data=>{
      if(data.insertedId){
          toast.success('Google SignUp Successfully ');
          navigate('/')
      }
  })




})
}


    return (
        <div className='mb-10'>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    <Lottie animationData={animation} loop={true} />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
     <form onSubmit={handleSubmit(onSubmit)}>
     <div className="card-body">
      <h1 className='font-bold text-2xl'>Sign Up</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" {...register("photo", { required: true })} name='photo' placeholder="Photo" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email",{ required: true })} name='email' placeholder="email" className="input input-bordered" />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password",{ required: true, minLength:6, maxLength: 20,pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name='password' placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less then 20 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
        
        </div>
        <div className="form-control mt-6">
        <input type="submit"  className="btn btn-primary" value="Sign up" />
        </div>
      </div>
      <Link to={"/login"}>Already have a Account? Please Sign In</Link>
     </form>
     <SocialLogin/>
    </div>
  </div>
 
</div>
        </div>
    );
};

export default Register;