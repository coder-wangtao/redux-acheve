function add1(str) {
  console.log("1111111111111111");
  return "1" + str;
}
function add2(str) {
  console.log("22222222222222222");

  return "2" + str;
}
function add3(str) {
  console.log("3333333333333333");

  return "3" + str;
}
function add4(str) {
  console.log("4444444444444444");
  return "4" + str;
}

//聚合函数
//认是从右到左执行
//它的作用是将多个函数组合成一个新的函数，使这些函数能够按照从右到左的顺序依次执行。
// let result = add1(add2(add3(add4("GuYan"))));
let result = compose(add1, add2, add3, add4)("gyya");

console.log(result);

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
//第一次迭代
//参数：add1，add2
//返回
// function fn1(...args1) {
//   return add1(add2(...args1));
// }

//第二次迭代
//参数：
// function fn1(...args1) {
//   return add1(add2(...args1));
// }
// add3
//返回：
// function fn2(...args2) {
//   return (function fn1(...args1) {
//     return add1(add2(...args1));
//   })(add3(...args2));
// }
//相当于
// function fn2(...args2) {
//   return add1(add2(add3(...args2)));
// }

//第三次迭代
//参数：
// function fn3(...args3) {
//   return add1(add2(add3(...args3)));
// }
// add4
//返回：
// function fn4(...args4) {
//   return (function fn3(...args3) {
//     return add1(add2(add3(...args3)));
//   })(add4(...args4));
// }
// //相当于
// function fn4(...args4) {
//   return add1(add2(add3(add4(...args4))));
// }
