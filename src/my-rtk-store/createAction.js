export default function createAction(type) {
  function actionCreator(...args) {
    debugger;
    return { type, payload: args[0] };
  }

  actionCreator.type = type;
  return actionCreator;
}
