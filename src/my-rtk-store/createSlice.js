import createAction from "./createAction";
import createReducer from "./createReducer";

export function createSlice({ name, initialState, reducers }) {
  const reducerNames = Object.keys(reducers);
  const actionCreators = {};
  const sliceCaseReducersByType = {}; //action

  reducerNames.forEach((reducerName) => {
    const r = reducers[reducerName];
    const type = `${name}/${reducerName}`;
    sliceCaseReducersByType[type] = r;
    actionCreators[reducerName] = createAction(type);
  });

  console.log(sliceCaseReducersByType);

  function buildReducer() {
    return createReducer(initialState, (builder) => {
      for (let key in sliceCaseReducersByType) {
        builder.addCase(key, sliceCaseReducersByType[key]);
      }
    });
  }

  let _reducer;

  return {
    actions: actionCreators,
    reducer: (state, action) => {
      if (!_reducer) _reducer = buildReducer();

      console.log(_reducer(state, action));
      return _reducer(state, action);
    },
  };
}
