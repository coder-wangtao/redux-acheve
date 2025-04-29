export default function compose(funcs) {
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
