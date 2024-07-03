import React, { useEffect, useState } from "react";
import "../../assets/user-css/statement.css";
import { useNavigate, useParams } from "react-router-dom";
import { getStatementById } from "../../services/transaction.service";
import LoadingSpinner from "../../component/common/loadingspinner.component";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const statementId = params.id;

  const navigate = useNavigate();


  const getStatementDetail = async () => {
    try {
      const response = await getStatementById(statementId);
      const date = new Date(response.result.timeStamp);

      // Options for formatting the date
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };

      // Convert to displayable date string
      response.result.date = date.toLocaleDateString("en-US", options);
      setTransaction(response.result);
      console.log(response.result);
      setLoading(false);
    } catch (error) {
      console.error("Error in getting statement detail", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatementDetail();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!transaction) {
    return <div>No transaction details available</div>;
  }

  return (
    <div className="transaction-details">
      <div className="balance-section">
        <span className="balance">NPR {transaction.amount}</span>
        <span className="balance-label">Balance</span>
      </div>
      <div className="transaction-info">
        <div className="transaction-header">
          {/* <img src="path_to_logo.png" alt="Bank Logo" className="bank-logo" /> */}
          <div className="transaction-summary">
            <span className="transaction-title">Transaction Statement</span>
            <span className="transaction-time">
              {transaction.date}
            </span>
          </div>
        </div>
        <div
          className={`transaction-status ${
            transaction.status === "true" ? "complete" : "incomplete"
          }`}
        >
          {transaction.status === "true" ? "COMPLETE" : "INCOMPLETE"}
        </div>
        <div className="transaction-details-section">
          <div className="transaction-detail">
            <span className="detail-label">Amount (NPR):</span>
            <span className="detail-value">{transaction.amount}</span>
          </div>
          <div className="transaction-detail">
            <span className="detail-label">Send By:</span>
            <span className="detail-value">{transaction.accountNumber.name}</span>
          </div>
          
          <div className="transaction-detail">
          <span className="detail-label pgsvc">Payment Gateway:</span>
          <span className="detail-value">{transaction.accountNumber.paymentGateway}</span>
          </div>
          <div className="transaction-detail">
          <span className="detail-label pgsvc">Service Provider:</span>
          <span className="detail-value">{transaction.accountNumber.provider.name}</span>
          </div>

          <div className="transaction-detail">
            <span className="detail-label">Send To:</span>
            <span className="detail-value">{transaction.receiverAccNo.name}</span>
          </div>
          <div className="transaction-detail">
            <span className="detail-label pgsvc">Payment Gateway:</span>
            <span className="detail-value">{transaction.receiverAccNo.paymentGateway}</span>
          </div>
          <div className="transaction-detail">
            <span className="detail-label pgsvc">Service Provider:</span>
            <span className="detail-value">{transaction.receiverAccNo.provider.name}</span>
          </div>
          <div className="transaction-detail">
            <span className="detail-label">Remarks:</span>
            <span className="detail-value">{transaction.txnPurpose}</span>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button className="done-button" onClick={()=>navigate('/')}>DONE</button>
        <button className="raise-issue-button">RAISE ISSUE</button>
      </div>
    </div>
  );
};

export default TransactionDetails;
