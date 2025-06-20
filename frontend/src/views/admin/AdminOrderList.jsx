import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
} from "reactstrap";

import AdminHeader from "../../components/Headers/AdminListHeader.jsx";
import {toast} from "react-toastify";

const AdminProductList = () => {
    const [status, setStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 9;
    const [orders, setOrders] = useState([]);
    // const userId = localStorage.getItem("userId");
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);


    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/users") // giả sử API này trả về danh sách user
            .then(res => setUsers(res.data))
            .catch(err => console.error("Lỗi khi lấy user:", err));
    }, []);


    useEffect(() => {
        axios.get("http://localhost:8080/api/order/status")
            .then(res => setStatuses(res.data))
            .catch(err => console.error("Lỗi khi lấy danh sách trạng thái:", err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/${selectedUserId}`)
            .then(res => {
                console.log("Orders:", res.data);
                setOrders(res.data);
            })
            .catch(err => console.error(err));
    }, [selectedUserId]);

    // Hàm tính tiền ship theo phương thức vận chuyển
    const getShippingCost = (method) => {
        if (method === "fast") return 50000;
        if (method === "normal") return 20000;
        return 0;
    };

    const handleUpdateStatus = async (orderId) => {
        const newStatus = status[orderId];
        try {
            await axios.put(`http://localhost:8080/api/orders/${orderId}/status`, {
                statusName: newStatus
            });
            toast.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            console.error(error);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };


    return (
        <>
            <AdminHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Danh sách đơn hàng</h3>
                            </CardHeader>
                            <div className="px-4 py-2">
                                <label>Chọn người dùng:</label>
                                <select
                                    className="form-control"
                                    value={selectedUserId || ""}
                                    style={{width:'30%'}}
                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                >
                                    <option value="">-- Chọn user --</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.id} - {user.fullname || `User ${user.id}`} - {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Phương thức vận chuyển</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Trạng thái giao hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Sản phẩm</th>
                                    <th>Tiền ship</th>
                                    <th>Tổng tiền</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => {
                                        const totalProductPrice = order.items.reduce(
                                            (sum, item) => sum + item.price * item.quantity,
                                            0
                                        );
                                        const shippingCost = getShippingCost(order.shippingMethod);
                                        const finalTotal = totalProductPrice + shippingCost;

                                        return (
                                            <tr key={order.orderId}>
                                                <td>{order.orderId}</td>
                                                <td>{order.shippingMethod}</td>
                                                <td>{order.paymentMethod}</td>
                                                <td>
                                                    <select
                                                        value={status[order.orderId] || ""}
                                                        onChange={(e) =>
                                                            setStatus((prev) => ({
                                                                ...prev,
                                                                [order.orderId]: e.target.value
                                                            }))
                                                        }
                                                        style={{width:'auto'}}
                                                        className="form-control"
                                                    >
                                                        <option value="">-- {order.statusName} --</option>
                                                        {statuses.map(status => (
                                                            <option key={status.id} value={status.name}>{status.name}</option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                                <td>
                                                    <ul className="myorders-product-list">
                                                        {order.items.map(item => (
                                                            <li key={item.productId}>
                                                                {item.productName} - Giá: {item.price.toLocaleString()} - SL: {item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>{shippingCost.toLocaleString()} đ</td>
                                                <td>{finalTotal.toLocaleString()} đ</td>
                                                <td className="text-left">
                                                {/*<Button*/}
                                                {/*    size="sm"*/}
                                                {/*    style={{width:'40%', padding:'2px'}}*/}
                                                {/*    color="success"*/}

                                                {/*>*/}
                                                {/*  Sửa*/}
                                                {/*</Button>*/}
                                                <Button
                                                    size='sm'
                                                    style={{width:'100%', padding:'2px'}}
                                                    color="success"
                                                    onClick={() => handleUpdateStatus(order.orderId)}
                                                >
                                                    Cập nhật
                                                </Button>
                                                </td>
                                        </tr>
                                    );
                                    })}
                                </tbody>
                            </Table>
                            {/* Pagination */}
                            <div className="pagination" style={{marginBottom : '15px'}}>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AdminProductList;
