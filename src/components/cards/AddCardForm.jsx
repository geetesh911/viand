import { Form } from "./Form";
import React, { Fragment, useEffect, useState, useContext } from "react";
import CardContext from "../../context/cards/cardContext";
import AuthContext from "../../context/auth/authContext";
import { Input } from "./../common/Input";
import { convertDate } from "./../../utils/convertDate";

export const AddCardForm = props => {
  const cardContext = useContext(CardContext);
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;
  const { zomatoData } = cardContext;
  let photosData = [];

  if (!zomatoData) {
    props.history.push("/");
  } else {
    zomatoData.photos
      ? zomatoData.photos.forEach(photo => photosData.push(photo.photo.url))
      : (photosData = []);
  }

  const [card, setCard] = useState({
    name: "",
    rating: "",
    date: "",
    review: "",
    menu: [],
    beenThere: false,
    zomato: "",
    thumb: "",
    location: "",
    photos: []
  });
  const onChange = e => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
      beenThere: document.getElementById("indeterminate-checkbox").checked
    });
  };

  useEffect(() => {
    loadUser();
    if (zomatoData) {
      setCard({
        name: zomatoData.name,
        zomato: zomatoData.url,
        thumb: zomatoData.thumb,
        location: zomatoData.location.locality,
        photos: photosData
      });
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (!card.date) {
      card.date = convertDate(new Date());
    }
    cardContext.addCard(card);
    props.history.push("/");

    setCard({
      name: "",
      rating: "",
      date: "",
      review: "",
      beenThere: false,
      zomato: "",
      menu: [],
      thumb: "",
      location: "",
      photos: []
    });
    document.getElementById("indeterminate-checkbox").checked = false;
  };

  const showReview = e => {
    const checkbox = document.getElementById("indeterminate-checkbox");
    const reviewTextArea = document.querySelector(".review");

    if (checkbox.checked === true) {
      reviewTextArea.style.setProperty("display", "block", "important");
      reviewTextArea.required = true;
    } else {
      reviewTextArea.required = false;
      reviewTextArea.style.setProperty("display", "none", "important");
    }
  };

  const showOthers = e => {
    const checkbox = document.getElementById("indeterminate-checkbox");
    const ratingInput = document.getElementById("rating");
    const dateInput = document.getElementById("date");

    if (checkbox.checked === true) {
      ratingInput.style.setProperty("display", "block", "important");
      ratingInput.required = true;
      dateInput.style.setProperty("display", "block", "important");
      dateInput.required = true;
    } else {
      ratingInput.style.setProperty("display", "none", "important");
      ratingInput.required = false;
      dateInput.style.setProperty("display", "none", "important");
      dateInput.required = false;
    }
  };

  const beenThereClick = () => {
    showOthers();
    showReview();
  };

  const addCardButton = () => {};

  return (
    <Fragment>
      <div className="form-container mt-5">
        <div className="form">
          <h3 className="heading">Add a Experience</h3>
          <form onSubmit={onSubmit}>
            <Form
              card={card}
              onChange={onChange}
              columns={[0, 12]}
              disable={true}
            />
            <div className="row">
              <div className="col-sm-12">
                <label>
                  <input
                    type="checkbox"
                    name="beenThere"
                    id="indeterminate-checkbox"
                    placeholder="beenThere"
                    value={true}
                    onChange={onChange}
                    onClick={beenThereClick}
                  />
                  <span>Been There</span>
                </label>
              </div>
            </div>
            <Input
              type="text"
              name="rating"
              value={card.rating}
              onChange={onChange}
              label="Rating:"
              columns={[0, 12]}
              classes="d-none"
              //   required={true}
            />
            <Input
              type="date"
              name="date"
              value={card.date}
              onChange={onChange}
              label="Date:"
              helperText={`Date Format: DD-MM-YYYY`}
              columns={[0, 12]}
              classes="d-none"
              //   required={true}
            />
            <div className="row">
              <div className="col-sm-2 valign">
                <label className="d-none d-lg-block" htmlFor="review">
                  Review:
                </label>
              </div>
              <div className="col-sm-12">
                <textarea
                  rows="6"
                  cols="50"
                  name="review"
                  placeholder="review"
                  value={card.review}
                  onChange={onChange}
                  className="d-none review"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Add Card"
              onClick={addCardButton}
              className="submitButton btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
