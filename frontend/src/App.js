import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
<<<<<<< HEAD
import Home from "./views/home/index.jsx"
=======
import Home from "./views/home/home.jsx"
>>>>>>> fcb00575cfdba66db071c9c3513d3aa030a41e86
import AdminLayout from "./layouts/Admin.jsx";
import ForgotPassword from "./views/forgotPassword/forgotPassword.jsx";
import VerifyOtp from "./views/forgotPassword/verifyOtp.jsx";
import ChangePassword from "./views/forgotPassword/changePassword.jsx";
import Cart from "./views/cart/cart.jsx";
import Address from "./views/address/address.jsx";
import Payment from "./views/payment/payment.jsx";
import ProductPage from "./views/home/product.jsx";
import UserLayout from "./layouts/UserLayout.jsx";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
          </Route> 
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
