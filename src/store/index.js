import { createStore, applyMiddleware } from "../my-redux";
import isPromise from "is-promise";
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(
  counterReducer,
  applyMiddleware(promise, thunk, logger)
);

export default store;

function logger({ getState, dispatch }) {
  console.log("loggerloggerloggerloggerlogger");
  return (next) => (action) => {
    console.log("=======================");
    console.log(action.type + "执行了");
    const prevState = getState();
    console.log("prev state", prevState);
    const returnValue = next(action);
    //等状态值修改之后，再执行getState
    const nextState = getState();
    console.log("next state", nextState);
    console.log("=======================");
    return returnValue;
  };
}

function thunk({ getState, dispatch }) {
  console.log("thunkthunkthunkthunkthunkthunk");
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({ getState, dispatch }) {
  console.log("promisepromisepromisepromisepromisepromise");
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
