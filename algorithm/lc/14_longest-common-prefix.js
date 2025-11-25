/**
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
 

提示：

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 如果非空，则仅由小写英文字母组成
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length <= 1) {
    return strs?.[0] || '';
  }

  const minWordLen = strs.reduce((acc, cur) => {
    return Math.min(acc, cur.length);
  }, Infinity);

  let res = '';
  for (let i = 0; i < minWordLen; i++) {
    let cur = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== cur) {
        return res;
      }
    }
    res += cur;
  }
  return res;
};
// strs = ['flower', 'flow', 'flight'];
// console.log('fl', longestCommonPrefix(strs));
// strs = ['dog', 'racecar', 'car'];
// console.log('', longestCommonPrefix(strs));
// strs = ['flower', 'fkow'];
// console.log('f', longestCommonPrefix(strs));

var longestCommonPrefix2 = function (strs) {
  /**
   * 核心: 先找到最小单词长度, 然后二分查找, 每次匹配都将当前前缀记录下来
   * 结束标志: left > right 的时候停止循环
   */
  if (strs.length <= 1) {
    return strs?.[0] || '';
  }

  let right = strs.reduce((acc, cur) => {
    return Math.min(acc, cur.length);
  }, Infinity);

  let left = 0;
  let res = '';
  // 二分查找, (left, right) 区间
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cur = strs[0].substring(0, mid);
    const isAllFit = strs.every((i) => i.substring(0, mid) === cur);
    if (isAllFit) {
      left = mid + 1;
      res = cur;
    } else {
      right = mid - 1;
    }
  }
  return res;
};
strs = ['flower', 'flow', 'flight'];
console.log('fl', longestCommonPrefix2(strs));
strs = ['dog', 'racecar', 'car'];
console.log('', longestCommonPrefix2(strs));
strs = ['flower', 'fkow'];
console.log('f', longestCommonPrefix2(strs));
strs = ['ab', 'a'];
console.log('a', longestCommonPrefix2(strs));
