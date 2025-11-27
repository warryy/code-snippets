/**
给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

 

示例 1：

输入：nums = [1,2,3,1], k = 3
输出：true
示例 2：

输入：nums = [1,0,1,1], k = 1
输出：true
示例 3：

输入：nums = [1,2,3,1,2,3], k = 2
输出：false
 

 

提示：

1 <= nums.length <= 105
-109 <= nums[i] <= 109
0 <= k <= 105
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  /**
   * 核心: 维护一个最大大小为k的滑动窗口
   */
  const n = nums.length;
  if (n <= 1) {
    return false;
  }

  let s = 0,
    e = 0;
  const cache = new Set();

  while (e < n && s <= e) {
    if (cache.has(nums[e])) {
      return true;
    }
    cache.add(nums[e]);
    e++;
    if (e - s > k) {
      cache.delete(nums[s]);
      s++;
    }
  }
  return false;
};

(nums = [1, 2, 3, 1]), (k = 3);
console.log('true: ', containsNearbyDuplicate(nums, k));
(nums = [1, 0, 1, 1]), (k = 1);
console.log('true: ', containsNearbyDuplicate(nums, k));
(nums = [1, 2, 3, 1, 2, 3]), (k = 2);
console.log('false: ', containsNearbyDuplicate(nums, k));
