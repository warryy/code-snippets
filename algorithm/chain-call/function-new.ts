type TableData = Record<string, any>;
type WhereCondition = Record<string, RegExp | string>;

function where<T extends TableData>(data: T[], condition: WhereCondition) {
  return data.filter((d) => {
    return Object.entries(condition).every(([key, regExp]) => {
      if (regExp instanceof RegExp) {
        return regExp.test(d[key]);
      }
      return d[key] === regExp;
    });
  });
}

function sortBy<T extends TableData>(data: T[], sortField: string, sortType: 'asc' | 'desc') {
  data.sort((a, b) => {
    if (sortType === 'asc') {
      return a[sortField] - b[sortField] > 0 ? 1 : -1;
    }

    return a[sortField] - b[sortField] > 0 ? -1 : 1;
  });
}

function find<T extends TableData>(data: T[]) {
  const innerStore = {
    data: data.map((d) => ({ ...d })),
    outerApi: {
      where: (condition: WhereCondition) => {
        innerStore.data = where<T>(innerStore.data, condition);
        return innerStore.outerApi;
      },
      sortBy: (sortField: string, sortType: 'asc' | 'desc') => {
        sortBy(innerStore.data, sortField, sortType);
        return innerStore.outerApi;
      },
      value: () => {
        return innerStore.data;
      },
    },
  };
  return innerStore.outerApi;
}

const a = find([
  { id: 10, name: 'y' },
  { id: 11, name: 'yy' },
  { id: 20, name: 'x' },
  { id: 21, name: 'xy' },
  { id: 22, name: 'xx' },
  { id: 23, name: 'yy' },
])
  .where({ name: /y+/, id: /1/ })
  .sortBy('id', 'desc')
  .value();

console.log(a);
