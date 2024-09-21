import React, { createContext, useContext, useReducer } from "react";

// Prepare the data layer
export const StateContext = createContext();

// Wrap our data and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  // Load basket from local storage
  const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];

  // Create initial state with stored basket
  const initialStateWithBasket = {
    ...initialState,
    basket: storedBasket, // Override initial basket with stored data
  };

  return (
    <StateContext.Provider value={useReducer(reducer, initialStateWithBasket)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
