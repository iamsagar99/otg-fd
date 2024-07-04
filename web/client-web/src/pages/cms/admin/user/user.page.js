import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect, useState, useCallback } from "react";
import { deleteUserById, getUserByRole } from "../../../../services/user.service";
import { toast } from "react-toastify";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import './UserPage.css'; // Import custom CSS for styling

const UserPage = () => {
    const deleteUser = async (id) => {
        try {
            let response = await deleteUserById(id);
            if (response.status) {
                toast.success(response.msg);
                getAllUsers();
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log("delete", err);
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Account Number',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'User Type',
            selector: row => row.userType,
            sortable: true,
        },
        {
            name: 'Current Balance',
            selector: row => `$${row.currentBalance}`,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => <ActionButtons id={row._id} onDeleteClick={deleteUser} updatePath={`/admin/user/${row._id}`} />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getAllUsers = useCallback(async () => {
        try {
            let response = await getUserByRole('all');
            if (response.status) {
                let logged_in_user = JSON.parse(localStorage.getItem("auth_user"));
                let all_users = response.result.filter((item) => item._id !== logged_in_user._id);
                setData(all_users);
            } else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }, []);

    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb createUrl={"/admin/user/create"} type={"User"} opt={"Listing"} />
                <Row>
                    <Col sm={12}>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default UserPage;
