import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  // Renderizar a lista de opcoes
  const selectOptions = options.map(option => (
    <option value={option.value} key={option.label}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name="status"
      >
        {selectOptions}
      </select>
      <small className="form-text text-muted">
        Give us an idea of where you are at in your career
      </small>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
