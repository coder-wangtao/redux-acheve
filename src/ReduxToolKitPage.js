import { useLayoutEffect, useReducer } from "react";
import { increment, incrementByAmount } from "./store/counterSlice";
import store from "./store/rtkStore";

export default function ReduxToolKitPage(props) {
  const counter = store.getState().counter.value;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h3>ReduxToolKitPage</h3>
      <button onClick={() => store.dispatch(increment())}>{counter}</button>
      <button onClick={() => store.dispatch(incrementByAmount(100))}>
        每次累加100：{counter}
      </button>
      <button onClick={() => store.dispatch({ type: "counter/increment" })}>
        {counter}
      </button>
    </div>
  );
}
