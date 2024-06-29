import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest, putRequest, deleteRequest } from "./axios.service";


export const createElection = async (data) => {
    //console.log("createElection:", data);
    try {
        let form_data = new FormData();
        
        if (data.images) {
            data.images.map((item,) => (

                form_data.append("images", item, item.name)
            ))
            delete data.image;
        }

        Object.keys(data).map((item) => {
            form_data.append(item, data[item]);
            return null;
        })
        // console.log("finalform-data", form_data);
        // debugger;
        let response = await postRequest(API_ENDPOINTS.Election+'/add', form_data, true, true);
        return response;
    } catch (error) {
        throw error;
    }
}
export const getElectionById = async (id) => {
    //  console.log("get prodict by id_",id);
    try {
        let result = await getRequest(API_ENDPOINTS.Election + "/" + id, true);
        return result;
    } catch (error) {
        throw error
    }
}
export const updateElection = async (data, id) => {

    try {
        let form_data = new FormData();

        if (data.image) {
            data.image.forEach((item) => {
                if (typeof (item) === "object") {
                    //console.log("coming obje:", item)
                    form_data.append("image", item, item.name)
                }
            })
            delete data.image;
            delete data.images;
        }
        if (data.brand) {
            if (typeof (data.brand) === "object") {
                data.brand = data.brand.value
            }
        }
        // console.log("updateElection-data-id",data,id);
        Object.keys(data).map((item) => {
            form_data.append(item, data[item]);
            return null;
        })

        let response = await putRequest(API_ENDPOINTS.Election + "/" + id, form_data, true, true);
        return response;
    } catch (error) {
        throw error;
    }
}
export const deleteElectionById = async (id) => {
    //  console.log("delete-category-by-id",id);
    try {
        let result = await deleteRequest(API_ENDPOINTS.Election + "/deletebyid/" + id, true)
        return result;
    } catch (error) {
        throw error
    }

}
export const getElection = async (getby) => {
    try {
        let result = await getRequest(API_ENDPOINTS.Election + '/' + getby, true);
        return result;
    } catch (error) {
        throw error
    }
}


export const getElectionBySlug = async (slug) => {
    //  //console.log("get prodict by id_",id);
    try {
        let result = await getRequest(API_ENDPOINTS.Election + "/get-slug/" + slug, true);
        //console.log("result", result);
        return result;
    } catch (error) {
        throw error
    }
}
