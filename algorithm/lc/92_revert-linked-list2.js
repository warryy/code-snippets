/**
 * 反转指定区间的链表
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 
示例 1：

输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]
示例 2：

输入：head = [5], left = 1, right = 1
输出：[5]
 

提示：

链表中节点数目为 n
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 

进阶： 你可以使用一趟扫描完成反转吗？
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const { buildLinkedList, logLinkedList, ListNode } = require('../utils/linked-list');
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  /**
    定义一个cur, 用于遍历链表
    定义一个链表头 resHead, 用于返回反转后的链表
    定义一个 reverseHeadPre, 当做反转的链表的头, 这个初始化时要指向 resHead(考虑到left === head的时候)

    保存leftPre, left, right, rightAfter, 然后[left, right]反转, leftPre->result->rightAfter
     */

  if (left === right) {
    return head;
  }

  // 定义一个链表头 resHead, 用于返回反转后的链表
  const resHead = new ListNode(0, head);
  let reverseHeadPre = resHead;

  // 找到left节点的前一个节点
  for (let i = 1; i < left; ++i) {
    reverseHeadPre = reverseHeadPre.next;
  }

  let leftNode = reverseHeadPre.next;
  let cur = reverseHeadPre.next;
  // 将[left, right]全部反转
  for (let i = 0; i <= right - left; ++i) {
    const temp = cur.next;
    cur.next = reverseHeadPre.next;
    reverseHeadPre.next = cur;
    cur = temp;
  }

  leftNode.next = cur;

  return resHead.next;
};

var head = buildLinkedList([1, 2, 3, 4, 5]),
  left = 2,
  right = 4;
console.log('1,4,3,2,5: ');
logLinkedList(reverseBetween(head, left, right));

var head = buildLinkedList([5]),
  left = 1,
  right = 1;
console.log('5: ');
logLinkedList(reverseBetween(head, left, right));

var head = buildLinkedList([3, 5]),
  left = 1,
  right = 1;
console.log('3,5: ');
logLinkedList(reverseBetween(head, left, right));

var head = buildLinkedList([3, 5]),
  left = 1,
  right = 2;
console.log('5,3: ');
logLinkedList(reverseBetween(head, left, right));
