import React, { useEffect } from "react";
import { Search } from "../common/Search";
import M from "materialize-css";
import logo from "../../viand-images/logo.png";

const Dashboard = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="dashboard valign-wrapper">
      <div style={{ width: "100%" }}>
        <div className="row logo-div">
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="row mb-0">
          <p className="tagline">A new breed of explorer</p>
        </div>
        <div className="row center-align container">
          <div className="col-sm-12 px-0 searchArea">
            <Search select={true} columns={[12, 0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
