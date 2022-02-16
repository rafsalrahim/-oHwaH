class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next


class linkedlist:
    count = 0

    def __init__(self):
        self.head = None

    def insert_begining(self, data):
        self.head = Node(data, None)

    def print(self):
        if self.head == None:
            print("Empty")
            return
        itr = self.head
        while itr:
            print(itr.data)
            itr = itr.next

    def insert_at_end(self, data):
        if self.head == None:
            self.head = Node(data, None)
            return
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = Node(data, None)

    def num(self):
        itr = self.head
        while itr.next:
            self.count += 1
            itr = itr.next

    def sort(self, data):
        if self.head == None:
            self.head = Node(data, None)
            return
        itr = self.head
        while itr.next:
            if itr.data > data:
                tmp = self.Node(data, itr.data)
                itr = tmp


if __name__ == '__main__':
    ll = linkedlist()
    ll.insert_begining(10)
    ll.print()
    ll.insert_at_end(13)
    ll.insert_at_end(2)
    ll.insert_at_end(6)
    ll.insert_at_end(1)
    ll.insert_at_end(9)
    ll.print()
    ll.sort()
    print("sort")
    ll.print()
