// let a = {
//   name: 'Jack',
//   age: 18,
//   hobbit: ['sing', { type: 'sports', value: 'run' }],
//   score: {
//     math: 'A',
//   },
//   run: function () {},
//   walk: undefined,
//   fly: NaN,
//   cy: null,
//   date: new Date(),
// };
// let b = JSON.parse(JSON.stringify(a));
// console.log(b);
// {
//     age: 18,
//     cy: null,
//     date: "2022-05-15T08:04:06.808Z"//     fly: null,
//     hobbit: (3) ["dance", "sing", {…}],
//     name: "Jack",
//     score: {math: "A"},
// }
// 取不到值为 undefined 的 key；如果对象里有函数，函数无法被拷贝下来；无法拷贝copyObj对象原型链上的属性和方法；对象转变为 date 字符串。

let a = {
  name: 'Jack',
  age: 18,
  hobbit: ['sing', { type: 'sports', value: 'run' }],
  score: {
    math: 'A',
  },
  run: function () {},
  walk: undefined,
  fly: NaN,
  cy: null,
  date: new Date(),
};

function deepCopy(ori, map = new WeakMap()) {
  if (typeof ori !== 'object' || ori === null) {
    return ori;
  }

  // 函数
  if (typeof ori === 'function') {
    return ori.bind({});
  }

  // 数组
  if (Array.isArray(ori)) {
    const arr = [];
    ori.forEach((item) => {
      arr.push(deepCopy(item, map));
    });
    return arr;
  }

  // 时间对象
  if (ori instanceof Date) {
    return new Date(ori);
  }

  if (map.has(ori)) {
    return map.get(ori);
  }

  // map
  if (ori instanceof Map) {
    const copyMap = new Map();
    ori.forEach((v, k) => {
      copyMap.set(deepCopy(k, map), deepCopy(v, map));
    });
    map.set(ori, copyMap);
    return copyMap;
  }

  // set
  if (ori instanceof Set) {
    const copySet = new Set();
    const keys = ori.keys();
    for (const key of keys) {
      copySet.add(key);
    }
    map.set(ori, copySet);
    return copySet;
  }

  // 对象
  const copyObj = Object.create(Object.getPrototypeOf(ori));
  Object.entries(ori).forEach(([k, v]) => {
    copyObj[k] = deepCopy(v, map);
  });
  map.set(ori, copyObj);
  return copyObj;
}

console.log(deepCopy(a));
