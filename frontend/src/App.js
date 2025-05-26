import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home/index.jsx"
import AdminLayout from "./layouts/Admin.js";
import ForgotPassword from "./views/forgotPassword/forgotPassword.jsx";
import VerifyOtp from "./views/forgotPassword/verifyOtp.jsx";
import ChangePassword from "./views/forgotPassword/changePassword.jsx";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/verifyOtp" element={<VerifyOtp/>}/>
          <Route path="/changePassword" element={<ChangePassword/>}/>
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
