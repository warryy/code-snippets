/**
 * 轴对称二叉树, 根节点一刀砍下, 左右子树轴对称
 * 
提示：

树中节点数目在范围 [1, 1000] 内
-100 <= Node.val <= 100
 

进阶：你可以运用递归和迭代两种方法解决这个问题吗？
 */
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }
  const depthTraversal = (left, right) => {
    if ((!left && right) || (left && !right)) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return depthTraversal(left.left, right.right) && depthTraversal(left.right, right.left);
  };
  return depthTraversal(root.left, root.right);
};
