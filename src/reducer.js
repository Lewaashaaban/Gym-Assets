export const initialState = {
  user: null,
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      // Use filter to create a new basket array without the removed item
      return {
        ...state,
        basket: state.basket.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
};
