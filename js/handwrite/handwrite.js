/**
 * 手写 new 操作符
 * 1. 创建一个空对象
 * 2. 将空对象的原型指向构造函数的原型
 * 3. 将空对象作为构造函数的上下文执行构造函数
 * 4. 如果构造函数返回一个对象，则返回该对象，否则返回空对象
 * @param {*} fn
 * @param  {...any} args
 * @returns
 */
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

/**
 * 手写 bind 方法
 * 1. 返回一个函数
 * 2. 改变 this 的指向
 * 3. 传递参数
 */
function myBind(fn, context, ...args) {
  return function (...newArgs) {
    if (this instanceof fn) {
      return new fn(...args, ...newArgs);
    }
    return fn.apply(context, [...args, ...newArgs]);
  };
}

/**
 * 手写 call 方法
 * 1. 改变 this 的指向
 * 2. 传递参数
 */
function myCall(fn, context, ...args) {
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = fn;
  const res = context[fnSymbol](...args);
  delete context[fnSymbol];
  return res;
}

/**
 * 手写 apply 方法, 不能用 apply, call 等方法去实现
 * 1. 改变 this 的指向
 * 2. 传递参数
 */
function myApply(fn, context, args) {
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = fn;
  const res = context[fnSymbol](...args);
  delete context[fnSymbol];
  return res;
}

/**
 * 手写 instanceof 操作符
 * 1. 判断对象是否是某个构造函数的实例
 * 2. 判断对象的原型链上是否存在某个构造函数的原型
 */
function myInstanceof(obj, fn) {
  let proto = obj.__proto__;
  while (proto) {
    if (proto === fn.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

/**
 * 手写 Object.create 方法
 * 1. 创建一个新对象
 * 2. 将新对象的原型指向某个对象
 */
function myCreate(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

/**
 * 手写 Object.assign 方法
 * 1. 将多个对象的属性合并到目标对象
 */
function myAssign(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (let key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * 手写 Object.is 方法
 * 1. 判断两个值是否相等
 */
function myIs(a, b) {
  /**
   * 如果 a 和 b 相等，则返回 true
   * 如果 a 和 b 都是 NaN，则返回 false
   * 如果 a 和 b 都是正无穷大，则返回 true
   * 如果 a 和 b 都是负无穷大，则返回 true
   * 如果 a 和 b 都是 0，则返回 true
   * 如果 a 和 b 都是 -0，则返回 true
   *
   */
  if (a === b) {
    /**
     * 0 和 -0 不相等
     * 1 / 0 和 1 / -0 不相等
     */
    return a !== 0 || 1 / a === 1 / b;
  }
  /**
   * NaN 和 NaN 不相等
   */
  return a !== a && b !== b;
}
