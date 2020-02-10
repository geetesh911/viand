import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-materialize";
import AuthContext from "./../../context/auth/authContext";
import CardContext from "./../../context/cards/cardContext";

export const Navs = ({ classes }) => {
  const authContext = useContext(AuthContext);
  const cardContext = useContext(CardContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearCards } = cardContext;

  const onLogout = () => {
    logout();
    clearCards();
  };
  const guestLinks = (
    <Fragment>
      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Link to="/">
        <i className="fas fa-home"></i>
        <span style={{ fontSize: "20px" }}> Home</span>
      </Link>
      <Link to="#!" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span style={{ fontSize: "20px" }}> Logout</span>
      </Link>
    </Fragment>
  );

  return (
    <nav className="nav">
      <div className="container">
        <Navbar
          alignLinks="right"
          brand={
            <Link className="brand-logo ml-4" to="/">
              viand
            </Link>
          }
          menuIcon={<i className={`fas fa-bars ${classes}`}></i>}
          options={{
            draggable: true,
            edge: "left",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            search: true,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
          sidenav={
            <Fragment>
              <div className="cover-image">
                <div className="layer"></div>
                <div>
                  {user && (
                    <div className="user">
                      <i className="fas fa-user-circle user-icon"></i>
                      <div className=" user-details">
                        <p className="d-block my-0"> {user && user.name}</p>
                        <p
                          className="d-block my-0"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          {user && user.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isAuthenticated ? authLinks : guestLinks}
              {!user && <i className="fas fa-user-circle no-user"></i>}
            </Fragment>
          }
        >
          {isAuthenticated ? (
            <Link to="/">
              <div className="user">
                <i className="fas fa-user-circle"></i>
                <span className="d-none-sm"> {user && user.name}</span>
              </div>
            </Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
          {isAuthenticated ? (
            <Link to="#!" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span className="mb-1">Logout</span>
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Navbar>
      </div>
    </nav>
  );
};
