import React, { useReducer } from "react";
import CardContext from "./cardContext";
import cardReducer from "./cardReducer";
import Axios from "axios";
import {
  ADD_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CARD,
  FILTER_CARDS,
  CLEAR_FILTER,
  GET_CARDS,
  CLEAR_CARDS,
  CARD_ERROR,
  GET_CARD,
  CLEAR_CARD,
  SET_ZOMATO,
  CLEAR_ZOMATO,
  CLEAR_ERRORS,
} from "../types";

let API_URL = "";

if (process.env.NODE_ENV === "production") {
  API_URL = "https://viand-0xti.onrender.com";
} else {
  API_URL = "http://localhost:5000";
}

const CardState = (props) => {
  const initialState = {
    cards: null,
    singleCard: {},
    current: null,
    filtered: null,
    error: null,
    zomatoData: null,
  };

  const [state, dispatch] = useReducer(cardReducer, initialState);

  const menuField = (menu) => {
    let arr = menu.split(",");

    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].trim();

    let arr2 = [];
    let menuArray = [];
    for (let i = 0; i < arr.length; i++) {
      arr2.push(arr[i].split("-"));
    }

    for (let i = 0; i < arr2.length; i++) {
      let obj = {};
      obj.food = arr2[i][0];
      obj.price = arr2[i][1];
      menuArray.push(obj);
    }

    return menuArray;
  };

  // Get Cards
  const getCards = async () => {
    try {
      const res = await Axios.get(`${API_URL}/api/cards`);
      dispatch({ type: GET_CARDS, payload: res.data });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }
  };

  // Get Card
  const getCard = async (id) => {
    try {
      const res = await Axios.get(`${API_URL}/api/cards/${id}`);
      dispatch({ type: GET_CARD, payload: res.data });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }
  };

  // Add a card
  const addCard = async (card) => {
    card.menu = menuField(card.menu);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await Axios.post(`${API_URL}/api/cards`, card, config);
      dispatch({ type: ADD_CARD, payload: res.data });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.data });
    }
  };

  // Delete a card
  const deleteCard = async (id) => {
    try {
      await Axios.delete(`${API_URL}/api/cards/${id}`);
      dispatch({ type: DELETE_CARD, payload: id });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }
  };

  // Update current contact
  const updateCard = async (singleCard) => {
    if (singleCard.menu) {
      singleCard.menu = menuField(singleCard.menu);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await Axios.put(
        `${API_URL}/api/cards/${singleCard._id}`,
        singleCard,
        config
      );
      dispatch({ type: UPDATE_CARD, payload: res.data });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }
  };

  // Clear cards
  const clearCards = () => {
    dispatch({ type: CLEAR_CARDS });
  };

  // Clear card
  const clearCard = () => {
    dispatch({ type: CLEAR_CARD });
  };

  // Filter cards
  const filterCards = (text) => {
    dispatch({ type: FILTER_CARDS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Set Current
  const setCurrent = (card) => {
    dispatch({ type: SET_CURRENT, payload: card });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Set Zomato
  const setZomato = (restaurant) => {
    dispatch({ type: SET_ZOMATO, payload: restaurant });
  };

  // Clear Zomato
  const clearZomato = () => {
    dispatch({ type: CLEAR_ZOMATO });
  };

  // Clear Zomato
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        filtered: state.filtered,
        error: state.error,
        current: state.current,
        singleCard: state.singleCard,
        zomatoData: state.zomatoData,
        addCard,
        deleteCard,
        filterCards,
        clearFilter,
        getCards,
        getCard,
        updateCard,
        clearCards,
        clearCard,
        setCurrent,
        clearCurrent,
        setZomato,
        clearZomato,
        clearErrors,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
