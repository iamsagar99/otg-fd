import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminPages from "../pages/cms/admin";
import { Front } from "../pages/front";
// import AdminLayout from "../pages/layout/admin.layout";
import HomeLayout from "../pages/layout/home.layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const RoutingComponent = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer autoClose={2000} />
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Front.HomePage />} />
                        <Route path="login" element={<Front.LoginPage />}></Route>
                        <Route path="register" element={<Front.RegisterPage />}></Route>
                        <Route path="profile" element={<Front.ProfilePage />}></Route>
                        <Route path="sendmoney" element={<Front.SendMoneyPage />}></Route>
                        <Route path="contact" element={<Front.ContactPage />}></Route>
                        <Route path="user" element={<Front.ProfilePage/>}></Route>
                        <Route path="*" element={<Front.ErrorPage />}></Route>
                    </Route>
                    {/* <Route path="/admin" element={<AdminPrivateRoute component={<AdminLayout />} />}>
                        <Route index element={<AdminPages.AdminDashBoard />} />


                        <Route path ="user" element={<AdminPages.UserPage/>}/>
                        <Route path="user/create" element={<AdminPages.UserCreate/>}/>
                        <Route path="user/:id" element={<AdminPages.UserEdit/>}/>

                        <Route path="election" element={<AdminPages.ElectionPage/>}/>
                        <Route path="election/create" element={<AdminPages.ElectionCreate/>}/>

                        <Route path="candidates" element={<AdminPages.CandidatePage/>}/>
                        <Route path="candidate/create" element={<AdminPages.CandidateCreate/>}/>

                        <Route path="result" element={<AdminPages.ResultPage/>}/>
                        <Route path="vote/add" element={<AdminPages.VotingPage/>}/>
                        <Route path="*" element={<Front.ErrorPage />}></Route>

                    </Route> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default RoutingComponent;
