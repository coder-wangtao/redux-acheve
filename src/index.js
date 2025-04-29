import React from "react";
import ReactDOM from "react-dom/client";
import ReduxPage from "./ReduxPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="app">
    <ReduxPage />
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

function f1(arg) {
  console.log("f1", arg);
  return arg;
}

function f2(arg) {
  console.log("f2", arg);
  return arg;
}

function f3(arg) {
  console.log("f3", arg);
  return arg;
}

//聚合函数
//认是从右到左执行
//它的作用是将多个函数组合成一个新的函数，使这些函数能够按照从右到左的顺序依次执行。
const res = compose(f1, f2, f3)("omg");
console.log(res);

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  //aa 是已经合成过的部分函数。，b 是当前要合成的下一个函数。
  //第一次执行 reduce：
  return funcs.reduce((a, b) => {
    return (...args) => a(b(...args)); //先调用 b(...args)，然后把它的结果传递给 a。
  });
}

// f1 f2 第一次返回的是
//(...args) => f1(f2(...args));

// a = (...args) => f1(f2(...args))
// b = f3
// 第二次返回的是
//(...args) => f1(f2(f3(...args)))

//最后返回的是
//最终返回的函数就是 (...args) => f1(f2(f3(...args)))。
