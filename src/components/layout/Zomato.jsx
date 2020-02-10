import React, { useState, useEffect, useContext } from "react";
import CardContext from "../../context/cards/cardContext";
import AuthContext from "../../context/auth/authContext";
import { ZomatoItem } from "./ZomatoItem";
import Spinner from "./Spinner";
import { Select } from "./../common/Select";

let zomatoAPIKey;

if (process.env.NODE_ENV !== "production") {
  zomatoAPIKey = process.env.REACT_APP_ZOMATO_API_KEY;
} else {
  zomatoAPIKey = process.env.ZOMATO_API_KEY;
}

export const Zomato = () => {
  const cardContext = useContext(CardContext);
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;
  const { setZomato } = cardContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  });

  const [search, setSearch] = useState({
    keywords: "",
    loading: false
  });
  const [restaurants, setRestaurants] = useState();

  const onChange = e => {
    setSearch({ [e.target.name]: e.target.value });
  };
  const searchZomato = async () => {
    let cityID = document.getElementById("cities").value;
    setRestaurants("");
    setSearch({ loading: true });
    try {
      const res = await fetch(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&q=${search.keywords}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-key": zomatoAPIKey
          }
        }
      );
      const data = await res.json();
      setRestaurants(data.restaurants);
      setSearch({ loading: false });
    } catch (err) {
      console.log(err.response);
    }
  };

  const zomatoSelect = restaurant => {
    setZomato(restaurant);
  };

  const clear = () => {
    document.getElementById("search").value = "";
    setSearch({ keywords: "" });
  };
  return (
    <div className="container-fluid zomato" style={{ textAlign: "center" }}>
      <h1 className="mx-auto">Search Restaurants</h1>
      <div className="row container">
        <div className="col-md-2 col-sm-12">
          <Select
            options={[
              { text: "Jaipur", value: "10" },
              { text: "Delhi", value: "1" },
              { text: "Kolkata", value: "2" },
              { text: "Mumbai", value: "3" },
              { text: "Bengaluru", value: "4" },
              { text: "Pune", value: "5" },
              { text: "Hyderabad", value: "6" }
            ]}
            classes="form-control selectCities"
            id="cities"
          />
        </div>
        <div className="col-md-10 col-sm-12">
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
              name="keywords"
              id="search"
              placeholder="Search..."
              onChange={onChange}
              className="mr-3 d-inline searchBox form-control"
            />
          </div>
        </div>
      </div>
      <button onClick={searchZomato} className="btn mt-4 mr-2 resSearchButton">
        Search
      </button>
      <button onClick={clear} className="btn mt-4 ml-2 resSearchButton">
        Clear
      </button>
      {search.loading && <Spinner />}
      {restaurants &&
        restaurants.map(r => (
          <ZomatoItem
            restaurant={r.restaurant}
            zomatoSelect={zomatoSelect}
            key={r.restaurant.id}
          />
        ))}
    </div>
  );
};
