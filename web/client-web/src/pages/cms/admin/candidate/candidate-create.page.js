import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createCandidate } from "../../../../services/candidate.service";
import { CandidateForm } from "./candidate-form.component"; // Assuming your candidate form component is named CandidateForm

const default_value = {
    candidate: "",
    organization: "",
    election_id: "",
    position: "",
    manifesto: "write manifesto here",
};

const CandidateCreate = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            let response = await createCandidate(data);
            //console.log("response", response);
            if (response.status) {
                toast.success(response.msg);
                navigate("/admin/candidates");
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("Error creating candidate:", error);
            if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error("Failed to create candidate.");
            }
        }
    };

    return (
        <>
            <div className="container-fluid px-4">
                <AdminBreadCrumb type="Candidate" opt="Create" />
                <div className="card mb-4">
                    <div className="card-body">
                        <CandidateForm defaultData={default_value} handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CandidateCreate;
