const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/config");
const crypto = require("crypto");

class AuthService {
  loginValidate = (data) => {
    let errors = {};
    if (!data.email) {
      errors["email"] = "Email is required";
    } else {
      delete errors["email"];
    }
    if (!data.authValue) {
      errors["passowrd"] = "Password is required";
    } else {
      delete errors["password"];
    }

    if (Object.keys(errors).length) {
      console.log(errors);
      throw errors;
    } else {
      return null;
    }
  };
  registerValidate = (data, is_edit = false) => {
    let errors = {};
    if (!data.email) {
      errors["email"] = "Email is required";
    }
    if (!data.authValue) {
      errors["password"] = "Password is required";
    }
    if (!data.name) {
      errors["name"] = "Name is required";
    }
    if (!data.phoneNumber) {
      errors["phone"] = "Phone is required";
    }
    if (!data.zipcode) {
      errors["zipcode"] = "Zipcode is required";
    } else {
      delete errors["zipcode"];
    }
    if (!data.city) {
      errors["city"] = "City is required";
    } else {
      delete errors["city"];
    }
    if (!data.state) {
      errors["state"] = "State is required";
    } else {
      delete errors["state"];
    }
    if (is_edit) {
      if (!data.email) {
        errors["email_edit"] = "Email is required";
      }
    }
    if (!data.dob) {
      errors["dob"] = "Date of Birth is required";
    }

    if (Object.keys(errors).length) {
      return errors;
    } else {
      return null;
    }
  };

  generateAccessToken = (data) => {
    let token = jwt.sign(data, CONFIG.JWT_SECRET);
    return token;
  };

}

module.exports = AuthService;
