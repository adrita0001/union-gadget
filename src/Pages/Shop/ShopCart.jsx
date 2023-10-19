import React from 'react';
import { Link } from 'react-router-dom';

const ShopCart = ({allProducts}) => {
    console.log(allProducts);
    return (
        <div className='grid  sm:grid-cols-1 lg:grid-cols-4 gap-5'>
        {/* {allProducts.map((item, index) => (
            <Link to={`/shop/${item._id}`}><div key={index} className='bg-[#ece9e9] h-96  p-2'>
            <img className='w-56 h-52' src={item.image} alt="" />
            <h1 className='w-40'>{item.productName}</h1>
            <h1 className='text-[#CDCACA]'>Headphone, Bluetooth</h1>
            <p className='w-20'>Price: {item.price}</p>
            <p>{item.AvailableQuantity?"Stock In":"Stock Out"}</p>
        </div></Link>
        ))} */}


{
    allProducts.map((item,index)=>(<>
    
    <Link to={`/shop/${item._id}`}>
    
    <div className="card w-72 h-[480px] bg-base-100 shadow-xl ml-5 lg:ml-0">
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
    );
};

export default ShopCart;