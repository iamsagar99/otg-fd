import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserTransactions } from '../../services/transaction.service';
import LoadingSpinner from "../../component/common/loadingspinner.component";
import '../../assets/user-css/history.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [bal, setBal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(7); // Default filter is 7 days

    const navigate = useNavigate();
    // Get localUser
    const localUser = JSON.parse(localStorage.getItem("auth_user"));
    const userId = localUser._id;

    const fetchTransactions = async (days) => {
        try {
            const response = await getUserTransactions(userId);
            const allTransactions = response.result;
            setBal(response.currbal);
            const filteredTransactions = allTransactions.filter(transaction => {
                const transactionDate = new Date(transaction.timeStamp);
                const today = new Date();
                const diffTime = Math.abs(today - transactionDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= days;
            });
            setTransactions(filteredTransactions);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching transactions", error);
            setLoading(false);
        }
    }

    const handleClick = (id) => {
        // Navigate to statement page
        navigate(`/user/statement/${id}`);
    }

    useEffect(() => {
        setLoading(true);
        fetchTransactions(filter);
    }, [filter, userId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="transaction-list-container">
            <div className="balance-section">
                <span className="balance">NPR {bal}</span>
                <span className="balance-label">Balance</span>
            </div>
            <div className="filter-buttons">
                <button className={`filter-button ${filter === 7 ? 'active' : ''}`} onClick={() => setFilter(7)}>7 days</button>
                <button className={`filter-button ${filter === 14 ? 'active' : ''}`} onClick={() => setFilter(14)}>14 days</button>
                <button className={`filter-button ${filter === 30 ? 'active' : ''}`} onClick={() => setFilter(30)}>30 days</button>
            </div>
            <div className="transactions-container">
                {transactions.map((transaction, index) => (
                    <div key={index} className="transaction-item" onClick={() => handleClick(transaction._id)}>
                        <div className="transaction-date">
                            {new Date(transaction.timeStamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="transaction-detail">
                            <div className="transaction-description">
                                {transaction.txnPurpose}
                            </div>
                            <div className="transaction-time">
                                {new Date(transaction.timeStamp).toLocaleTimeString()}
                            </div>
                            <div className={`transaction-amount ${transaction.type === 'sender' ? 'negative' : 'positive'}`}>
                                {transaction.type === 'sender' ? '▼' : '▲'}{Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className={`transaction-status ${transaction.status === 'true' ? 'completed' : transaction.status === 'pending' ? 'pending' : 'failed'}`}>
                                {transaction.status === 'true' ? 'Completed' : transaction.status === 'pending' ? 'Pending' : 'Failed'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransactionHistory;
