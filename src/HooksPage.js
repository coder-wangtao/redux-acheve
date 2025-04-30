import { useReducer } from "react";
import { counterReducer } from "./store/index";
const init = (initArg) => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(counterReducer, "0", init);
  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({ type: "ADD" })}>{state}</button>
    </div>
  );
}
