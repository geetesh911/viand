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
  GET_CARD,
  CLEAR_CARD,
  CARD_ERROR,
  SET_ZOMATO,
  CLEAR_ZOMATO
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      };
    case GET_CARD:
      return {
        ...state,
        singleCard: action.payload,
        loading: false
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
        loading: false
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card._id !== action.payload),
        loading: false
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card._id === action.payload._id) {
            return (card = action.payload);
          } else {
            return card;
          }
        }),
        singleCard:
          state.singleCard._id === action.payload._id
            ? action.payload
            : state.singleCard
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: null,
        singleCard: null,
        current: null,
        filtered: null,
        error: null
      };
    case FILTER_CARDS:
      return {
        ...state,
        filtered: state.cards.filter(card => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return card.name.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CARD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case SET_ZOMATO:
      return {
        ...state,
        zomatoData: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case CLEAR_ZOMATO:
      return {
        ...state,
        zomatoData: null
      };
    case CLEAR_CARD:
      return {
        ...state,
        singleCard: null
      };
    default:
      return state;
  }
};
