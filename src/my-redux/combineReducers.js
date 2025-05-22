export default function combineReducers(reducers) {
  // reducers; //key value
  // {
  //  state: () => {}
  // }
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;

    for (const key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}

// export function counterReducer(state = 0, action) {
//   switch (action.type) {
//     case "ADD":
//       return state + 1;
//     case "MINUS":
//       return state - 1;
//     default:
//       return state;
//   }
// }
