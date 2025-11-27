/**
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

进阶：

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

致谢：

特别感谢 @pbrother 添加此问题并且创建所有测试用例。

 

示例 1：

输入：s = "abc", t = "ahbgdc"
输出：true
示例 2：

输入：s = "axc", t = "ahbgdc"
输出：false
 

提示：

0 <= s.length <= 100
0 <= t.length <= 10^4
两个字符串都只由小写字符组成。
 */
const dpCache = {};
const getCodePoint = (str) => {
  return str.codePointAt() - 97;
};
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var getDp = function (t) {
  if (dpCache[t]) {
    return dpCache[t];
  }
  const dp = new Array(t.length).fill().map((i) => new Array(26).fill(-1));

  for (let i = t.length - 1; i >= 0; i--) {
    const code = getCodePoint(t[i]);
    if (dp[i + 1]) {
      dp[i] = dp[i + 1].toSpliced(code, 1, i);
    } else {
      dp[i][code] = i;
    }
  }
  dpCache[t] = dp;
  return dp;
};

var isSubsequence = function (s, t) {
  /**
   * 核心: si 遍历 s, dpi 遍历 dp,
   *    if dp[dpi][s[si].codePointAt()] !== -1: 存在这个字符, si++, dpi = 新的下标 + 1
   *    else return false
   */
  const dp = getDp(t);
  let si = 0,
    dpi = 0;
  while (si < s.length && dpi < dp.length) {
    const code = getCodePoint(s[si]);
    const firstIdx = dp[dpi][code];
    if (firstIdx !== -1) {
      dpi = firstIdx + 1;
      si++;
    } else {
      return false;
    }
  }
  return si === s.length;
};

// (s = 'abc'), (t = 'ahbgdc');
// console.log('true: ', isSubsequence(s, t));
// (s = 'axc'), (t = 'ahbgdc');
// console.log('false: ', isSubsequence(s, t));
// (s = ''), (t = 'ahbgdc');
// console.log('true: ', isSubsequence(s, t));
// (s = 'aaaaaa'), (t = 'bbaaaa');
// console.log('false: ', isSubsequence(s, t));
(s = 'aza'), (t = 'abzba');
console.log('true: ', isSubsequence(s, t));
