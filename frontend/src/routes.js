
import AdminAddProduct from "./views/AdminAddProduct.jsx";
// import AdminMaps from "./views/AdminMaps.jsx";
import AdminProductList from "./views/AdminProductList.jsx";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <AdminIndex />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/productList",
    name: "Danh sách sản phẩm",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AdminProductList />,
    layout: "/admin",
  },
  {
    path: "/addProduct",
    name: "Thêm sản phẩm",
    icon: "ni ni-single-02 text-yellow",
    component: <AdminAddProduct />,
    layout: "/admin",
  },

  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <AdminMaps />,
  //   layout: "/admin",
  // },

  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
