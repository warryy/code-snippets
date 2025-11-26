/**
给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 

示例 1：

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
示例 2：

输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 

提示：

1 <= haystack.length, needle.length <= 104
haystack 和 needle 仅由小写英文字符组成

 */
var buildKMPNext = (str) => {
  /**
   * 背景: 构建 next 数组, next[j] 含义为, 到当前位置j(包含j)为止，最长的“真前缀 = 真后缀”的长度(真: 前缀不为字符串本身)
   * 核心: i 从 1 遍历 str, k 为 next[i - 1] 的值, 即以上一个字符为结尾的最长子串的长度
   *    if str[i] === str[k]: next[i] = next[i - 1] + 1
   *    else 向前回溯k(k = next[k - 1]), 直到 k 为 0 或者 str[k] === str[i]
   *        if (str[k] === str[i]) 说明前缀最后一个字符和后缀最后一个字符匹配(但是不知道为什么可以认为: 前缀===后缀), next[i] = k + 1
   *        else next[i] = 0
   * 结束: i 超出 str 长度
   */
  let i = 1;
  let k = 0;
  const next = new Array(str.length).fill(-1);
  next[0] = 0;
  while (i < str.length) {
    if (str[i] === str[k]) {
      next[i] = next[i - 1] + 1;
      k++;
      i++;
    } else {
      while (k > 0 && str[i] !== str[k]) {
        k = next[k - 1];
      }
      if (str[i] === str[k]) {
        // 这里实在是想不通, 为什么找到上一个子串, 且上一个子串的尾部字符和当前字符是一样的, 就可以判定整个子串都是一样的呢?
        next[i] = k + 1;
        k++;
        i++;
      } else {
        next[i] = 0;
        i++;
      }
    }
  }
  return next;
};

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  /**
   * 背景: 通过 needle 构建 next 数组, next[j] 含义为, needle 第 0-j 个字符, 真前缀 === 真后缀的最大真前缀长度(真: 前缀不为字符串本身)
   * 核心: i 遍历长字符串, j遍历子串, i 不匹配的时候, 不去回退i, 而是回退 j(j 通过 next 数组进行回退)
   *    匹配则继续
   *    不匹配则将j进行回退: j = next[j-1]
   *        j如果为0, 还不匹配, 则i++(长字符串继续向后遍历)
   *        如果匹配, 则 i++, j++
   */
  /** 遍历长字符串 */
  let i = 0;
  /** 遍历子串 */
  let j = 0;
  const next = buildKMPNext(needle);
  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      if (j === needle.length - 1) {
        return i - needle.length + 1;
      }

      i++;
      j++;
    } else {
      while (j > 0 && haystack[i] !== needle[j]) {
        j = next[j - 1];
      }
      if (haystack[i] === needle[j]) {
        i++;
        j++;
      } else {
        i++;
      }
    }
  }
  return -1;
};

// str = 'ababa';
// console.log('buildKMPNext:\n', '00123\n', buildKMPNext(str).join(''));
// str = 'aaabbab';
// console.log('buildKMPNext:\n', '0120010\n', buildKMPNext(str).join(''));
// str = 'aabaaac';
// console.log('buildKMPNext:\n', '0101220\n', buildKMPNext(str).join(''));

(haystack = 'sadbutsad'), (needle = 'sad');
console.log('0: ', strStr(haystack, needle));
(haystack = 'leetcode'), (needle = 'leeto');
console.log('-1: ', strStr(haystack, needle));
(haystack = 'aabaaabaaac'), (needle = 'aabaaac');
console.log('4: ', strStr(haystack, needle));
