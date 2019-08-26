const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = validateRegisterInput = data => {
  //make sure that data is a string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";

  let errors = {};
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "password confirm field is required";
  }
  if (!Validator.equals(data.password, data.password1)) {
    errors.password1 = "password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
