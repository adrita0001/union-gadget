import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import { AiOutlineHome } from "react-icons/ai";
const Dashboard = () => {
  const [isAdmin]=useAdmin()
 
  const [isSeller]=useSeller()
  

    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex ml-5 rounded-md flex-col">
   <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-[#6e3178]   text-white">
      {/* Sidebar content here */}
      {
       isAdmin&&(<>
         <li><Link to={"userhome"}><AiOutlineHome/> Admin Home</Link></li>
         <li><Link to={"alluser"}>All User</Link></li>
         <li><Link to={"manageProduct"}>Manage Product</Link></li>
        </>)
      }
     {
      isSeller?.seller&&(<>
      <li><Link to={"addItem"}>Add Product</Link></li>

      <li><Link to={"addItemStatus"}>My Add Product Status</Link></li>
      <li><Link to={"mysellproduct"}>My Sell Product</Link></li>
     
      </>)
     }

     {
      !isAdmin&&!isSeller?.seller&&(<>
      <li><Link to={"myaddproduct"}>My selected Product</Link></li>
      <li><Link to={"myproductpayment"}>My Buy Product</Link></li>
      </>)
     }

     
      
     

      <li><Link to={"/"}>Home</Link></li>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;