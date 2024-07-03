import API_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest, deleteRequest, putRequest } from "./axios.service";

export const addTransaction= async (data) => {

    try {
        let sendData = {};
        sendData.authValue = data.authValue;
        sendData.txnPurpose = data.remarks;
        sendData.receiverAccNo = data.receiverAccountNumber;
        sendData.amount = data.amount;

        let result = await postRequest(API_ENDPOINTS.TXN+'/add', sendData,true);
        return result;
    } catch (error) {
        throw error.response.data.msg
    }
}

export const getStatementById = async(id)=>{
    try{
        const response = await getRequest(API_ENDPOINTS.TXN+'/fetchtxn/'+id,true);
        return response;
    }catch(err){
        throw err
    }
}

export const getUserTransactions = async(id)=>{
    try{
        const response = await getRequest(API_ENDPOINTS.TXN+'/getusertxn/'+id,true);
        return response;
    }catch(err){
        throw err
    }
}

export const getAllTxn = async()=>{
    try{
        const response = await getRequest(API_ENDPOINTS.TXN+'/all',true);
        return response;
    }catch(err){
        throw err
    }
}

export const updateTransaction = async(data,id)=>{
    try{
        const response = await putRequest(API_ENDPOINTS.TXN+'/update/'+id,data,true);
        return response;
    }catch(err){
        throw err
    }
}