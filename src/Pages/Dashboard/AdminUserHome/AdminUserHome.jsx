import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PieChart, Pie, Sector,  ResponsiveContainer } from 'recharts';

const AdminUserHome = () => {
    const {user}=useContext(AuthContext)
    const [iphone,seIphone]=useState([])
    const [product,setProduct]=useState([])
    const [maximus,seMaximus]=useState([])
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const[data,setData]=useState([])
useEffect(()=>{
    fetch("https://fanal-project-server-muntasirmamuon.vercel.app/admin-stats")
    .then(res=>res.json())
    .then(data=>{
     
   
    
        setData(data)
      
       
        
       
        
       
    })
},[])
console.log(data);

const data1 = [
  {
    name: 'Product Order',
    uv: `${data.orders}`,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Total Customers',
    uv:`${data.user}`,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Total products',
    uv: `${data.products}`,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Total Revenue',
    uv: `${data.revenue}`,
    pv: 3908,
    amt: 2000,
  },

 
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

    return (
        <div>
            <div className='w-full m-4'>
                <h1 className='text-3xl'>Hi, {user&&user?.displayName}</h1>
            </div>
            {/* 1st div  */}
            <div className='flex justify-between'>
                <div className='rvenue-style p-8'>
                    {/* Revenuio part */}

                 <div className='flex items-center gap-2 justify-around'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <g clip-path="url(#clip0_4_196)">
    <path d="M46.5906 40.9092H38.6362C33.6236 40.9092 29.5454 36.831 29.5454 31.8184C29.5454 26.8059 33.6236 22.7277 38.6362 22.7277H46.5906C47.2187 22.7277 47.727 22.2195 47.727 21.5913V18.1823C47.727 15.7994 45.8786 13.8615 43.5433 13.6735L37.0172 2.27457C36.4124 1.22033 35.4358 0.466825 34.2673 0.15394C33.1042 -0.156815 31.8881 0.00639266 30.8471 0.612242L8.47503 13.6369H4.5458C2.03899 13.6369 0.000383377 15.6754 0.000383377 18.1823V45.4546C0.000383377 47.9614 2.03888 50 4.5458 50H43.1816C45.6884 50 47.727 47.9615 47.727 45.4546V42.0456C47.727 41.4174 47.2187 40.9092 46.5906 40.9092ZM38.4265 9.3121L40.9025 13.6369H30.9981L38.4265 9.3121ZM12.992 13.6369L31.9912 2.57638C32.505 2.27564 33.1053 2.19574 33.6791 2.34893C34.2595 2.50426 34.7433 2.87936 35.0441 3.40424L35.0464 3.4084L17.4782 13.6369H12.992Z" fill="white"/>
    <path d="M46.5905 25.0004H38.6361C34.8764 25.0004 31.818 28.0587 31.818 31.8184C31.818 35.5782 34.8764 38.6365 38.6361 38.6365H46.5905C48.4704 38.6365 49.9996 37.1074 49.9996 35.2275V28.4094C49.9996 26.5295 48.4704 25.0004 46.5905 25.0004ZM38.6361 34.0911C37.3833 34.0911 36.3634 33.0713 36.3634 31.8184C36.3634 30.5656 37.3833 29.5458 38.6361 29.5458C39.8889 29.5458 40.9087 30.5656 40.9087 31.8184C40.9088 33.0713 39.889 34.0911 38.6361 34.0911Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4_196">
      <rect width="50" height="50" fill="white"/>
    </clipPath>
  </defs>
</svg>
                    </div>
                    <div>
                        <h1>${data.revenue}</h1>
                        <p>Revenue</p>
                    </div>
                 </div>

                </div>
                <div className='customers-style p-8'>
                    <div className='flex justify-around items-center gap-2'>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
  <g clip-path="url(#clip0_4_255)">
    <path d="M25 20.5178C29.6923 20.5178 33.4961 16.7139 33.4961 12.0217C33.4961 7.32941 29.6923 3.52558 25 3.52558C20.3077 3.52558 16.5039 7.32941 16.5039 12.0217C16.5039 16.7139 20.3077 20.5178 25 20.5178Z" fill="white"/>
    <path d="M42.1875 20.5177C45.1539 20.5177 47.5586 18.113 47.5586 15.1466C47.5586 12.1802 45.1539 9.77548 42.1875 9.77548C39.2211 9.77548 36.8164 12.1802 36.8164 15.1466C36.8164 18.113 39.2211 20.5177 42.1875 20.5177Z" fill="white"/>
    <path d="M7.8125 20.5177C10.7789 20.5177 13.1836 18.113 13.1836 15.1466C13.1836 12.1802 10.7789 9.77548 7.8125 9.77548C4.84613 9.77548 2.44141 12.1802 2.44141 15.1466C2.44141 18.113 4.84613 20.5177 7.8125 20.5177Z" fill="white"/>
    <path d="M13.1045 25.341C10.9902 23.6088 9.07549 23.8381 6.63086 23.8381C2.97461 23.8381 0 26.7951 0 30.4289V41.0939C0 42.6721 1.28809 43.9553 2.87207 43.9553C9.71055 43.9553 8.88672 44.079 8.88672 43.6603C8.88672 36.1031 7.9916 30.561 13.1045 25.341Z" fill="white"/>
    <path d="M27.3252 23.877C23.0553 23.5209 19.3439 23.8811 16.1426 26.5235C10.7855 30.8145 11.8164 36.5922 11.8164 43.6602C11.8164 45.5303 13.3379 47.0802 15.2363 47.0802C35.8498 47.0802 36.6702 47.7451 37.8926 45.0382C38.2935 44.1227 38.1836 44.4137 38.1836 35.6563C38.1836 28.7007 32.1609 23.877 27.3252 23.877Z" fill="white"/>
    <path d="M43.3691 23.838C40.9111 23.838 39.0069 23.611 36.8955 25.3409C41.9702 30.5222 41.1133 35.6861 41.1133 43.6602C41.1133 44.0815 40.4294 43.9552 47.0254 43.9552C48.666 43.9552 50 42.6261 50 40.9923V30.4288C50 26.795 47.0254 23.838 43.3691 23.838Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4_255">
      <rect width="50" height="50" fill="white" transform="translate(0 0.338959)"/>
    </clipPath>
  </defs>
</svg>
                        </div>
                        <div>
                            <h1>{data.user}</h1>
                            <p>Customers</p>
                        </div>
                    </div>
                    {/* Customers part  */}
                </div>
                <div className='products-style p-8'>
                    <div className='flex justify-around items-center gap-2'>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <path d="M16.0992 34.779L12.9905 35.37C10.054 35.9284 7.84856 38.0415 7.36418 40.7573L5.79319 48.234C5.70236 48.6658 5.81125 49.1156 6.08938 49.4583C6.3675 49.801 6.78528 50 7.22658 50H17.1874V42.3817C17.1874 41.8596 17.4654 41.3769 17.917 41.1147L22.6646 38.3596C20.1099 37.868 17.8327 36.5864 16.0992 34.779Z" fill="white"/>
  <path d="M44.2069 48.2335L42.6331 40.7558C42.1482 38.0407 39.9426 35.9284 37.0065 35.3706L33.8994 34.7804C32.7402 35.9886 31.3377 36.9612 29.7722 37.6206C29.7648 37.6251 20.1171 43.2253 20.1171 43.2253V50H42.7734C43.2148 50 43.6327 49.801 43.9108 49.4581C44.189 49.1153 44.2978 48.6654 44.2069 48.2335ZM25.4883 46.4845H24.5118C23.7028 46.4845 23.0469 45.8286 23.0469 45.0196C23.0469 44.2106 23.7028 43.5548 24.5118 43.5548H25.4883C26.2973 43.5548 26.9532 44.2106 26.9532 45.0196C26.9532 45.8286 26.2973 46.4845 25.4883 46.4845Z" fill="white"/>
  <path d="M15.5761 16.8354H34.4238V19.7827H15.5761V16.8354Z" fill="white"/>
  <path d="M15.5761 12.2467V13.9057H34.4238V12.2467C36.3204 11.3479 37.5622 9.4166 37.5622 7.28857C37.5622 4.26465 35.102 1.80449 32.078 1.80449C31.3682 1.80449 30.6636 1.94297 30.0103 2.2084C28.7256 0.798047 26.9305 0 25 0C23.0694 0 21.2743 0.797949 19.9896 2.2083C19.3363 1.94287 18.6317 1.80439 17.9218 1.80439C14.8979 1.80439 12.4377 4.26455 12.4377 7.28848C12.4377 9.4166 13.6795 11.3479 15.5761 12.2467Z" fill="white"/>
  <path d="M25 35.6525C30.187 35.6525 34.407 31.4326 34.407 26.2456V22.7124H15.593V26.2456C15.593 31.4326 19.8129 35.6525 25 35.6525Z" fill="white"/>
</svg>
                        </div>
                        <div>
                            <h1>{data.products}</h1>
                            <p>Products</p>
                        </div>
                    </div>
                    {/* Products part  */}
                </div>
                <div className='flex justify-around items-center gap-2 orders-style p-8'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <g clip-path="url(#clip0_4_319)">
    <path d="M43.1818 15.9091H36.3636V6.81818H4.54549C2.03406 6.81818 0 8.85224 0 11.3637V36.3637H4.54549C4.54549 40.1251 7.60228 43.1819 11.3637 43.1819C15.1251 43.1819 18.1819 40.1251 18.1819 36.3637H31.8182C31.8182 40.1251 34.875 43.1819 38.6364 43.1819C42.3978 43.1819 45.4546 40.1251 45.4546 36.3637H50.0001V25.0001L43.1818 15.9091ZM11.3637 39.7727C9.47728 39.7727 7.95459 38.25 7.95459 36.3636C7.95459 34.4772 9.47728 32.9545 11.3637 32.9545C13.2501 32.9545 14.7728 34.4772 14.7728 36.3636C14.7728 38.25 13.25 39.7727 11.3637 39.7727ZM38.6364 39.7727C36.75 39.7727 35.2273 38.25 35.2273 36.3636C35.2273 34.4772 36.75 32.9545 38.6364 32.9545C40.5228 32.9545 42.0455 34.4772 42.0455 36.3636C42.0455 38.25 40.5227 39.7727 38.6364 39.7727ZM36.3636 25.0001V19.3183H42.0454L46.5113 25.0001H36.3636Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4_319">
      <rect width="50" height="50" fill="white"/>
    </clipPath>
  </defs>
</svg>
                    </div>
                    <div>
                        <h1>{data.orders}</h1>
                        <p>Orders</p>
                    </div>
                </div>
               
            </div>

                        {/* 1st div end */}


{/* chart part  */}

         <div className='flex '>
          <div className='w-1/2'>

          <BarChart
      width={600}
      height={300}
      data={data1}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>

          </div>
          <div></div>
         </div>

        </div>
    );
};

export default AdminUserHome;