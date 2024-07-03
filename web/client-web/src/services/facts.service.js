import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest, deleteRequest } from "./axios.service";

export const calcFacts= async () => {
    try {

        let result = await getRequest(API_ENDPOINTS.FACTS+'/add',true);
        return result;
    } catch (error) {
        throw error.response.data.msg
    }
}
