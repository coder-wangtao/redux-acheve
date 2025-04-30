// [promise, thunk, logger]
// [promise:(next) => (action) => {}, thunk:(next) => (action) => {}, logger:(next) => (action) => {}]

// promise(thunk(logger(...args)))(dispatch);

export default function compose(...funcs) {
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
}

// f1 f2 第一次返回的是
//(...args) => f1(f2(...args));

// a = (...args) => f1(f2(...args))
// b = f3
// 第二次返回的是
//(...args) => f1(f2(f3(...args)))

//最后返回的是
//最终返回的函数就是 (...args) => f1(f2(f3(...args)))。

// function ((action) => {}){
//   return (action) => {}
// }
