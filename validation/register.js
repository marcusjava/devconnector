const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  // check empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Fill the name";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Fill the email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Fill the password";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Fill the password2";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Password and confirm password not equals";
    errors.password2 = "Password and confirm password not equals";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email incorrect";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
