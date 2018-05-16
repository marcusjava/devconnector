import React from "react";

export default () => {
  return (
    <div>
      <h4 className="mb-2">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Northern Essex</td>
            <td>Associates</td>
            <td>02-03-2007 - 01-02-2009</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
