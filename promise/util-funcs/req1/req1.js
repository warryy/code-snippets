/**
 * 写一个请求函数, 实现以下结果:
 * 1. 参数相同时, 直接返回缓存的结果
 * 2. 参数不同时, 请求成功后, 缓存结果
 * 3. 最大缓存5个结果
 * 4. 同一个请求, 1秒内触发, 只请求一次
 */

const cacheSize = 5;
const cacheTime = 1000;
const timesKey = "cur_catch_times";
const lruCache = new LRUCache(cacheSize);
// 1秒内重复请求的缓存
const loadingInTimeCache = new Map();
console.log(lruCache);

const getParamsKey = (url, params, method) => {
  const paramsString = getParamsString(params);
  return `${url}-${method}-${paramsString}`;
};

const getParamsString = (params) => {
  return Object.entries(params)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

async function catchReq(url, params, method) {
  // 为每个请求生成一个唯一的key
  const key = getParamsKey(url, params, method);
  console.log(key, lruCache, lruCache.has(key));

  // 如果缓存中有, 直接返回
  if (lruCache.has(key)) {
    console.log("缓存命中");
    return lruCache.get(key);
  }

  // 1秒内重复请求, 直接复用之前的请求
  if (loadingInTimeCache.has(key)) {
    console.log("1秒内重复请求, 直接复用之前的请求");
    return loadingInTimeCache.get(key);
  }

  // 请求 url 拼装
  const _url = method === "GET" ? `${url}?${getParamsString(params)}` : url;

  // 请求的 Promise
  const res = fetch(_url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? null : params,
  })
    .then((res) => res.json())
    .then((res) => {
      // 请求成功后, 缓存结果
      lruCache.set(key, res);
      return res;
    })
    .finally(() => {
      loadingInTimeCache.delete(key);
    });

  // 将请求的 Promise 缓存起来
  loadingInTimeCache.set(key, res);

  // 设置请求的过期时间
  setTimeout(() => {
    loadingInTimeCache.delete(key);
  }, cacheTime);

  return res;
}

catchReq(
  "http://127.0.0.1:9000/api/test",
  {
    b: 1,
    a: 1,
  },
  "GET"
).then((data) => {
  console.log("===第一次请求的结果", data);
});

catchReq(
  "http://127.0.0.1:9000/api/test",
  {
    b: 1,
    a: 1,
  },
  "GET"
).then((data) => {
  console.log("===重复请求的结果", data);
});

setTimeout(() => {
  catchReq(
    "http://127.0.0.1:9000/api/test",
    {
      b: 1,
      a: 1,
    },
    "GET"
  ).then((data) => {
    console.log("===3秒之后的请求", data);
  });
}, 3000);
