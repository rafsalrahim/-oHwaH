from tkinter import N


class ListNode:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next


class Solution:
    def __init__(self):
        self.head = None

    def print(self):
        print("data in list printing")
        if self.head == None:
            print("Empty")
            return
        itr = self.head
        while itr:
            print(itr.data)
            itr = itr.next

    def insert_at_end(self, data):
        if self.head == None:
            self.head = ListNode(data, None)
            return
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = ListNode(data, None)

    def insertionSortList(self):
        dummy_head = ListNode()
        curr = self.head

        while curr:
            prev_pointer = dummy_head
            next_pointer = dummy_head.next

            while next_pointer:
                if curr.data < next_pointer.data:
                    break
                prev_pointer = prev_pointer.next
                next_pointer = next_pointer.next

            temp = curr.next
            curr.next = next_pointer
            prev_pointer.next = curr

            curr = temp
        itr = dummy_head.next
        print('sorted data printing')
        while itr:
            print(itr.data)
            itr = itr.next


if __name__ == '__main__':
    ll = Solution()
    ll.insert_at_end(10)
    ll.insert_at_end(13)
    ll.insert_at_end(2)
    ll.insert_at_end(6)
    ll.insert_at_end(1)
    ll.insert_at_end(9)
    ll.print()
    ll.insertionSortList()
