//Context传值 跨组件层级传递数据

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { bindActionCreators } from "../my-redux";
import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector";
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
//1 创建context对象
const Context = React.createContext();
//2 Provider组件传递value (store)
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

//3 后代消费Provide传递下来的value
// contextType 只能用在类组件，只能订阅单一的context来源
// useContext 只能用在函数组件或者自定义hook中
// Consumer 没有组件限制，但是比较麻烦

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return (props) => {
      const store = useContext(Context);

      const { getState, dispatch, subscribe } = store;

      let dispatchProps = { dispatch };

      if (typeof mapDispatchToProps === "function") {
        dispatchProps = mapDispatchToProps(dispatch);
      } else if (typeof mapDispatchToProps === "object") {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }
      // const forceUpdate = useForceUpdate();

      // useLayoutEffect(() => {
      //   const unsubscribe = subscribe(() => {
      //     forceUpdate();
      //   });
      //   return () => {
      //     unsubscribe();
      //   };
      // }, [subscribe]);

      const state = useSyncExternalStore(subscribe, getState);

      const stateProps = mapStateToProps(state);

      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
};

export function useSelector(selector, equalityFn) {
  const store = useContext(Context);
  const { getState, subscribe } = store;
  // const selectedState = selector(getState());

  // const forceUpdate = useForceUpdate();

  // useLayoutEffect(() => {
  //   const unsubscribe = subscribe(() => {
  //     forceUpdate();
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [subscribe]);

  const state = useSyncExternalStoreWithSelector(
    subscribe,
    getState,
    getState,
    selector,
    equalityFn
  );

  return state;
}

export function useDispatch(selector) {
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch;
}
