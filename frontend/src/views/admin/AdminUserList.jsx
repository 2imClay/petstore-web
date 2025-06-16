import React, { useEffect, useState } from "react";
import axios from "../../api/axiosAdmin";

import {
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    Button,
} from "reactstrap";

import AdminHeader from "../../components/Headers/AdminListHeader.jsx";
import {toast} from "react-toastify";

const AdminUserList = () => {

    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get("/roles");
                setRoles(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy role:", err);
            }
        };

        fetchRoles();
    }, []);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/users");
                setUsers(response.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách người dùng:", err);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá người dùng này?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/users/delete/${id}`);
            toast.success("Đã xoá người dùng!");

            // Cập nhật danh sách hiển thị bằng cách xoá sản phẩm khỏi state
            setUsers((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Lỗi khi xoá người dùng:", err);
            toast.error("Lỗi khi xoá người dùng!");
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
                                <h3 className="mb-0">Danh sách sản phẩm</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Họ tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <th scope="row">
                                            <Media className="align-items-center">
                                                <a
                                                    className="avatar rounded-circle mr-3"
                                                    href=" "
                                                >
                                                    <img
                                                        alt="..."
                                                        src={
                                                            // product.images && product.images.length > 0
                                                            //     ? `http://localhost:8080/uploads/${product.images[0].image}`
                                                            //     :
                                                                require("../../assets/images/offer-banner-1.jpg")
                                                        }
                                                        className="avatar rounded-circle mr-3"
                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    />
                                                </a>
                                                <Media>
                          <span className="mb-0 text-sm">
                            {user.fullname}
                          </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role?.roleName}</td>
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
                                                style={{width:'40%', padding:'2px'}}
                                                color="danger"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AdminUserList;
