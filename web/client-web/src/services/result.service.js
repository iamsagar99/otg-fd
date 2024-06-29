import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest } from "./axios.service";

export const calculateElectionResult = async (id) => {

    try {
        // console.log(API_ENDPOINTS.Election+'/calculate-result/'+ id)
        let result  = await getRequest(API_ENDPOINTS.Election+'/calculate-result/'+ id,true);
       
        return result;
    } catch (error) {
        throw error.response.data.msg
    }
}

export const getAllResult = async () => {
    try {
        let result = await getRequest(API_ENDPOINTS.Election + "/result", true);
        return result;
    } catch (error) {
        throw error
    }
}

export const getResultByEid = async (id) => {
    try {
        let result = await getRequest(API_ENDPOINTS.Election + "/result/" + id, true)
        return result;
    } catch (error) {
        throw error
    }
}
