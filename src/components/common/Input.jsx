import React from "react";

export const Input = ({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
  required,
  minLength,
  columns,
  classes,
  disable,
  helperText
}) => {
  if (!columns) columns = [0, 12];
  return (
    <div className={`row`}>
      <div className={`col-sm-${columns[0] || ""} valign`}>
        <label className="d-none d-md-block" htmlFor={name}>
          {label}
        </label>
      </div>
      <div className={`col-sm-${columns[1] || ""}`}>
        <input
          type={type}
          name={name}
          id={name}
          className={classes || ""}
          placeholder={placeholder || name}
          value={value}
          onChange={onChange}
          required={required || false}
          disabled={disable || false}
          minLength={minLength || 0}
        />
        {helperText && (
          <span
            className={`helper-text ${classes}`}
            id={`helper-text-${name}`}
            data-error="wrong"
            data-success="right"
            style={{ fontSize: "11px", marginLeft: "10px" }}
          >
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};
