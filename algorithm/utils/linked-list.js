function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const buildLinkedList = (numList) => {
  if (!numList.length) {
    return [];
  }
  const head = new ListNode(numList[0]);

  for (let i = 1, cur = head; i < numList.length; ++i) {
    cur.next = new ListNode(numList[i]);
    cur = cur.next;
  }

  return head;
};

const max = 100;
const logLinkedList = (head) => {
  let i = 0,
    res = [],
    cur = head;
  while (cur && typeof cur.val === 'number' && i < max) {
    res.push(cur.val);
    cur = cur.next;
    i++;
  }
  console.log(res.join(','));
  return res;
};

module.exports = {
  ListNode,
  buildLinkedList,
  logLinkedList,
};
