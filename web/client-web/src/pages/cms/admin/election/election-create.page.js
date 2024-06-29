import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createElection } from "../../../../services/election.service";
import { ElectionCreateForm } from "./election-form.component";
// import { position } from "stylis";


const default_value = {
    title: "",
    description: "write description here",
    start_date: "",
    end_date: "",
    voters: [],
    positions: [],
    images: [],
}

const ElectionCreate = () => {
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
            let position = data.positions.map((item) => item.value);
            let voters = data.voters.map((item) => item.value);

            data.positions = position;
            data.voters = voters;

            let response = await createElection(data);
            //console.log("response", response);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/election");
            }
            else {
                toast.error(response.msg)
            }
        } catch (error) {
            if (error.response.data.msg.image) {
                toast.error(error.response.data.msg.image)
            }
            console.log(error)
        }
    }



    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb type="Election" opt="Create" />
                <div className="card mb-4">
                    <div className="card-body">
                        <ElectionCreateForm
                            defaultData={default_value}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ElectionCreate;