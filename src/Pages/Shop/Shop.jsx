import React, { useEffect, useState } from 'react';
import ShopCart from './ShopCart';

const Shop = () => {

    const [allProducts,setAllProducts]=useState([])

    useEffect(() => {
        fetch("https://fanal-project-server-muntasirmamuon.vercel.app/addProduct")
          .then((res) => res.json())
          .then((data) => {
            const newData = data.filter(
              (classAll) => classAll?.status === "approved"
            );
    
            setAllProducts(newData);
          });
      }, []);
    return (
        <div>
            <div className='flex mt-10'>
                <div></div>
                {/* cart div  */}
              <div className=''>
              <ShopCart allProducts={allProducts}/>
              </div>
            </div>
        </div>
    );
};

export default Shop;