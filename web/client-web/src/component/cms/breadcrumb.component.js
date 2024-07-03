import { NavLink } from "react-router-dom";
import '../../assets/user-css/breadcrumb.css'; // Import the custom CSS file

export const AdminBreadCrumb = ({ createUrl, type, opt }) => {
    return (
        <>
            <h1 className="admin-breadcrumb-title">
                {type} {opt}
                {createUrl && (
                    <NavLink to={createUrl} className="admin-breadcrumb-button">
                        <i className="fas fa-plus admin-breadcrumb-icon"></i>
                        Add {type}
                    </NavLink>
                )}
            </h1>
            <ol className="admin-breadcrumb-list">
                <li className="admin-breadcrumb-item">
                    <NavLink to="/admin" className="admin-breadcrumb-link">Dashboard</NavLink>
                </li>
                <li className="admin-breadcrumb-item">{type} {opt}</li>
            </ol>
        </>
    );
};
