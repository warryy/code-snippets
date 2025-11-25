/**
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

 

说明：

为什么返回数值是整数，但输出的答案是数组呢？

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
 

示例 1：

输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
示例 2：

输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应返回新长度 length = 7, 并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
 

提示：

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
nums 已按升序排列
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  /**
   * 核心: 快慢指针, 慢指针指向有效数组的后一位, 快指针遍历数组, 如果数据和前2个不同, 将快指针数据插入有效数组后面
   * 结束标志: 快指针遍历完数组
   *
   * 细节1: 为什么slow和fast起始都要从2开始?
   *    如果从有效数组的最后一位下标开始, 每次对比需要对比 nums[slow - 1] 和 fast, 这个对于抽象成通用算法: 即允许k个数字重复, 不方便
   */
  const k = 2;
  if (nums.length <= k) {
    return nums.length;
  }

  let slow = k,
    fast = k;

  while (fast < nums.length) {
    if (nums[fast] !== nums[slow - k]) {
      nums[slow] = nums[fast];
      slow++;
      fast++;
    } else {
      fast++;
    }
  }

  return slow;
};
nums = [1, 1, 1, 2, 2, 3];
console.log(removeDuplicates(nums), nums);
nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
console.log(removeDuplicates(nums), nums);
