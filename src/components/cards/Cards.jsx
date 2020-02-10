import React, { useContext, useEffect, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CardContext from "./../../context/cards/cardContext";
import { CardItem } from "./CardItem";
import Spinner from "./../layout/Spinner";

export const Cards = () => {
  const cardContext = useContext(CardContext);

  const { cards, filtered, getCards, loading } = cardContext;

  useEffect(() => {
    getCards();
    //eslint-disable-next-line
  }, []);

  if (cards !== null && cards.length === 0 && !loading) {
    return <h4>Please add a Experience</h4>;
  }

  return (
    <Fragment>
      {cards !== null && !loading ? (
        <TransitionGroup>
          {filtered
            ? filtered.map(card => (
                <CSSTransition key={card._id} timeout={500} classNames="item">
                  <CardItem card={card} />
                </CSSTransition>
              ))
            : cards.map(card => (
                <CSSTransition key={card._id} timeout={500} classNames="item">
                  <CardItem card={card} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
