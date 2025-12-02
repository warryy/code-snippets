/**
 * 轴对称二叉树, 根节点一刀砍下, 左右子树轴对称
 * 
提示：

树中节点数目在范围 [1, 1000] 内
-100 <= Node.val <= 100
 

进阶：你可以运用递归和迭代两种方法解决这个问题吗？
 */
// 递归版本
var isSymmetric = function (root) {
  /**
   * 核心: 对称: 左子树的左子树和右子树的右子树对称, 左子树的右子树和右子树的左子树对称
   */
  if (!root) {
    return true;
  }
  const depthTraversal = (left, right) => {
    if (!left && !right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return depthTraversal(left.left, right.right) && depthTraversal(left.right, right.left);
  };
  return depthTraversal(root.left, root.right);
};

// 迭代版本
var isSymmetric2 = function (root) {
  /**
   * 核心: 广度优先遍历两个子树, 左右子树分别从左向右和从右向左遍历, 空子节点要加一个空, 如果遍历数据一致, 说明
   */
  const check = (left, right) => {
    const queue1 = [left];
    const queue2 = [right];
    while (queue1.length || queue2.length) {
      const v1 = queue1.shift();
      const v2 = queue2.shift();
      if (!v1 && !v2) {
        // 这里一定要注意, 要是continue, 而不是return false
        continue;
      }
      if (!v1 || !v2) {
        return false;
      }
      if (v1.val !== v2.val) {
        return false;
      }

      queue1.push(v1.left);
      queue2.push(v2.right);

      queue1.push(v1.right);
      queue2.push(v2.left);
    }
    return true;
  };

  return check(root, root);
};
