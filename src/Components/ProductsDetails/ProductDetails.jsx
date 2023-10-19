import { all } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import { toast } from 'react-hot-toast';
const ProductDetails = () => {
  const {user}=useContext(AuthContext)
    const [quantity, setQuantity] = useState(1)
const navigate=useNavigate()
const location = useLocation();
const [isAdmin]=useAdmin()
 
const [isSeller]=useSeller()
console.log(isAdmin);
const id=useParams()

    
    const [allProducts,setAllProducts]=useState([])

    useEffect(() => {
        fetch(`https://fanal-project-server-muntasirmamuon.vercel.app/addProduct/${id?.id}`)
          .then((res) => res.json())
          .then((data) => {
            
 
            setAllProducts(data);
          });
      }, []);
    if (quantity < 1) {
        setQuantity(1)
    } else if (quantity > 15) {
        setQuantity(15)
    }


const hanldeAddProduct=(addProduct)=>{
 
    const{_id,productName,   productCategory,image,AvailableQuantity,email, price    }=addProduct;
    const SelectedProduct={
        productID:_id,
        productName,
        image,
        AvailableQuantity,
        email,
        price,
        userEmail:user?.email,
        productCategory
    }

    if(isAdmin||isSeller?.seller){
        toast.error("Don't permission add Product")
    }else{
        if(user){
            fetch("https://fanal-project-server-muntasirmamuon.vercel.app/selectProduct", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(SelectedProduct),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your Product has been added",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
        }else{
            Swal.fire({
                title: "Please Login to add Product",
        
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now!",
              }) 
              .then((result)=>{
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                  }
              })
        }
    }
   
  }
    
    const props = {
        smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: `${allProducts?.image}`,
        },
        largeImage: {
            src: `${allProducts?.image}`,
            width: 550,
            height: 800
        },
        isActivatedOnTouch:true,
        isHintEnabled: true,
        shouldHideHintAfterFirstActivation: false,
        sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
    };
    return (
        <div>
             <section className=' py-10'>
            <div  className='w-full h-[40vh] flex flex-col items-center justify-center px-10 lg:px-20 text-center'>
                <p className='text-xl font-bold text-white'>{allProducts.productCategory}</p>
                <h2 className='text-white text-2xl font-semibold'>{allProducts.productName}</h2>
            </div>

            <div className='w-full px-10 lg:px-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='border inset-1 h-full w-full'>
                    <ReactImageMagnify {...props}/>
                </div>
                <div className='lg:col-span-2 h-full w-full p-10 space-y-5'>
                    <h1 className='text-2xl ml-0 font-semibold'>{allProducts.productName}</h1>
                    <fiv className="flex  items-center">
                    <h3 className=' font-bold'> Price: ${allProducts.price}  </h3>
                    <p><sub className='font-medium  ml-8 line-through'>${allProducts.
ProductPreviousPrice}</sub></p>
                    </fiv>
                    <p className='text-justify'>{allProducts.productDescription}</p>
                    <div className='grid grid-cols-2 lg:w-1/2'>
                        <h3 className='font-semibold'>Availability :</h3>
                        {/* <p className={`${allProducts.
AvailableQuantity ? "text-green-700" : "bg-red-700"}`}>{inStock ? "In-Stock" : "Stock-Out"}</p> */}
                        <h3 className='font-semibold'>Categories : {allProducts.productCategory} </h3>
                        <p></p>
                    </div>
                    <div className='flex items-center h-auto'>
                        {/* <div className='grid grid-cols-3 rounded-l-md h-full border'>
                            <button onClick={() => setQuantity(quantity - 1)} className='text-4xl pb-1.5'> - </button>
                            <input className='border-x text-xl h-full md:w-16 lg:w-20 pl-7 rounded' readOnly type="number" value={quantity} name='quantity' min={1} max={15} />
                            <button onClick={() => setQuantity(quantity + 1)} className='text-4xl pb-1.5'> + </button>
                        </div> */}
                        <div className='flex-grow text-center'>
                            <button onClick={()=>hanldeAddProduct(allProducts)} className='bg-accent px-3 text-white py-3 w-full rounded-r-md hover:bg-accent-focus duration-300 font-semibold'>Add To Cart</button>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {/* {
                    categories.map(item => <div key={item._id}>
                        <img src={item.img} alt={item.name} />
                        <Link to="/">
                        <h1 className='text-lg font-semibold'>{item.name}</h1>
                        </Link>
                    </div>)
                } */}
            </div>
                </div>
                
            </div>
            
        </section>
        </div>
       
    );
};

export default ProductDetails;