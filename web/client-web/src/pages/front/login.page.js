import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../services/auth.service";
import "../../assets/user-css/login.css";
import { useState, useEffect } from "react";
import {
  getDeviceAndOSInfo,
  getUserLocation,
} from "../../services/spec.service";

const LoginPage = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState("pin");
  const [loc, setLoc] = useState({});
  const defaultData = {
    email: "",
    auth_used: authMethod,
    authValue: "",
  };

  const handleAuthMethodChange = (event) => {
    const newAuthMethod = event.target.value;
    console.log('Changing auth method to:', newAuthMethod);
    setAuthMethod(newAuthMethod);
    formik.setFieldValue("auth_used", newAuthMethod); // Ensure formik state is updated
    formik.setFieldValue("authValue", "");
    console.log('Current auth method:', newAuthMethod);
  };

  const spec = getDeviceAndOSInfo();

  useEffect(() => {
    getUserLocation((error, position) => {
      if (!error) {
        setLoc({ lat: position.latitude, lon: position.longitude });
      }
    });
  }, []);

  console.log(spec);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    authValue: Yup.string().required("Authentication value is required"),
  });

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const details = {
          ...values,
          ...spec,
          lat: loc.lat || "", // Ensure loc is properly accessed
          lon: loc.lon || ""  // Ensure loc is properly accessed
        };
        const response = await login(details);
        if (response.access_token) {
          toast.success(response.msg);
          if (response.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.log(error);
        toast.error("Login failed. Please try again later.");
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-group-login">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={formik.errors.email ? "input-error" : ""}
            />
            {formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
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
              type={
                authMethod === "pin" || authMethod === "otp" || authMethod === "password"
                  ? "password"
                  : "text"
              }
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
          <div className="form-buttons">
            <button
              type="reset"
              onClick={formik.resetForm}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button-login">
              Submit
            </button>
          </div>
          <div className="register-link">
            <NavLink to="/register">
              Don't Have an Account? Register Here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
