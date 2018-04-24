const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// school: {
//   type: String,
//   required: true
// },
// degree: {
//   type: String,
//   required: true
// },
// fieldofstudy: {
//   type: String,
//   required: true
// },
// from: {
//   type: Date,
//   required: true
// },
// to: {
//   type: Date
// },
// current: {
//   type: Boolean,
//   default: false
// },
// description: {
//   type: String
// }
