createSlice
对 使用 redux 做了一层封装

name, initialState, reducers

<!-- const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
}); -->

createSlice 通过对 reducers 这个对象做逻辑处理，返回一个 actions、reducer。是对 action 做一个封装,对 reducer 做一个封装。

action：reducers 中的属性 increment、decrement、incrementByAmount 会变成一个一个的 action，就是会返回
{type:'counter/increment | counter/decrement | counter/incrementByAmount',payload}

reducer：通过对 reducers 这个对象做逻辑处理，返回一个 reducer
主要逻辑就是找到 action 对应的 reducers，做处里，内部用了一个[]保存 reducers 里的函数，[].reducer 做数据合并操作，里面用了 createNextState，类似与 immer
//reducer 接受一个 action,返回对应 state

<!-- export function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
} -->

configureStore: 根据一个 reducer 创建一个 store

//页面使用是按照 redux 使用相同

<!-- export default function ReduxToolKitPage(props) {
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
} -->
