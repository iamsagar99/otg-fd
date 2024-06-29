import { NavLink } from "react-router-dom";

const AdminDashBoard = () =>{
    return(
        <>
            <div className="container-fluid px-4">
    <h1 className="mt-4">Admin Dashboard</h1>
    <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Dashboard</li>
    </ol>
    <div className="row">
        <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
                <div className="card-body">Manage Users</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <NavLink className="small text-white stretched-link" to="/admin/user">View Details</NavLink>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
                <div className="card-body">Manage Elections</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <NavLink className="small text-white stretched-link" to="/admin/elections">View Details</NavLink>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
                <div className="card-body">Manage Candidates</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <NavLink className="small text-white stretched-link" to="/admin/candidates">View Details</NavLink>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
                <div className="card-body">Manage Results</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <NavLink className="small text-white stretched-link" to="/admin/result">View Details</NavLink>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
    <div className="card mb-4">
        <div className="card-body">
            {/* Additional content goes here */}
        </div>
    </div>
</div>

        </>
    )
}
export default AdminDashBoard;