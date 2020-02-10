import React, { Fragment, useEffect, useContext } from "react";
import Dashboard from "./Dashboard";
import { Cards } from "./../cards/Cards";
import { Link } from "react-router-dom";
import AuthContext from "./../../context/auth/authContext";
import CardContext from "./../../context/cards/cardContext";

export const Home = ({ cards }) => {
  const authContext = useContext(AuthContext);
  const cardContext = useContext(CardContext);

  const { loadUser } = authContext;
  const { clearZomato } = cardContext;

  useEffect(() => {
    loadUser();
    clearZomato();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Dashboard />
      <div className="container">
        <div className="row cardRow">
          <Cards cards={cards} />
        </div>
      </div>
      <Link to="/search" className="addButton">
        {/* <i class="material-icons">add</i> */}
        <i className="fas fa-plus"></i>
      </Link>
    </Fragment>
  );
};
