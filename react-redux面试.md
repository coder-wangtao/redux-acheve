react-redux 使用：
类组件：connect Provider
1.Provider 就是 Context

<!-- <Provider store={store}>                    export function Provider({ store, children }) {
      <ReactReduxPage omg="omg" />      ->              return <Context.Provider value={store}>{children}</Context.Provider>;
     <!-- </Provider>                                 } -->

2.connect 是一个函数(高阶组件)，接受两个参数(mapStateToProps, mapDispatchToProps)又返回一个函数，这个函数接受一个组件，又返回一个组件。
connect 会通过 Context 拿到 storeL 里的 getState, dispatch, subscribe

mapStateToProps 是一个函数，其主要目的是将最新的 state 作为参数，执行它，将它的返回值放到组件的 props 上，提供使用者使用

mapDispatchToProps 既可以传入函数，也可以传入一个对象，其主要目的是将 action 例如：{ type: "ADD" }，包裹上 dispatch,再将这些包裹 dispatch 的 action 放到组件的 props 上，提供使用者使用

对 state 的处理也用到了 useSyncExternalStore
const state = useSyncExternalStore(subscribe, getState);
subscribe(listener) //listener 是 react useSyncExternalStore 源码中内置的定义的(会判断前后 state 值是否一致，然后触发更新)

函数组件：Provider useSelector useDispatch
1.Provider 就是 Context

<!-- <Provider store={store}>                    export function Provider({ store, children }) {
      <ReactReduxPage omg="omg" />      ->              return <Context.Provider value={store}>{children}</Context.Provider>;
     <!-- </Provider>                                 } -->

2.useSelector 本质是 useSyncExternalStoreWithSelector
subscribe getState 是 redux 中的

  <!-- const state = useSyncExternalStoreWithSelector(
    subscribe,
    getState,
    getState,
    selector,
    equalityFn
  ); -->

useSyncExternalStoreWithSelector 主要是让 useSyncExternalStore 支持了可以取部分 state 值和自定义比对函数 isEqual，
当 Redux store 更新时，useSelector 会重新运行选择器函数。如果返回值发生变化，组件会重新渲染。

(默认是浅比较 shallowEqual)
shallowEqual 的实现原理
shallowEqual 的实现逻辑大致如下：
比较两个值的引用是否相同（===）。
如果两个值都是对象或数组，遍历它们的属性或元素，逐一比较。
如果所有属性或元素的值都相等（===），返回 true；否则返回 false。

然后取部分 state 值的 selector 通过 useMemo 做了一些处理
// Same as useSyncExternalStore, but supports selector and isEqual arguments.

3.useDispatch 从 context 里获取 dispatch
