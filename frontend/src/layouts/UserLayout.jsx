import MainFooter from "../components/Footers/MainFooter.jsx";
import MainHeader from "../components/Headers/MainHeader.jsx";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
    <MainHeader/>
      <main>
        <Outlet />
      </main>
    <MainFooter />
    </>
  );
}

export default UserLayout;