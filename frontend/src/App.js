import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import AdminProfile from "./views/AdminProfile";
import AdminMaps from "./views/AdminMaps";
import AdminTables from "./views/AdminTables";
// import AdminIndex from "./views/AdminIndex";

import AdminLayout from "./layouts/Admin.js";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
