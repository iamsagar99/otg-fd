import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";

export const createUser = async (data) =>{
    try{
        let form_data = new FormData();
        //console.log("crt",data)
        if(data.image){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
        
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
        //console.log(form_data)
        let response = await postRequest(API_ENDPOINTS.REGISTER_URL,form_data,true,true);
        //console.log("resp",response)
        return response;
    }catch(error){
        throw error;
    }
}

export const getUserByRole = async (role) =>{
    try {
        let result = await getRequest(API_ENDPOINTS.USER+"?role="+role,true);
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
        let form_data = new FormData();

        if(data.image && typeof(data.image)==='object'){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
        else{
            delete data.image
        }
    
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
    
        let response = await putRequest(API_ENDPOINTS.USER+"/"+id,form_data,true,true);
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