import { toast } from "react-toastify";
import API_ENDPOINTS from "../config/api-endpoints"
import { getRequest, postRequest } from "./axios.service"
// import {useNavigate} from "react-router-dom"
export const login = async (data) => {

    try {
        // console.log("usbmitted")
        // console.log(data)
        let login_response = await postRequest(API_ENDPOINTS.LOGIN_URL, data);
        console.log(data,login_response)
        console.log("inp",data)
        if (login_response.status && login_response.result?.access_token) {
            localStorage.setItem("auth_token", login_response.result.access_token)
            let user_info = {
                name: login_response.result.user.name,
                email: login_response.result.user.email,
                _id: login_response.result.user._id,
                dob: login_response.result.user.dob,
                address: login_response.result.user.address,
                phone: login_response.result.user.phoneNumber,
                city: login_response.result.user.city,
                state: login_response.result.user.state,
                zipcode: login_response.result.user.zipcode,
                paymentGateway: login_response.result.user.paymentGateway,
                provider: login_response.result.user.provider?.name ||' ',
                kycVerified: login_response.result.user.kycVerified,
                userType: login_response.result.user.userType,
                currentBalance: login_response.result.user.currentBalance,
                bankAccLinked: login_response.result.user.bankAccLinked,
                accountNumber: login_response.result.user.accountNumber
            }
            localStorage.setItem("auth_user", JSON.stringify(user_info));
            return login_response.result;

        }
        else {
            return login_response;
        }
    } catch (error) {
        toast.error(error)
        console.log("err",error)
        throw error
    }
}

export const getVerified = async () => {

    try {
        let response = await getRequest(API_ENDPOINTS.VERIFY_USER, true)
        if(response.status === 401){
            toast.error("Unauthorized")
        }else if(!response.status){
            toast.error("Session Expired. Please Log in Again");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            window.location.href = "/login"; 
        }
        // debugger;
        // console.log(response)
        return response;
    } catch (error) {
        //TODO: HANDLE ERROR  
        throw error
    }
}
