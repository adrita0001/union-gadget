import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Sheared/Navbar/Navbar';
import Footer from '../Pages/Sheared/Footer/Footer';

const Main = () => {
    const noHeaderFooter=location.pathname.includes('login')|| location.pathname.includes('register')
    return (
        <div>
          {noHeaderFooter|| <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter||<Footer></Footer>}
        </div>
    );
};

export default Main;