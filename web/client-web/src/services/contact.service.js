import { toast } from "react-toastify";
import API_ENDPOINTS from "../config/api-endpoints"
import { getRequest, postRequest } from "./axios.service"


export const contactSubmit = async (data) => {
    const serviceId= process.env.REACT_APP_CONTACT_SERVICE_ID;
    const templateId=process.env.REACT_APP_CONTACT_TEMPLATE_ID;
    const publickey=process.env.REACT_APP_CONTACT_PUBLIC_KEY;

    try {
        
        

       
    } catch (error) {
        toast.error(error)
        //console.log("err",error)
        throw error
    }
}
