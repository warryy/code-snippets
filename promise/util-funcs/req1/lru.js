class LRUCache {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }

  has(key) {
    return this.cache.has(key);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value === undefined) {
      return undefined;
    }

    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    this.cache.set(key, value);
    if (this.cache.size > this.max) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
