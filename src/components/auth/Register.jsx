import React, { useContext, useEffect, useState } from "react";
import { Input } from "../common/Input";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      setLoading(true);
      await register({
        name,
        email,
        password,
      });
      setLoading(false);
    }
  };

  return (
    <div className="form-container form">
      <h3 className="heading">Register</h3>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          label="Name:"
          required={true}
        />
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          label="Email:"
          required={true}
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          label="Passoword:"
          required={true}
          minLength="6"
        />
        <Input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm Password"
          onChange={onChange}
          label="Confirm Passoword:"
          required={true}
          minLength="6"
        />
        <button
          type="submit"
          className="btn btn-primary submitButton btn-block"
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
