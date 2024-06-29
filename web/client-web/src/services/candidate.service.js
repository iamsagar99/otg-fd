import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest, deleteRequest } from "./axios.service";

export const createCandidate = async (data) => {

    try {
        let result = await postRequest(API_ENDPOINTS.CANDIDATE+'/add', data,true);
        return result;
    } catch (error) {
        throw error.response.data.msg
    }
}

export const getAllCandidate = async () => {
    try {
        let result = await getRequest(API_ENDPOINTS.CANDIDATE + "/get", true);
        return result;
    } catch (error) {
        throw error
    }
}

export const deleteCandidateById = async (id) => {
    try {
        let result = await deleteRequest(API_ENDPOINTS.CANDIDATE + "/delete/" + id, true)
        return result;
    } catch (error) {
        throw error
    }
}

export const getCandidateByElectionSlug  = async(slug)=>{
    try {
        let result = await getRequest(API_ENDPOINTS.CANDIDATE + "/get-by-election/"+slug, true);
        return result;
    } catch (error) {
        throw error
    }
}

export const getCandidateBySlug = async(slug)=>{
    try {
        let result = await getRequest(API_ENDPOINTS.CANDIDATE + "/get-slug/"+slug, true);
        //console.log("res",result)
        return result;
    } catch (error) {
        throw error
    }
}