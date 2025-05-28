import Footer from "../components/Footers/Footer.jsx";
import Header from "../components/Headers/Header.jsx";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
    <Header/>
      <main>
        <Outlet />
      </main>
    <Footer />
    </>
  );
}

export default UserLayout;