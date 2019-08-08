import React from "react";

const Input = ({ name, refName, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        ref={refName}
        id={name}
        name={name}
        {...rest}
        // value={value}
        // type={type}
        // autoFocus={autoFocus}
        // onChange={onChange}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
