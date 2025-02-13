const concurrentRequest = async (requestList, max) => {
  const result = [];
  const excuting = new Set();

  for (const request of requestList) {
    const p = Promise.resolve().then(() => request());

    excuting.add(p);
    result.push(p);

    p.finally(() => {
      excuting.delete(p);
    });

    if (excuting.size >= max) {
      await Promise.race(excuting);
    }
  }

  return Promise.all(result);
};
