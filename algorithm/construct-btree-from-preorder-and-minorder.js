/**
 * 定义二叉树的节点结构
 * @param {number} val - 节点的值
 * @param {TreeNode} left - 左子树
 * @param {TreeNode} right - 右子树
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 根据先序遍历和中序遍历构建二叉树
 * @param {number[]} preorder - 先序遍历数组
 * @param {number[]} inorder - 中序遍历数组
 * @returns {TreeNode} 树的根节点
 */
function buildTree(preorder, inorder) {
  // 辅助函数：递归构建二叉树
  function build(preStart, inStart, inEnd) {
    // 递归到了叶子节点, 返回 null
    if (inStart > inEnd) return null;

    // 先序遍历中，当前根节点的值
    const rootVal = preorder[preStart];
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到当前根节点的索引
    const rootIndex = inorder.indexOf(rootVal);

    // 递归构建左子树
    root.left = build(preStart + 1, inStart, rootIndex - 1);

    // 递归构建右子树
    root.right = build(preStart + (rootIndex - inStart + 1), rootIndex + 1, inEnd);

    return root;
  }

  return build(0, 0, inorder.length - 1);
}

// 测试代码
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
const tree = buildTree(preorder, inorder);

// 输出构建的树的根节点
console.log(tree); // 输出: 根节点值为 3 的二叉树
