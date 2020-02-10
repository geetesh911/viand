import React, { useContext } from "react";
import { Table } from "../common/Table";
import { Rating } from "../common/Rating";
import CardContext from "./../../context/cards/cardContext";
import { Link } from "react-router-dom";

export const CardItem = ({ card }) => {
  const cardContext = useContext(CardContext);
  const { deleteCard, getCard } = cardContext;
  // const total = menu.prices.reduce((a, c) => a + c);
  const { _id, name, menu, beenThere, rating, thumb } = card;

  const onDelete = () => {
    deleteCard(_id);
  };

  const more = () => {
    getCard(_id);
  };

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
      <div className="card sticky-action">
        <div className="card-image responsive-img">
          {thumb ? (
            <img src={thumb} alt=""></img>
          ) : (
            <img
              alt=""
              src={`https://fundehitus.ee/raua20/wp-content/uploads/2016/12/noimage.gif`}
            />
          )}

          {beenThere && (
            <div className="beenThere">
              <i className="fas fa-shoe-prints"></i>
            </div>
          )}
        </div>
        <div className="card-content activator">
          <span className="card-title grey-text text-darken-4 activator">
            <div className="head">
              <h5 className="mt-0 card-heading d-inline activator">{name}</h5>
            </div>
            <div className="d-inline">
              <i className="fas fa-ellipsis-v right icons" />
              <Rating rating={rating} classes="rating" />
            </div>
          </span>
        </div>
        <div className="card-action">
          <Link to={`/cards/${_id}`} className="btn mr-4" onClick={more}>
            More
          </Link>

          <button className="btn btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="fas fa-times right icons"></i>
            <h5 className="mt-0 card-heading d-inline">{name}</h5>
          </span>
          <div className="card-reveal-body">
            {menu && <Table data={card} classes="mt-3" />}
          </div>
        </div>
      </div>
    </div>
  );
};
