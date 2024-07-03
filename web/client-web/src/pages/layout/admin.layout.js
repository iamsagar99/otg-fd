import { Outlet } from "react-router-dom";
import AdminComponent from "../../component/cms";
import "react-toastify/dist/ReactToastify.css";
import './AdminLayout.css'; // Import the custom CSS file

const AdminLayout = () => {
    return (
        <>
            <AdminComponent.TopNavComponent />
            <div id="layoutSidenav">
                <AdminComponent.AdminSidebarComponent />
                <div id="layoutSidenav_content">
                    <main>
                        <Outlet />
                    </main>
                    {/* <AdminComponent.AdminFooterComponent /> */}
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
