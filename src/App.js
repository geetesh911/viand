import React, { Fragment } from "react";
import { Card } from "./components/cards/Card";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/layout/Home";
import { AddCardForm } from "./components/cards/AddCardForm";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Alerts } from "./components/common/Alerts";
import { Navs } from "./components/common/Nav";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import CardState from "./context/cards/CardState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import "./";
import { Zomato } from "./components/layout/Zomato";

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  return (
    <AuthState>
      <CardState>
        <AlertState>
          <Fragment>
            <Router>
              <Navs />
              <Alerts></Alerts>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/cards/:id" component={Card} />
                <PrivateRoute exact path="/add" component={AddCardForm} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/search" component={Zomato} />
              </Switch>
            </Router>
          </Fragment>
        </AlertState>
      </CardState>
    </AuthState>
  );
}

export default App;
