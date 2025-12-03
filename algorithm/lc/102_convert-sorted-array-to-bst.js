/**
 * 108. 将有序数组转换为二叉搜索树
简单
给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。

提示：

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums 按 严格递增 顺序排列
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

var sortedArrayToBST1 = function (nums) {
  /**
   * 核心: 递归找中间点, 当做数的根节点
   */
  const buildTree = (_nums, s, e) => {
    const len = e - s + 1;
    if (len <= 0) {
      return null;
    }
    if (len === 1) {
      const n = new TreeNode(_nums[s]);
      return n;
    }

    const mid = Math.floor(len / 2) + s;
    const n = new TreeNode(_nums[mid], buildTree(_nums, s, mid - 1), buildTree(_nums, mid + 1, e));
    return n;
  };
  return buildTree(nums, 0, nums.length - 1);
};
