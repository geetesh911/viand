import React from "react";

export const Select = ({ options }) => {
  return (
    <select>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
