import React from "react";

export const Table = ({ data, classes }) => {
  let total = 0;
  for (let i = 0; i < data.menu.length; i++) {
    if (data.menu[i].price) total += data.menu[i].price;
    else break;
  }

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
        <tr style={{ fontWeight: "600" }}>
          <td>TOTAL</td>
          <td>{total || "Not Confirmed"}</td>
        </tr>
      </tbody>
    </table>
    // </div>
  );
};
