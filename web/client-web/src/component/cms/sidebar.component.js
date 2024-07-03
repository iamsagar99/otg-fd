import { NavLink } from "react-router-dom";
import '../../assets/user-css/adminsidebar.css'; // Import the custom CSS file

export const AdminSidebarComponent = () => {
    const localUser = JSON.parse(localStorage.getItem("auth_user")) || {};

    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sidenav" id="sidenavAccordion">
                    <div className="sidenav-menu">
                        <div className="nav">
                            <div className="sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="/admin">
                                <div className="nav-link-icon">
                                    <i className="fas fa-tachometer-alt"></i>
                                </div>
                                Dashboard
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/user">
                                <div className="nav-link-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                Users
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/transaction">
                                <div className="nav-link-icon">
                                    <i className="fas fa-vote-yea"></i>
                                </div>
                                Transactions
                            </NavLink>
                        </div>
                    </div>
                    <div className="sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {localUser.name}
                    </div>
                </nav>
            </div>
        </>
    );
}
