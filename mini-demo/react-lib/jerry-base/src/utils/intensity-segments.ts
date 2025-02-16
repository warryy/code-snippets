export class IntensitySegments {
  // 使用Map来存储区间的起始点和对应的强度变化
  private segments: Map<number, number>;
  private cache: false | string = false;

  constructor() {
    // 初始化一个空的Map，用于存储区间的强度变化
    this.segments = new Map<number, number>();
    // 用于缓存toString的结果
    this.cache = false;
  }

  /**
   * 在指定的区间[from, to)内增加强度
   * @param {number} from - 区间的起始点（包含）
   * @param {number} to - 区间的结束点（不包含）
   * @param {number} amount - 要增加的强度值
   */
  add(from: number, to: number, amount: number): void {
    // 在起始点增加指定的强度
    this._updateSegment(from, amount);
    // 在结束点减少相同的强度，以便在该点之后强度恢复
    this._updateSegment(to, -amount);
    this.cache = false;
  }

  /**
   * 在指定的区间[from, to)内设置强度
   * 这会覆盖该区间内的所有现有强度变化
   * @param {number} from - 区间的起始点（包含）
   * @param {number} to - 区间的结束点（不包含）
   * @param {number} amount - 要设置的强度值
   */
  set(from: number, to: number, amount: number): void {
    const descKeys = Array.from(this.segments.keys()).sort((a, b) => b - a);
    const moseCloseToKey = descKeys.find((key) => key <= to);

    const moseCloseFromKey = descKeys.find((key) => key <= from);
    const changeToValue =
      typeof moseCloseToKey === 'number'
        ? this.segments.get(moseCloseToKey) || 0
        : 0;
    const changeFromValue =
      typeof moseCloseFromKey === 'number'
        ? this.segments.get(moseCloseFromKey) || 0
        : 0;

    // 删除该区间内的所有强度变化
    for (let key of Array.from(this.segments.keys())) {
      if (key >= from && key < to) {
        this.segments.delete(key);
      }
    }

    // 在起始点设置新的强度
    this._updateSegment(from, amount - changeFromValue);
    // 在结束点恢复之前的区间变化，表示该点之后强度不变
    this._updateSegment(to, -(amount - changeToValue));
    this.cache = false;
  }

  /**
   * 返回当前所有区间和对应强度的字符串表示
   * @returns {string} - 区间和强度的JSON字符串
   */
  toString(): string {
    if (this.cache !== false) {
      return this.cache;
    }
    // 获取所有的起始点并按升序排序
    const sortedKeys = Array.from(this.segments.keys()).sort((a, b) => a - b);
    const result: [number, number][] = [];
    let currentIntensity = 0;

    // 遍历每个起始点，计算当前的强度
    for (let key of sortedKeys) {
      // 更新当前强度
      currentIntensity += this.segments.get(key) || 0;
      // 仅在强度变化时记录该点
      if (
        result.length === 0 ||
        result[result.length - 1][1] !== currentIntensity
      ) {
        result.push([key, currentIntensity]);
      }
    }

    // 合并相邻的相同强度段，减少冗余
    const mergedResult: [number, number][] = [];
    for (let i = 0; i < result.length; i++) {
      if (
        mergedResult.length === 0 ||
        mergedResult[mergedResult.length - 1][1] !== result[i][1]
      ) {
        mergedResult.push(result[i]);
      }
    }
    // 返回合并后的结果的JSON字符串
    this.cache = JSON.stringify(mergedResult);
    return this.cache;
  }

  /**
   * 更新某个点的强度变化
   * 如果该点已经存在，则更新其强度；否则，添加新的强度变化
   * @param {number} point - 需要更新的点
   * @param {number} amount - 强度变化值
   * @private
   */
  private _updateSegment(point: number, amount: number): void {
    if (this.segments.has(point)) {
      // 计算更新后的强度
      const newAmount = (this.segments.get(point) || 0) + amount;
      // 如果更新后的强度为0，则删除该点，表示不再有强度变化
      if (newAmount === 0) {
        this.segments.delete(point);
      } else {
        // 否则，更新该点的强度
        this.segments.set(point, newAmount);
      }
    } else {
      // 如果该点不存在，则直接设置强度
      this.segments.set(point, amount);
    }
  }

  /**
   * 清除所有的区间和强度变化
   */
  clear(): void {
    this.segments.clear();
    this.cache = false;
  }
}
