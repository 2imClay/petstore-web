
import AdminAddProduct from "./views/admin/AdminAddProduct.jsx";
// import AdminMaps from "./views/AdminMaps.jsx";
import AdminProductList from "./views/admin/AdminProductList.jsx";
import AdminUserList from "./views/admin/AdminUserList";
import AdminOrderList from "./views/admin/AdminOrderList";

var routes = [

  {
    path: "/userList",
    name: "Danh sách người dùng",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AdminUserList />,
    layout: "/admin",
  },
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
  {
    path: "/orderList",
    name: "Danh sách đơn hàng",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AdminOrderList />,
    layout: "/admin",
  },

];
export default routes;
