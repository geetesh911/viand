import React from "react";

export const Select = ({ options, classes, id }) => {
  return (
    <select className={classes} id={id}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
