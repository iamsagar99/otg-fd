import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getUserById, UpdateUser } from "../../../../services/user.service";
import { UserForm } from "./user-form.component";
import { useCallback, useEffect, useState } from "react";
import './UserEdit.css'; // Import custom CSS for styling

const default_value = {
    name: "",
    email: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: "",
    accountNumber: "",
    paymentGateway: "",
    kycVerified: false,
    bankAccLinked: false,
    userType: "",
    currentBalance: 0,
    status: ""
};

const UserEdit = () => {
    const params = useParams();
    const [data, setData] = useState(default_value);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            let response = await UpdateUser(data, params.id);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/user");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserDetail = useCallback(async () => {
        try {
            let id = params.id;
            let result = await getUserById(id);
            if (result.status) {
                setData(result.result);
            }
        } catch (err) {
            console.log("fetch error", err);
        }
    }, [params.id]);

    useEffect(() => {
        getUserDetail();
    }, [getUserDetail]);

    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb type="User" opt="Edit" />
                <div className="card mb-4">
                    <div className="card-body">
                        <UserForm
                            defaultData={data}
                            handleSubmit={handleSubmit}
                            edit={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserEdit;
