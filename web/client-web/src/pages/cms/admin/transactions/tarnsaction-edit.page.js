import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import {
  getStatementById,
  updateTransaction,
} from "../../../../services/transaction.service";
import { useCallback, useEffect, useState } from "react";
import "./TransactionEdit.css"; // Import custom CSS for styling

const default_value = {
  accountNumber: "",
  loginId: "",
  sessionLen: "",
  txnPurpose: "",
  timeStamp: "",
  receiverAccNo: "",
  amount: "",
  status: "",
  isFlagged: false,
};

const TransactionEdit = () => {
  const params = useParams();
  const [data, setData] = useState(default_value);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
        let id = params.id;
        console.log("pramaid",id)
      let response = await updateTransaction(data, id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/transaction");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionDetail = useCallback(async () => {
    try {
      let id = params.id;
      let result = await getStatementById(id);
      if (result.status) {
        const transaction = result.result;
        setData({
          accountNumber: transaction.accountNumber._id,
          loginId: transaction.loginId,
          sessionLen: transaction.sessionLen,
          txnPurpose: transaction.txnPurpose,
          timeStamp: transaction.timeStamp,
          receiverAccNo: transaction.receiverAccNo._id,
          amount: transaction.amount,
          status: transaction.status,
          isFlagged: transaction.isFlagged,
        });
      }
    } catch (err) {
      console.log("fetch error", err);
    }
  }, [params.id]);

  useEffect(() => {
    getTransactionDetail();
  }, [getTransactionDetail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(data);
  };

  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb type="Transaction" opt="Edit" />
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={data.accountNumber}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginId">Login ID</label>
                <input
                  type="text"
                  id="loginId"
                  name="loginId"
                  value={data.loginId}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="sessionLen">Session Length</label>
                <input
                  type="number"
                  id="sessionLen"
                  name="sessionLen"
                  value={data.sessionLen}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="txnPurpose">Transaction Purpose</label>
                <input
                  type="text"
                  id="txnPurpose"
                  name="txnPurpose"
                  value={data.txnPurpose}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeStamp">Time Stamp</label>
                <input
                  type="datetime-local"
                  id="timeStamp"
                  name="timeStamp"
                  value={
                    data.timeStamp
                      ? new Date(data.timeStamp).toISOString().slice(0, 16)
                      : "" // Provide an empty string if data.timeStamp is invalid or missing
                  }
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="receiverAccNo">Receiver Account Number</label>
                <input
                  type="text"
                  id="receiverAccNo"
                  name="receiverAccNo"
                  value={data.receiverAccNo}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="true">True</option>
                  <option value="Pending">Pending</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  id="isFlagged"
                  name="isFlagged"
                  checked={data.isFlagged}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="isFlagged" className="form-check-label">
                  Is Flagged
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionEdit;
