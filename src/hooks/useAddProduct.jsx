import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAddProduct = () => {

    const {user}=useContext(AuthContext)
    const[axiosSecure]=useAxiosSecure()
    const {data:myProduct,isLoading:isProductLoading,refetch}=useQuery({
        queryKey:['myProduct',user?.email],
        queryFn:async()=>{
           if(user?.email){
            const res=await axiosSecure.get(`/selectedProduct?email=${user.email}`);
   
            return res.data
           }
        }
    })
    return [myProduct,isProductLoading,refetch]
};

export default useAddProduct;