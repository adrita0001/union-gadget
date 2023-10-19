import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import Shop from "../Pages/Shop/Shop";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import ManageProduct from "../Pages/Dashboard/ManageProduct/ManageProduct";
import ProductDetails from "../Components/ProductsDetails/ProductDetails";
import MyAddProduct from "../Pages/Dashboard/MyAddProduct/MyAddProduct";
import ProductPayment from "../Pages/Dashboard/ProductPayment/ProductPayment";
import MyProductPayment from "../Pages/Dashboard/MyProductPayment/MyProductPayment";
import AddProductStatus from "../Pages/Dashboard/AddProductStatus/AddProductStatus";
import MyProductPaymetHistory from "../Pages/Dashboard/MyProductPaymentHistory/MyProductPaymetHistory";
import MyProductSell from "../Pages/Dashboard/MyProductSell/MyProductSell";
import AdminUserHome from "../Pages/Dashboard/AdminUserHome/AdminUserHome";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct/UpdateProduct";




export const router=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/shop",
                element:<Shop></Shop>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/shop/:id",
                element:<ProductDetails></ProductDetails>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"userhome",
                element:<AdminUserHome></AdminUserHome>
            },
            {
                path:"addItem",
                element:<AddItem></AddItem>
            },
            {
                path:"/dashboard/updateProduct/:id",
                element:<UpdateProduct></UpdateProduct>
            },
            {
                path:"addItemStatus",
                element:<AddProductStatus></AddProductStatus>
            },
            {
                path:"alluser",
                element:<AllUser></AllUser>
            },
            {
                path:'mysellproduct',
                element:<MyProductSell></MyProductSell>
            },
            {
                path:"manageProduct",
                element:<ManageProduct></ManageProduct>
            },
            {
                path:"myaddproduct",
                element:<MyAddProduct></MyAddProduct>
            },
            {
                path:"payment/:id",
                element:<ProductPayment></ProductPayment>
            },
            {
                path:"myproductpayment",
                element:<MyProductPayment></MyProductPayment>
            },
            {
                path:"myproductpaymentHistory",
                element:<MyProductPaymetHistory></MyProductPaymetHistory>
            }
        ]
    }
])