import React from "react";

export const Table = ({ data, classes }) => {
  return (
    // <div className="table-responsive">
    <table
      className={`table table-striped table-dark table-light table-responsive-sm table-hover responsive-table cardTable ${classes}`}
    >
      <thead>
        <tr>
          <th scope="col">Food</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {data.menu.map((m, index) => (
          <tr key={index}>
            <td>{m.food}</td>
            <td>{m.price || "Not Confirmed"}</td>
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
};
