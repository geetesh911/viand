import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "../common/Rating";

export const ZomatoItem = ({ restaurant, zomatoSelect }) => {
  return (
    <div className="zomato-item">
      <div className="row">
        <div className="col-sm-12">
          <div className="example-1 zomato-card">
            <div className="wrapper">
              <div className="image">
                {restaurant.thumb ? (
                  <img className="book-image" src={restaurant.thumb} alt="" />
                ) : (
                  <img
                    className="book-image"
                    src="https://lh3.googleusercontent.com/proxy/2iwJU2BBq6OIYMtV82imLy7xdCyOKUWc6Lc5roE4STjyFcWT1deWxpqYno9yyYs7oxbs-JbqZoizBMEKUeJcbSr7G0PuXYllPH_R3edhLQVCmzmeIM9G6SdnuNdaz3v_QegPNJZfpA"
                    alt=""
                  />
                )}
              </div>

              <div className="data">
                <div className="cardContent">
                  <span className="author"></span>
                  <h5 className="title">
                    <a href="#!" className="cardTitle">
                      {restaurant.name}
                    </a>
                  </h5>
                  <p className="locality">{restaurant.location.locality}</p>
                  <p className="address">{restaurant.location.address}</p>
                  <p className="cost">
                    <strong>COST FOR TWO: </strong>
                    &#8377;{restaurant.average_cost_for_two}
                  </p>
                  <Link
                    className="btn btn-small"
                    onClick={() => {
                      zomatoSelect(restaurant);
                    }}
                    to="/add"
                  >
                    Select
                  </Link>
                </div>
              </div>
              <div>
                <Rating
                  rating={restaurant.user_rating.aggregate_rating}
                  classes="cardBadge"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
