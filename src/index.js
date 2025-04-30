import React from "react";
import ReactDOM from "react-dom/client";
import ReduxPage from "./ReduxPage";
import HooksPage from "./HooksPage";
import ReactReduxPage from "./ReactReduxPage";
import ReactReduxHookPage from "./ReactReduxHookPage";
import { Provider } from "./my-react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="app">
    <Provider store={store}>
      <ReactReduxHookPage omg="omg" />
    </Provider>
  </div>
);

const array1 = [1, 2, 3, 4];

//accumulator:之前的值，currentValue:当前值
const reducer = (accumulator, currentValue) => {
  return accumulator + currentValue;
};

console.log(array1.reduce(reducer));

// console.log(array1.reduce(reducer, 1));

//什么是reducer reducer就是一个纯函数，接受旧的state和action,返回新的state

//(previousState，action) => newState
//之之所以将这样的函数称为reducer，是因为这种函数与被传入Array.prototype.reduce(reducer,initialValue)里的回调函数属于相同的类型，保持
//reducer的纯净非常重要，永远不要在reducer里做这些操作
//1 修改传入的参数
//2 执行有副作用的操作，如api请求和路由跳转
//3 调用非纯函数 如Date.now()或者Math.random( )
