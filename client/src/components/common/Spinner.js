import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ width: "200px", margin: "auto", diplay: "block" }}
      />
    </div>
  );
};
export default Spinner;
