import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home/index.jsx";
import AdminLayout from "./layouts/Admin.jsx";
import ForgotPassword from "./views/forgotPassword/forgotPassword.jsx";
import VerifyOtp from "./views/forgotPassword/verifyOtp.jsx";
import ChangePassword from "./views/forgotPassword/changePassword.jsx";
import Cart from "./views/cart/cart.jsx";
import Address from "./views/address/address.jsx";
import Payment from "./views/payment/payment.jsx";
import ProductPage from "./views/home/product.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import OAuth2RedirectHandler from "./views/login/OAuth2RedirectHandler.jsx";
import Profile from "./views/user/profile.jsx"
import LayoutProfile from "./views/user/LayoutProfile.jsx"
import ProductDetails from "./views/product/product-detail.jsx";
import {ToastContainer} from "react-toastify";
import ChangePasswordUser from "./views/user/change-password.jsx";
import MyOrder from "./views/user/my-order.jsx";
import AboutPage from "./views/home/about.jsx";
import ContactPage from "./views/contact/contact.jsx";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
        <Routes>

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route element={<UserLayout/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/verifyOtp" element={<VerifyOtp/>}/>
                <Route path="/changePassword" element={<ChangePassword/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/address" element={<Address/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/products" element={<ProductPage/>}/> 
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route> 
            <Route path="/" element={<LayoutProfile />}>
                <Route path="profile/:id" element={<Profile />} />
                <Route path="change-password" element={<ChangePasswordUser />} />
                <Route path="orders/:id" element={<MyOrder />} />
                {/* <Route path="orders" element={<OrdersPage />} /> */}
            </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
