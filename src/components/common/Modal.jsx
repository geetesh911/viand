import React, { useContext, useEffect, useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import CardContext from "./../../context/cards/cardContext";
import { Form } from "../cards/Form";
import { Input } from "../common/Input";
import { convertDate } from "./../../utils/convertDate";
import { convertedMenu } from "./../../utils/menuConverion";

const ModalWindow = ({ show, handleClose }) => {
  const cardContext = useContext(CardContext);

  const { updateCard, singleCard, current } = cardContext;

  const [card, setCard] = useState({
    name: "",
    rating: "",
    date: "",
    review: "",
    menu: [],
    beenThere: false,
    zomato: "",
  });

  useEffect(() => {
    if (current !== null) {
      current.date = convertDate(current.date);
      current.menu = convertedMenu(current.menu);
      setCard(current);
    }
    // eslint-disable-next-line
  }, [current]);

  const onChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
      _id: singleCard._id,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("object");
    updateCard(card);
    setCard({
      name: "",
      rating: "",
      date: "",
      review: "",
      menu: [],
      beenThere: false,
      zomato: "",
    });
  };

  const showReview = (e) => {
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

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-back">
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            card={card}
            onChange={onChange}
            showReview={showReview}
            columns={[2, 10]}
            disable={true}
          />
          {singleCard.beenThere && (
            <Fragment>
              <Input
                type="text"
                name="rating"
                value={card.rating}
                onChange={onChange}
                label="Rating:"
                columns={[2, 10]}
                // classes="d-none"
                required={true}
              />
              <Input
                type="date"
                name="date"
                value={card.date}
                onChange={onChange}
                label="Date:"
                helperText={`Date Format: DD-MM-YYYY`}
                columns={[2, 10]}
                // classes="d-none"
                required={true}
              />
              <div className="row">
                <div className="col-sm-2 valign">
                  <label className="d-none d-md-block" htmlFor="review">
                    Review:
                  </label>
                </div>
                <div className="col-sm-10">
                  <textarea
                    rows="6"
                    cols="50"
                    name="review"
                    placeholder="review"
                    value={card.review || ""}
                    onChange={onChange}
                    className="review"
                    required={true}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={(e) => {
              handleClose();
              onSubmit(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalWindow;
