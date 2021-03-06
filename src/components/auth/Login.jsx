import React, { useContext, useState, useEffect } from "react";
import { Input } from "../common/Input";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      setLoading(true);
      await login({
        email,
        password,
      });
      setLoading(false);
    }
  };

  return (
    <div className="form-container form">
      <h3 className="heading">Login</h3>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          columns={[0, 12]}
          label="Email:"
          required={true}
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          label="Passoword:"
          columns={[0, 12]}
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

export default Login;
