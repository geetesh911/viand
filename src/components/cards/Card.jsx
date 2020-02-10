import React, { Fragment, useContext, useState, useEffect } from "react";
import MyGallery from "./../common/ImageSlider";
import { Rating } from "../common/Rating";
import { CardTabs } from "./../layout/CardTabs";
import CardContext from "./../../context/cards/cardContext";
import AuthContext from "./../../context/auth/authContext";
import ModalWindow from "../common/Modal";
import { convertDate } from "./../../utils/convertDate";

export const Card = props => {
  const cardContext = useContext(CardContext);
  const authContext = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const {
    singleCard,
    getCard,
    getCards,
    updateCard,
    setCurrent,
    clearCurrent
  } = cardContext;
  const { loadUser } = authContext;

  const handleClose = () => {
    clearCurrent();
    return setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadUser();
    getCard(props.match.params.id);
    getCards();
    //eslint-disable-next-line
  }, []);
  const { beenThere, zomato } = singleCard;
  const TabInfo = Object.assign({}, singleCard);

  const updateBeenThere = () => {
    let c;
    if (beenThere === false) {
      c = {
        _id: singleCard._id,
        beenThere: true,
        date: convertDate(new Date())
      };
    } else {
      c = {
        _id: singleCard._id,
        beenThere: false,
        date: convertDate(new Date())
      };
    }
    updateCard(c);
  };

  const menuSettle = menu => {
    let arr2 = [];
    for (let i = 0; i < menu.length; i++) {
      arr2.push(singleCard.menu[i]);
    }
    return arr2;
  };

  const editModal = () => {
    handleShow();
    setCurrent(Object.assign({}, singleCard));

    singleCard.menu = menuSettle(singleCard.menu);
  };

  return (
    <Fragment>
      {singleCard._id === props.match.params.id && (
        <div className="container">
          <div className="viand-slider">
            <MyGallery photos={singleCard.photos} />
            {beenThere && (
              <div className="beenThere">
                <i className="fas fa-shoe-prints"></i>
              </div>
            )}
          </div>
          <div className="header">
            {/* <div className="col-xs-9"> */}
            <h4 className="text-white d-inline cardHeading">
              {singleCard.name}{" "}
              <a href="#!" onClick={editModal}>
                <i className="fas fa-edit"></i>
              </a>
            </h4>
            {/* </div> */}
            {/* <div className="col-xs-3"> */}
            <Rating rating={singleCard.rating} classes="mt-1 rating" />
            {/* </div> */}
            <p className="location">{singleCard.location}</p>
            <div className="divider"></div>
            <div className="buttons">
              {!beenThere && (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={updateBeenThere}
                >
                  <i className="fas fa-shoe-prints"></i>
                </button>
              )}
              {/* <div className="beenThere"></div> */}
              {zomato && (
                <a
                  type="button"
                  className="btn btn-outline-secondary"
                  href={singleCard.zomato}
                >
                  {/* <img src="https://img.icons8.com/doodle/40/000000/zomato.png" /> */}
                  <i className="fas fa-utensils"></i>
                </a>
              )}
              <p className="visitedDate">{convertDate(singleCard.date)}</p>
            </div>
          </div>
          <ModalWindow
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
          />

          <CardTabs data={TabInfo} />
        </div>
      )}
    </Fragment>
  );
};
