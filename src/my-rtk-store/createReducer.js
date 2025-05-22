//类似immer
import { createNextState } from "@reduxjs/toolkit";

export default function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap] = executeReducerBuildCallback(mapOrBuilderCallback);

  function reducer(state = initialState, action) {
    const caseReducers = [actionsMap[action.type]];
    debugger;
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        return createNextState(previousState, (draft) => {
          return caseReducer(draft, action);
        });
      }
      return previousState;
    }, state);
  }

  return reducer;
}

function executeReducerBuildCallback(mapOrBuilderCallback) {
  const actionsMap = {};
  const builder = {
    addCase: (type, reducer) => {
      actionsMap[type] = reducer;
      return builder;
    },
  };

  mapOrBuilderCallback(builder);
  console.log(actionsMap);
  return [actionsMap];
}

//sliceCaseReducersByType
// {
//   'counter/decrement':() => {},
//   'counter/increment':() => {},
//   'counter/incrementByAmount':() => {},
// }

//  (builder) => {
//       for (let key in sliceCaseReducersByType) {
//         builder.addCase(key, sliceCaseReducersByType[key]);
//       }
//     }
