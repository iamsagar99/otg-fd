import React, { useEffect, useState } from "react";
import "../../assets/user-css/profile.css";
import { getUserById } from "../../services/user.service";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("auth_user"));
    if (!localUser) {
      setUser(null);
    } else {
      const getUserDetailById = async () => {
        const response = await getUserById(localUser._id);
        if (response.status) {
          setUser(response.result);
        } else {
          console.log(response.msg);
        }
      };

      getUserDetailById();
    }
  }, []);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-header">User Profile</h2>
      <div className="profile-container">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        </div>
        <div className="profile-section">
          <h3>Address</h3>
          <p><strong>Street:</strong> {user.address}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Zipcode:</strong> {user.zipcode}</p>
        </div>
        <div className="profile-section">
          <h3>Account Information</h3>
          <p><strong>Account Number:</strong> {user.accountNumber}</p>
          <p><strong>Payment Gateway:</strong> {user.paymentGateway}</p>
          <p><strong>Current Balance:</strong> ${user.currentBalance.toFixed(2)}</p>
          <p><strong>KYC Verified:</strong> {user.kycVerified ? "Yes" : "No"}</p>
          <p><strong>Bank Account Linked:</strong> {user.bankAccLinked ? "Yes" : "No"}</p>
          <p><strong>User Type:</strong> {user.userType}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
