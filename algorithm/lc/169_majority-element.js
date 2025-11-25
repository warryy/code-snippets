/**
 * 
相关标签
premium lock icon
相关企业
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1：

输入：nums = [3,2,3]
输出：3
示例 2：

输入：nums = [2,2,1,1,1,2,2]
输出：2
 

提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109
输入保证数组中一定有一个多数元素。
 

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  /**
   * 背景分析: 多数数组, 非空且一定存在多数. 可以理解为, 一个数组中的多数: n, 和其他不同数字一对一抵消掉, 最终一定会剩下多余的n
   * 核心: 遍历数组, 并记录当前数字以及出现次数, 如果数字和下一个数字相同则次数+1, 反之-1, 为0时, 将下一个新数字替换为当前数字
   */
  if (nums.length <= 2) {
    return nums[0];
  }
  let cur = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      cur = nums[i];
    }

    if (cur === nums[i]) {
      count++;
    } else {
      count--;
    }
  }
  return cur;
};

nums = [3, 2, 3];
console.log(majorityElement(nums));
nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums));
