/**
530. 二叉搜索树的最小绝对差
简单
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

差值是一个正数，其数值等于两值之差的绝对值。

提示：

树中节点的数目范围是 [2, 104]
0 <= Node.val <= 105
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
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let min = Infinity;
  const depthTraversal = (node) => {
    if (!node) {
      return [];
    }
    return depthTraversal(node.left).concat([node.val]).concat(depthTraversal(node.right));
  };
  const res = depthTraversal(root);
  for (let i = 0; i < res.length - 1; ++i) {
    min = Math.min(res[i + 1] - res[i], min);
  }
  return min;
};

var getMinimumDifference = function (root) {
  let min = Infinity;

  let pre = -1;
  const dfs = (node) => {
    if (!node) {
      return;
    }
    dfs(node.left);
    min = pre === -1 ? min : Math.min(node.val - pre, min);
    pre = node.val;
    dfs(node.right);
  };

  return min;
};
