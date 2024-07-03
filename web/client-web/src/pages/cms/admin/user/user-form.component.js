import React, { useState, useEffect } from "react";
import './UserForm.css';

export const UserForm = ({ defaultData, handleSubmit, edit }) => {
    const [formData, setFormData] = useState(defaultData);

    useEffect(() => {
        setFormData(defaultData);
    }, [defaultData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="paymentGateway">Payment Gateway</label>
                <input
                    type="text"
                    id="paymentGateway"
                    name="paymentGateway"
                    value={formData.paymentGateway}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    id="kycVerified"
                    name="kycVerified"
                    checked={formData.kycVerified}
                    onChange={(e) =>
                        setFormData({ ...formData, kycVerified: e.target.checked })
                    }
                    className="form-check-input"
                />
                <label htmlFor="kycVerified" className="form-check-label">KYC Verified</label>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    id="bankAccLinked"
                    name="bankAccLinked"
                    checked={formData.bankAccLinked}
                    onChange={(e) =>
                        setFormData({ ...formData, bankAccLinked: e.target.checked })
                    }
                    className="form-check-input"
                />
                <label htmlFor="bankAccLinked" className="form-check-label">Bank Account Linked</label>
            </div>
            <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <input
                    type="text"
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="currentBalance">Current Balance</label>
                <input
                    type="number"
                    id="currentBalance"
                    name="currentBalance"
                    value={formData.currentBalance}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                {edit ? "Update" : "Create"}
            </button>
        </form>
    );
};
