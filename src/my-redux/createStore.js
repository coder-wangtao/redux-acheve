//reducer是一个function
//enhancer = applyMiddleware(thunk, logger)
export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];

  //存储状态 currentState
  //获取状态 getState
  //更新状态 dispatch
  //变更订阅 subscribe

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    //listener是react useSyncExternalStore源码中内置的定义的(会判断前后state值是否一致，然后触发更新)
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({ type: "busdbsabdsbdbsjk" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
