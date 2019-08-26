const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = validateLoginInput = data => {
  //make sure that data is a string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let errors = {};
  

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
