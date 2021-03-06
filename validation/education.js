const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of Study is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// {
//   school: {
//     type: String,
//     required: true
//   },
//   degree: {
//     type: String,
//     required: true
//   },
//   fieldofstudy: {
//     type: String,
//     required: true
//   },
//   from: {
//     type: Date,
//     required: true
//   },
//   to: {
//     type: Date
//   },
//   current: {
//     type: Boolean,
//     default: false
//   },
//   description: {
//     type: String
//   }
// }
