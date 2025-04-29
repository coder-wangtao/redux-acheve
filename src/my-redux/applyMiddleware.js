import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const middlewareChain = middlewares.map((middleware) => middleware(midAPI));
    console.log(middlewareChain, "middlewareChain");
    //把所有的中间件的函数都执行了，同时还执行store.dispatch
    //middlewareChain [promise:(next) => (action) => {}, thunk:(next) => (action) => {}, logger:(next) => (action) => {}]
    dispatch = compose(middlewareChain)(store.dispatch);

    //dispatch函数 传入一个action

    return {
      ...store,
      //加强dispatch
      dispatch,
    };
  };
}
