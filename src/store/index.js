import { createStore, applyMiddleware, combineReducers } from "../my-redux";
import isPromise from "is-promise";

export function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

//middlewareChain [promise, thunk, logger]
const store = createStore(
  // counterReducer,
  combineReducers({
    count: counterReducer,
  }),
  applyMiddleware(promise, thunk, logger)
);

export default store;

//middlewareChain [promise, thunk, logger]
//(...args) => promise(thunk(logger(...args)))(dispatch)

function logger({ getState, dispatch }) {
  return function (next) {
    return function (action) {
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
  };
}

function thunk({ getState, dispatch }) {
  //next = store.dispatch
  return function (next) {
    //先执行这里
    return function (action) {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      return next(action);
    };
  };
}

function promise({ getState, dispatch }) {
  //这里的next指的是上一次的返回值
  return function (next) {
    //再执行这里
    return function (action) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    };
  };
}
