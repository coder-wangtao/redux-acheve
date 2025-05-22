import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midAPI = {
      getState: store.getState,
      //这个dispatch是最终修改的dispatch
      dispatch: (action, ...args) => dispatch(action, ...args), //dispatch是applyMiddleware加强过的dispatch
    };

    const middlewareChain = middlewares.map((middleware) => middleware(midAPI));
    //把所有的中间件的函数都执行了，同时还执行store.dispatch
    //middlewareChain [promise, thunk, logger]
    //(...args) => promise(thunk(logger(...args)))(dispatch);
    //这个dispatch是一个applyMiddleware加强过的dispatch
    dispatch = compose(...middlewareChain)(store.dispatch);
    //dispatch函数 传入一个action

    return {
      ...store,
      //加强dispatch
      dispatch,
    };
  };
}
