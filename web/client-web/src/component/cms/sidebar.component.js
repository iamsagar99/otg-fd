import { NavLink } from "react-router-dom";



export const AdminSidebarComponent = () => {
    const localUser = JSON.parse(localStorage.getItem("auth_user")) || {};

    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="/admin">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-grid-horizontal"></i>
                                </div>
                                Dashboard
                            </NavLink>
                            {/* banner */}
                            <NavLink className="nav-link" to="/admin/user">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-user-group"></i>
                                </div>
                                Users
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/election">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-images"></i>
                                </div>
                                Election
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/candidates">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-images"></i>
                                </div>
                                Candidates
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/result">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-images"></i>
                                </div>
                                Result
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/vote/add">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-hand"></i>
                                </div>
                                Result
                            </NavLink>

                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {
                            localUser.name
                        }
                    </div>
                </nav>
            </div>
        </>
    )
}