import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../../Components/Banner/Banner';

const Home = () => {

const [toggleProducts,setToogleProducts]=useState(false)
const [category,setcategory]=useState("")
const [categoryProduct,setCategoryProduct]=useState([])
const [data,setData]=useState([])




    const handleBusness=(e)=>{

        console.log(e);

        fetch("https://fanal-project-server-muntasirmamuon.vercel.app/addProduct")
        .then(res => res.json())
        .then(data => {
            const newData=data.filter((dt)=>dt.status === "approved")
            console.log(newData);
       
            const myProducts = newData.filter((pd) => pd?.productCategory === e);
            setData(myProducts);
            
            // Further logic based on myProducts
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    
       

         
 
    }


    if(toggleProducts){
        console.log(category);
       
    }else{
       
        useEffect(()=>{
            fetch("https://fanal-project-server-muntasirmamuon.vercel.app/addProduct")
            .then(res=>res.json())
            .then(data=>{
        
            const newData=data.filter((dt)=>dt.status === "approved")
     
             setData(newData)
            
            })
          },[])
    
    }
    return (
        <div>
            <div className='lg:flex sm:mx-auto lg:justify-between  mt-10'>
                <div className='w-60 h-48 bg-[ #ffffff]  shadow-xl mx-auto'>
                    {/* category part */}
                    <h1 className='font-bold mb-3 text-purple-600 text-2xl'>Product Category</h1>
                    <ul>
                        <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white p-2 rounded-md'><Link onClick={()=>handleBusness("Ladies Watches")}>Ladies Watches</Link></li>
                        <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white p-2 mt-1 rounded-md'><Link onClick={()=>handleBusness("Accessories Watches")} >Accessories Watches</Link></li>
                        {/* <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white  p-2 mt-1 mb-1 rounded-md'><Link onClick={()=>handleBusness("Fashion")} >Fashion Watch</Link></li> */}
                        <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white p-2 mt-1 rounded-md'><Link onClick={()=>handleBusness("iphone")}>iphone</Link></li>
                        <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white  p-2 mt-1 rounded-md'><Link onClick={()=>handleBusness("Nokia")} >Nokia</Link></li>
                        <li className=' bg-[#7a2bb6] text-white hover:bg-[#a849b8] hover:text-white p-2 mt-1 rounded-md'><Link onClick={()=>handleBusness("maximus mobile")}>maximus</Link></li>
                    </ul>
                </div>
                <div className='w-72 mt-36 lg:mt-0 lg:w-[1000px] sm:mt-20 lg:ml-5 mx-auto'>
                  <Banner></Banner>
                    {/* slider part */}
                </div>

            </div>

<h1 className='text-4xl font-bold mt-5'>Products</h1>
          <div className='grid sm:grid-cols-1 lg:grid-cols-4 gap-5 mt-5'>
          {
           
               data&&data.map((item,index)=>(<>
                
                <Link to={`/shop/${item._id}`}>
    
    <div className="card w-72 h-[480px] bg-base-100 shadow-xl mx-auto">
  <figure><img className='w-64' src={item.image} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.productCategory}!
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p className='text-justify'>{item.productName}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">${item.price}</div> 
      <div className="badge badge-outline">{item.AvailableQuantity?"Stock In":"Stock Out"}</div>
    </div>
  </div>
</div>
    </Link>
                
                
                </>))
            }
          </div>
        </div>
    );
};

export default Home;