import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/user.service';
import "../../assets/user-css/register.css";
import { getAllProviders } from '../../services/facts.service.js';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [paymentGateway, setPaymentGateway] = useState("MobileBanking");
    const [providers, setProviders] = useState([]);
    const customerTypes = ["Customer", "Agent", "Merchant"];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, "Password must be at least 8 characters long").required('Password is required'),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
        dob: Yup.date().max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'You must be at least 18 years old').required('Date of Birth is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipcode: Yup.string().required('Zipcode is required'),
        paymentGateway: Yup.string().required('Payment Gateway is required'),
        provider: Yup.string().required('Provider is required'),
        customerType: Yup.string().required('Customer Type is required'),
    });

    const fetchProviders = async () => {
        const response = await getAllProviders(paymentGateway);
        if (response.result) {
            setProviders(response.result);
        } else {
            toast.error(response.msg || "Failed to fetch providers");
        }
    };

    useEffect(() => {
        if (paymentGateway) {
            fetchProviders();
        }
    }, [paymentGateway]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            dob: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            paymentGateway: '',
            provider: '',
            customerType: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createUser(values);
                if (response.result) {
                    toast.success("Registration successful!");
                    setRegistrationSuccess(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                } else {
                    toast.error(response.msg || "Registration failed. Please try again later.");
                }
            } catch (error) {
                console.error("Registration error:", error);
                toast.error("Registration failed. Please try again later.");
            }
        },
    });

    const paymentGatewayOptions = ["Wallet", "MobileBanking", "InternetBanking"];

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Signup</h2>
                <form onSubmit={formik.handleSubmit} className="register-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={formik.errors.name ? 'input-error' : ''}
                            />
                            {formik.errors.name && <div className="error">{formik.errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={formik.errors.email ? 'input-error' : ''}
                            />
                            {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className={formik.errors.password ? 'input-error' : ''}
                            />
                            {formik.errors.password && <div className="error">{formik.errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                className={formik.errors.phoneNumber ? 'input-error' : ''}
                            />
                            {formik.errors.phoneNumber && <div className="error">{formik.errors.phoneNumber}</div>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                className={formik.errors.dob ? 'input-error' : ''}
                            />
                            {formik.errors.dob && <div className="error">{formik.errors.dob}</div>}
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                className={formik.errors.address ? 'input-error' : ''}
                            />
                            {formik.errors.address && <div className="error">{formik.errors.address}</div>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                className={formik.errors.city ? 'input-error' : ''}
                            />
                            {formik.errors.city && <div className="error">{formik.errors.city}</div>}
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                className={formik.errors.state ? 'input-error' : ''}
                            />
                            {formik.errors.state && <div className="error">{formik.errors.state}</div>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                className={formik.errors.zipcode ? 'input-error' : ''}
                            />
                            {formik.errors.zipcode && <div className="error">{formik.errors.zipcode}</div>}
                        </div>
                        <div className="form-group">
                            <label>Customer Type</label>
                            <select
                                name="customerType"
                                value={formik.values.customerType}
                                onChange={formik.handleChange}
                                className={formik.errors.customerType ? 'input-error' : ''}
                            >
                                <option value="">Select Customer Type</option>
                                {customerTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {formik.errors.customerType && <div className="error">{formik.errors.customerType}</div>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Payment Gateway</label>
                            <select
                                name="paymentGateway"
                                value={formik.values.paymentGateway}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setPaymentGateway(e.target.value);
                                }}
                                className={formik.errors.paymentGateway ? 'input-error' : ''}
                            >
                                <option value="">Select Payment Gateway</option>
                                {paymentGatewayOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            {formik.errors.paymentGateway && <div className="error">{formik.errors.paymentGateway}</div>}
                        </div>
                        <div className="form-group">
                            <label>Provider</label>
                            <select
                                name="provider"
                                value={formik.values.provider}
                                onChange={formik.handleChange}
                                className={formik.errors.provider ? 'input-error' : ''}
                            >
                                <option value="">Select Provider</option>
                                {providers.map((provider) => (
                                    <option key={provider.id} value={provider._id}>{provider.name}</option>
                                ))}
                            </select>
                            {formik.errors.provider && <div className="error">{formik.errors.provider}</div>}
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
