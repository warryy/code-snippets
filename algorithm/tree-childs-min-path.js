/**
 * 树的节点结构
 * @param {number} val - 节点的值
 * @param {TreeNode[]} children - 子节点
 */
class TreeNode {
  constructor(val = 0, children = []) {
    this.val = val;
    this.children = children;
  }
}

/**
 * 查找从root节点到child1和child2的最短路径
 * @param {TreeNode} root - 树的根节点
 * @param {number} child1 - 子节点1的值
 * @param {number} child2 - 子节点2的值
 * @returns {number[]} 最短路径的节点值数组
 */
function findMinPath(root, child1, child2) {
  // 使用DFS找到从root到目标节点的路径
  function dfs(node, target, path) {
    if (!node) return null;

    // 将当前节点添加到路径中
    path.push(node.val);

    // 如果当前节点就是目标节点，返回路径
    if (node.val === target) {
      return path;
    }

    // 遍历所有子节点，寻找目标节点
    for (let child of node.children) {
      let result = dfs(child, target, [...path]); // 传递路径的副本
      if (result) return result;
    }

    // 如果没有找到目标节点，回溯
    return null;
  }

  // 获取从root到child1和child2的路径
  const path1 = dfs(root, child1, []);
  const path2 = dfs(root, child2, []);

  if (!path1 || !path2) {
    // 如果其中一个节点不存在，返回空数组
    return [];
  }

  // 找到路径交点（最小公共祖先）
  let i = 0;
  while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
    i++;
  }
  console.log(path1, path2, i, path1[i]);
  // 从路径1的公共祖先开始，连接路径1和路径2
  // path1.slice(0, i) 是从 root 到公共祖先的路径，path2.slice(i) 是从公共祖先到 child2 的路径
  // 注意，path2.slice(i) 是路径的后半部分，需要反向遍历
  const result = [...path1.slice(i).reverse(), path1[i - 1], ...path2.slice(i)];
  return result;
}

// 测试代码
const root = new TreeNode(1);
const child2 = new TreeNode(2);
const child3 = new TreeNode(3);
const child4 = new TreeNode(4);
const child5 = new TreeNode(5);
const root2 = new TreeNode(6);
// root.children = [root2];
// root2.children = [child2, child3, child4];
root.children = [child2, child3, child4];
child3.children = [child5];

const path = findMinPath(root, 2, 5);
console.log(path); // 输出：[2, 1, 3, 5]
