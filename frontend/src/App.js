import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Profile from "./views/Profile";
import Maps from "./views/Maps";
import Tables from "./views/Tables";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<Maps />} />
            <Route path="/table" element={<Tables />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
