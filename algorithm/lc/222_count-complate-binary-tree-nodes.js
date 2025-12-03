/**
给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层（从第 0 层开始），则该层包含 1~ 2h 个节点。

示例 1：

输入：root = [1,2,3,4,5,6]
输出：6
示例 2：

输入：root = []
输出：0
示例 3：

输入：root = [1]
输出：1
 
提示：

树中节点的数目范围是[0, 5 * 104]
0 <= Node.val <= 5 * 104
题目数据保证输入的树是 完全二叉树
 
进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
 */
var getDepth = (root) => {
  let maxDepth = 0;
  let cur = root;
  while (cur) {
    maxDepth += 1;
    cur = cur.left;
  }
  return maxDepth;
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
  /**
   * 核心: 完全二叉树的左子树和右子树, 一定有一棵是满二叉树
   *
   */
  if (!root) {
    return 0;
  }
  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);

  // 左子树是满的
  if (leftDepth === rightDepth) {
    return (1 << leftDepth) + countNodes(root.right);
  } else {
    // 右子树是满的
    return (1 << rightDepth) + countNodes(root.left);
  }
};
