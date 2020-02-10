import React, { useContext, useState, useEffect } from "react";
// import { Select } from "./Select";
import CardContext from "./../../context/cards/cardContext";

export const Search = ({ select, columns }) => {
  const cardContext = useContext(CardContext);

  const { filtered, filterCards, clearFilter } = cardContext;

  useEffect(() => {
    if (filtered === null) {
      setSearch({ search: "" });
    }
  }, [filtered]);

  const [search, setSearch] = useState("");

  const onChange = e => {
    setSearch({ search: e.target.value });
    if (search !== "") filterCards(e.target.value);
    else clearFilter();
  };

  return (
    <div className="row">
      <div
        className={`col-lg-${columns[0]} searchArea searchBoxArea center-align`}
      >
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i
                className="fas fa-search mt-1"
                style={{ fontSize: "15px" }}
              ></i>
            </span>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={onChange}
            className="mr-3 d-inline searchBox form-control"
          />
        </div>
      </div>
      {/* <div className={`col-lg-${columns[1]} searchArea`}>
        <button
          type="button"
          className="my-0 btn d-md-inline-block btn-block searchButton"
        >
          Search
        </button>
      </div> */}
    </div>
  );
};
