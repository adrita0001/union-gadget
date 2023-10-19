import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../Register/SocialLogin/SocialLogin';
import { toast } from 'react-hot-toast';
import Lottie from "lottie-react";;
import animation from "../../../public/woman-shopping-online.json"
const Login = () => {
    const navigate=useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {signIn}=useContext(AuthContext)
    const location=useLocation()
    const from=location.sate?.from?.pathname || '/'
    const onSubmit =( data) => {
      console.log("ki");
console.log(data);
const email=data.email;
const password=data.password

signIn(email,password)
.then(result=>{

  const user=result.user
  toast.success('SignUp Successfully ');
 
  navigate(from,{replace:true})

})
    
      }
    return (
      <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <Lottie animationData={animation} loop={true} />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className='text-2xl font-bold'>Sign In</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email"  {...register("email")} placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password"  {...register("password")} placeholder="password" className="input input-bordered" />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type='submit' value="Sing In" className="btn btn-primary"/>
            </div>
            <Link to={"/register"}>Are you New? Please Sign Up</Link>
          </form>
          <SocialLogin></SocialLogin>
        </div>
       
      </div>
    </div>
    );
};

export default Login;