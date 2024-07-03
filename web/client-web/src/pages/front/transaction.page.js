import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/user-css/transaction.css";
import {getUserById} from "../../services/user.service"
import { addTransaction } from "../../services/transaction.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SendMoneyPage = () => {
  const [authMethod, setAuthMethod] = useState("pin");
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    receiverAccountNumber: Yup.string().required("Receiver Account Number is required"),
    amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
    remarks: Yup.string().required("Remarks are required"),
    authValue: Yup.string().required("Authentication is required"),
  });

  const formik = useFormik({
    initialValues: {
      receiverAccountNumber: "",
      amount: "",
      remarks: "",
      authValue: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values", values);
        //addTransaction
        try{
          const response = await addTransaction(values);
            if(response.status){
              toast.success(response.msg)
              navigate(`/user/statement/${response.result._id}`)
            }else{
              toast.error(response.msg)
              
            }
        }catch(err){
          console.log(err)
        }
    },
  });

  const handleAuthMethodChange = (event) => {
    setAuthMethod(event.target.value);
    formik.setFieldValue("authValue", "");
  };


  return (
    <div className="send-money-page">
      <div className="send-money-container">
        <h2 className="send-money-header">Send Money</h2>
        <form onSubmit={formik.handleSubmit} className="send-money-form">
          <div className="form-group-sendmoney">
            <label>Receiver Account Number</label>
            <input
              type="text"
              name="receiverAccountNumber"
              placeholder="Enter Receiver Account Number"
              value={formik.values.receiverAccountNumber}
              onChange={formik.handleChange}
              className={formik.errors.receiverAccountNumber ? "input-error" : ""}
            />
            {formik.errors.receiverAccountNumber && (
              <div className="error">{formik.errors.receiverAccountNumber}</div>
            )}
          </div>
          <div className="form-group-sendmoney">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              className={formik.errors.amount ? "input-error" : ""}
            />
            {formik.errors.amount && (
              <div className="error">{formik.errors.amount}</div>
            )}
          </div>
          <div className="form-group-sendmoney">
            <label>Remarks</label>
            <select
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              className={formik.errors.remarks ? "input-error" : ""}
            >
              <option value="">Select Remark</option>
              <option value="Family Expenses">Family Expenses</option>
              <option value="Commission">Commission</option>
              <option value="Educational Expenses">Educational Expenses</option>
              <option value="EMI payment">EMI payment</option>
              <option value="Loan or interest payment">Loan or interest payment</option>
              <option value="Rent">Rent</option>
              <option value="Repair and Maintenance">Repair and Maintenance</option>
              <option value="Savings">Savings</option>
              <option value="Travel and Tour">Travel and Tour</option>
              <option value="Bill Sharing">Bill Sharing</option>
              <option value="Personal Use">Personal Use</option>
              <option value="Other">Other</option>
            </select>
            {formik.errors.remarks && (
              <div className="error">{formik.errors.remarks}</div>
            )}
          </div>
          <div className="form-group-sendmoney">
            <label>Authentication Method</label>
            <select
              name="authMethod"
              value={authMethod}
              onChange={handleAuthMethodChange}
            >
              <option value="fingerprint">Fingerprint</option>
              <option value="faceid">Face ID</option>
              <option value="otp">OTP</option>
              <option value="password">Password</option>
              <option value="pin">PIN</option>
            </select>
          </div>
          <div className="form-group-sendmoney">
            <label>
              {authMethod === "pin" && "PIN"}
              {authMethod === "otp" && "OTP"}
              {authMethod === "password" && "Password"}
              {authMethod === "fingerprint" && "Fingerprint Code"}
              {authMethod === "faceid" && "Face ID Code"}
            </label>
            <input
              type={authMethod === "pin" || authMethod === "otp" ? "password" : "text"}
              name="authValue"
              placeholder={`Enter ${authMethod}`}
              value={formik.values.authValue}
              onChange={formik.handleChange}
              className={formik.errors.authValue ? "input-error" : ""}
            />
            {formik.errors.authValue && (
              <div className="error">{formik.errors.authValue}</div>
            )}
          </div>
          <button type="submit" className="submit-button">Send Money</button>
        </form>
      </div>
    </div>
  );
};

export default SendMoneyPage;
