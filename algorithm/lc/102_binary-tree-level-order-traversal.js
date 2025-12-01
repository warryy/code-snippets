/**
 * 二叉树的层序遍历/二叉树广度有限遍历
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

示例 1：


输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
示例 2：

输入：root = [1]
输出：[[1]]
示例 3：

输入：root = []
输出：[]
 

提示：

树中节点数目在范围 [0, 2000] 内
-1000 <= Node.val <= 1000
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  /**
   * 核心: 广度优先遍历模板, 定义一个队列, 每层的节点都bush到这个队列中
   */
  if (!root) {
    return [];
  }
  const res = [];
  let queue = [root];
  while (queue.length) {
    const _list = [];
    const _queue = [];
    while (queue.length) {
      const node = queue.shift();
      _list.push(node.val);

      node.left && _queue.push(node.left);
      node.right && _queue.push(node.right);
    }
    queue = _queue;
    res.push(_list);
  }
  return res;
};

var levelOrder2 = function (root) {
  if (!root) {
    return [];
  }
  const res = [];
  const fn = (node, depth) => {
    if (!node) {
      return;
    }
    if (res[depth - 1]) {
      res[depth - 1].push(node.val);
    } else {
      res[depth - 1] = [node.val];
    }

    fn(node.left, depth + 1);
    fn(node.right, depth + 1);
  };
  fn(root, 1);
  return res;
};
