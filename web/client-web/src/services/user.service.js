import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";

export const createUser = async (data) => {
    try {
        const response = await postRequest(API_ENDPOINTS.REGISTER_URL, data, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserByRole = async (role) =>{
    try {
        let result = await getRequest(API_ENDPOINTS.USER,true);
        return result;
    } catch (error) {
        throw error
    }
}

export const deleteUserById = async (id)=>{
    try {
        let result = await deleteRequest(API_ENDPOINTS.USER+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const UpdateUser = async (data,id) =>{
    try{
        let response = await putRequest(API_ENDPOINTS.USER+"/"+id,data,true);
        //console.log("resp",response)
        return response;
    }catch(error){
        throw error;
    }
}
export const getUserById = async (id)=>{
    try {
        let result = await getRequest(API_ENDPOINTS.USER+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const getUserAll = async ()=>{
    try {
        let result = await getRequest(API_ENDPOINTS.USER,true)
        return result;
    } catch (error) {
        throw error
    }
}