import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSeller = () => {
    const {user,loading}=useContext(AuthContext);
    const [axiosSecure]=useAxiosSecure()
    const {data:isSeller,isLoading:isSellerLoading}=useQuery({
        queryKey:['seller',user?.email],
        enabled: !loading && !!user?.email,
        queryFn:async()=>{
          if(!loading && user?.email){
            const res=await axiosSecure.get(`/users/seller/${user?.email}`);

            return res.data
          }
        }
    })
    return [isSeller,isSellerLoading]
};

export default useSeller;