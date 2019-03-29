import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import "./styles.css";

import App from "./App";

let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const setArrayImmutable = (items, index = null, value) => {
  return Object.assign([...items], { [index]: value });
};

const getWinner = newItems => {
  const filteredCombo = winningCombinations.filter(
    combo =>
      newItems[combo[0]] &&
      newItems[combo[0]] === newItems[combo[1]] &&
      newItems[combo[1]] === newItems[combo[2]]
  );

  return filteredCombo.length === 1 && newItems[filteredCombo[0][0]];
};

const reducer = (
  state = {
    items: ["", "", "", "", "", "", "", "", ""],
    counter: 0,
    winner: null,
    restart: false
  },
  action
) => {
  switch (action.type) {
    case "SET_ITEMS":
      let counter = state.counter;
      counter++;
      const value = counter % 2 ? "X" : "O";
      const newItems = setArrayImmutable(state.items, action.index, value);

      return {
        ...state,
        items: newItems,
        counter,
        winner: getWinner(newItems)
      };
    case "RESTART":
      return {
        ...state,
        items: Object.assign(
          [...state.items],
          ["", "", "", "", "", "", "", "", ""]
        ),
        counter: 0,
        winner: null
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
