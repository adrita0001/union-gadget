import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAddProduct from '../../../hooks/useAddProduct';
import { GiShoppingCart} from "react-icons/gi";
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
 

    const [addproduct]=useAddProduct()

    const handleLogOut = () => {
        logOut()
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div>
            <div className="navbar navbar-style text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow navbar-style rounded-box w-52">
      <li className='hover:text-white '><Link to={"/"}>Home</Link></li>
      
      <li><Link to={"shop"}>Shop</Link></li>

      <li>
        {user&&<Link to={"dashboard"}>Dashboard</Link>}
      </li>
      <li>
      <Link to="dashboard/myaddproduct">
          <div className="flex gap-2 items-center">
            <FaShoppingCart/>
            <div className="badge badge-secondary">+{addproduct&&addproduct?.length}</div>
          </div>
        </Link>
      </li>
       
     <li> {user ? (
        <>
          <button onClick={handleLogOut} className="mr-3">
            Log Out
          </button>
        </>
      ) : (
        <>
          
            <Link className='mr-3' to="/login">Login</Link>
          
        </>
      )}</li>
    <li><Link to="/register" className="">Sign Up</Link></li>
      </ul>
    </div>
    <Link to={"/"} className="btn btn-ghost normal-case text-xl">
      <img className='w-12' src="https://i.ibb.co/ccYB4vX/1-removebg-preview.png" alt="" />
      Union Gadget
    </Link>
  </div>
  <div className="navbar-center hidden lg:block ">
    <ul className="menu menu-horizontal  px-1">
      <li className='hover:text-white '><Link to={"/"}>Home</Link></li>
      
      <li><Link to={"shop"}>Shop</Link></li>

      <li>
        {user&&<Link to={"dashboard"}>Dashboard</Link>}
      </li>
      <li>
      <Link to="dashboard/myaddproduct">
          <div className="flex gap-2 items-center">
            <FaShoppingCart/>
            <div className="badge badge-secondary">+{addproduct&&addproduct?.length}</div>
          </div>
        </Link>
      </li>
    </ul>
  </div>
  <div className="navbar-end hidden lg:block font-bold">
  {user ? (
        <>
          <button onClick={handleLogOut} className="mr-3">
            Log Out
          </button>
        </>
      ) : (
        <>
          
            <Link className='mr-3' to="/login">Login</Link>
          
        </>
      )}
    <Link to="/register" className="">Sign Up</Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;