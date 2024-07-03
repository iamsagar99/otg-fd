import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminPages from "../pages/cms/admin";
import { Front } from "../pages/front";
// import AdminLayout from "../pages/layout/admin.layout";
import HomeLayout from "../pages/layout/home.layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Outlet } from "react-router-dom";


const AdminPrivateRoute = () => {
    let localUser = JSON.parse(localStorage.getItem('auth_user'));

    if (!localUser) {
        return <Navigate to="/login" />;
    } else {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            localStorage.removeItem("auth_user");
            return <Navigate to="/login" />;
        } else {
            return <HomeLayout />;
        }
    }
};




const RoutingComponent = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer autoClose={2000} />
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Front.HomePage />} />
                        <Route path="login" element={<Front.LoginPage />} />
                        <Route path="register" element={<Front.RegisterPage />} />
                        <Route path="contact" element={<Front.ContactPage />} />
                        <Route path="*" element={<Front.ErrorPage />} />
                    </Route>
                    <Route path="/user" element={<AdminPrivateRoute />}>
                        <Route path="profile" element={<Front.ProfilePage />} />
                        <Route path="sendmoney" element={<Front.SendMoneyPage />} />
                        <Route path="statement/:id" element={<Front.TransactionDetails />} />
                        <Route path="transaction-history" element={<Front.TransactionHistory />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default RoutingComponent;