/**
 * 反转二叉树
给你一棵二叉树的根节点 root ，翻转这棵二叉树(所有节点的左右子树互换位置)，并返回其根节点。
 
提示：

树中节点数目范围在 [0, 100] 内
-100 <= Node.val <= 100
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  return new TreeNode(root.val, invertTree(root.right), invertTree(root.left));
};
