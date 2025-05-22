redux
Redux 的设计要求 reducer 是 纯函数，这意味着它不应该有副作用（比如异步操作、I/O 操作等）。
它的职责就是接收当前的 state 和 action，然后返回一个新的 state。异步操作可能需要在外部进行，不能直接在 reducer 中进行。
使用：

页面访问: store.getState()、改变 state: store.dispatch、监听变化：store.subscribe、停止监听 unsubscribe = store.subscribe() => unsubscribe()

store 使用：

1.reducer
reducer 就是一个纯函数，接受旧的 state 和 action,返回新的 state
//(previousState，action) => newState
//之之所以将这样的函数称为 reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer,initialValue)里的回调函数属于相同的类型，保持
//reducer 的纯净非常重要，永远不要在 reducer 里做这些操作
//1 修改传入的参数
//2 执行有副作用的操作，如 api 请求和路由跳转
//3 调用非纯函数 如 Date.now()或者 Math.random()
在 react 中 useReducer hook 中可以传入一个 reducer
const [state, dispatch] = useReducer(counterReducer, "0", init);

2.enhancer

<!-- const store = createStore(
  combineReducers({
    count: counterReducer,
  }),
  applyMiddleware(promise, thunk, logger)
); -->

applyMiddleware 最主要的目的是返回增强后的 dispatch，在执行中间件的时候有一个很重要的函数 compose，这个 compose 主要是通过 reduce 从后向前依次执行[promise, thunk, logger]里的中间件，执行完前一个函数的返回值，会作为后一个函数的参数

promise -> 如果 dispatch 传入的 action 是一个 promise，那么 promise 中间会执行 Promise.then,把 promise 执行完的参数传给原来的 dispatch({})重新走 [promise,thunk,logger]

thunk: -> 如果 dispatch 传入的 action 是一个 函数，那么 thunk 会执行这个函数, 可以在这个函数进行异步操作，异步操作结束后再调用 dispatch({})重新走 [promise,thunk,logger]

logger -> 这个 logger 要放到中间件的最后，否则输出结果会不正确。获取之前的值： const prevState = getState()，执行 dispatch: const returnValue = next(action),
获取更新之后的值： const nextState = getState();

<!-- export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function (...args) {
      return a(b(...args));
    };
  });
} -->

createStore(reducer，enhancer)
// 1.存储状态 currentState 2.获取状态 getState 3 更新状态 dispatch 4.订阅 subscribe
currentListeners = [], subscribe(() => forceUpdate())中传入的回调函数 forceUpdate 会放到 currentListeners 这个数组里，dispatch 时会遍历 currentListeners 执行 forceUpdate

combineReducers:接受一个 Reducer，执行这个 reducer 做合并操作，然后再返回一个 reducer

<!-- const store = createStore(
  combineReducers({
    count: counterReducer,
  }),
); -->
