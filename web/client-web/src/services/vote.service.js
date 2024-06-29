import API_ENDPOINTS from "../config/api-endpoints";
import CryptoJS from "crypto-js";
import {  postRequest } from "./axios.service";
import { toast } from "react-toastify";


export const convertToFrontendFormat =(data)=> {
    
    const votes = [];
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key) && key !== 'election_id' && key !== 'user_id') {
            const position = key;
            const candidate_id = data[key];
            votes.push({ position, candidate_id });
        }
    }
    return {
        votes,
        election_id: data.election_id,
        user: data.user_id
    };
}


export const addVote = async (data) => {

    try {

        let value = convertToFrontendFormat(data);
        let jsonString = JSON.stringify(value);
        var encryptedData = CryptoJS.AES.encrypt(jsonString, process.env.REACT_APP_AES_SECRET).toString();
        let obj = {
            cipher: encryptedData
        }
        let result = await postRequest(API_ENDPOINTS.VOTE+'/checkenc',obj,true);
        return result
    } catch (error) {
        toast.error(error.response.data.msg)
        throw error.response.data.msg

    }
}
