import { combineReducers } from "redux";
import { ADD_TASK } from "./actions";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({ task: taskReducer });
