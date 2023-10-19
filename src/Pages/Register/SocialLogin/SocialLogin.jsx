import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { toast } from "react-hot-toast";

const SocialLogin = () => {
    const {googleSignIn}=useContext(AuthContext)
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.sate?.from?.pathname || '/'


const handleGoogleLogin=()=>{
    googleSignIn()
   
              
    .then(result=>{
        const loggedInUser=result.user
        const saveUser={name:loggedInUser.displayName,email:loggedInUser.email,photoURL:loggedInUser.photoURL,role:'user'}
        fetch('https://fanal-project-server-muntasirmamuon.vercel.app/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(saveUser)
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Google SignUp Successfully ');
            navigate(from,{replace:true})
           
        })
    })
}

    return (
        <div>
             <div>
      <div className="divider"></div>
      <div className="w-full text-center my-4">
      <button onClick={handleGoogleLogin} className=" text-4xl hover:text-purple-500 ">
       <FcGoogle/>
      </button>
      </div>
    </div>
        </div>
    );
};

export default SocialLogin;