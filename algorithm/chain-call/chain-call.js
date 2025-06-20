function find(data) {
  const wrapper = {
    _data: data,

    where(conditions) {
      this._data = this._data.filter((item) => {
        return Object.entries(conditions).every(([key, val]) => {
          if (val instanceof RegExp) {
            return val.test(String(item[key]));
          }
          return item[key] === val;
        });
      });
      return this;
    },

    sortBy(key, order = 'asc') {
      this._data.sort((a, b) => {
        if ((order = 'asc')) {
          return a[key] - b[key];
        }
        return b[key] - a[key];
      });
      return this;
    },

    value() {
      return this._data;
    },
  };

  return wrapper;
}

find([
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
