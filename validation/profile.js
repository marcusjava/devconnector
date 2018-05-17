const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // required fields
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle required min 2 and max 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company required";
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = "Website required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid Url";
    }
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status required";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid Url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid Url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid Url";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid Url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
