import { NavLink, useNavigate } from "react-router-dom";
import '../../assets/user-css/topnav.css'; // Import the custom CSS file


export const TopNavComponent = () => {
    const navigate = useNavigate();
    const localUser = JSON.parse(localStorage.getItem('auth_user')) ?? null;

    const toggleSidebar = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    return (
        <>
            <nav className="topnav">
                <button onClick={toggleSidebar} className="sidebar-toggle">
                    <i className="fas fa-bars"></i>
                </button>
                <NavLink className="navbar-brand" to={"/" + localUser.userType}>Admin Panel</NavLink>
                <div className="navbar-right">
                    <NavLink className="logout-button" to="/login" onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("auth_user");
                        navigate("/login");
                    }}>
                        Logout
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
