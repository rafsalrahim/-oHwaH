// Online Java Compiler
// Use this editor to write, compile and run your Java code online
class DoublyLinkedList {
    //A node class for doubly linked list
    class Node{
        int item;
        Node previous;
        Node next;

        public Node(int item) {
            this.item = item;
        }
    }
    //Initially, heade and tail is set to null
    Node head, tail = null;

    //add a node to the list
    public void addNodetoback(int item) {
        //Create a new node
        Node newNode = new Node(item);

        //if list is empty, head and tail points to newNode
        if(head == null) {
            head = tail = newNode;
            //head's previous will be null
            head.previous = null;
            //tail's next will be null
            tail.next = null;
        }
        else {
            //add newNode to the end of list. tail->next set to newNode
            tail.next = newNode;
            //newNode->previous set to tail
            newNode.previous = tail;
            //newNode becomes new tail
            tail = newNode;
            //tail's next point to null
            tail.next = null;
        }
    }
 // Adding a node at the front of the list
    public void addNodetofront(int new_data)
    {
        // 1. allocate node
        // 2. put in the data
        Node new_Node = new Node(new_data);

        // 3. Make next of new node as head
        // and previous as NULL
        new_Node.next = head;
        new_Node.previous = null;

        // 4. change prev of head node to new node
        if (head != null)
            head.previous = new_Node;

        // 5. move the head to point to the new node
        head = new_Node;
    }
    public void deletepositionnode(int n) {
         if(head == null) {
            return;
        }
        else {
            Node current = head;

              int pos =n;

            for(int i = 1; i < pos; i++){
                current = current.next;
            }

            if(current == head) {
                head = current.next;
            }
             else if(current == tail) {
                tail = tail.previous;
            }
            else {
                current.previous.next = current.next;
                current.next.previous = current.previous;
            }
             current = null;
        }
    }
        // Retrieves the first element of the Linked List
    public void getFirst() {

        // Throws an Exception if the List is empty
        if(head == null) {
          System.out.println("No elements found in Linked List");
              return;
        }

        // Returns the first element
        System.out.println("First elemenmt: " + head.item);
    }

    // Retrieves the last element of the Linked List
    public void getLast() {
        // Throws an Exception if the List is empty
        if(head == null) {
          System.out.println("No elements found in Linked List");
              return;
        }

        Node current = head;

        // The while loop takes us to the tail of the Linked
        // List
        while(current.next != null) {
            //Print each node and then go to next.
            current = current.next;
        }

        // Returns the last element
         System.out.println("Last elemenmt: ");
        System.out.println(current.item);
    }


//print all the nodes of doubly linked list
    public void printNodes() {
        //Node current will point to head
        Node current = head;
        if(head == null) {
            System.out.println("Doubly linked list is empty");
            return;
        }
        System.out.println("Nodes of doubly linked list: ");
        while(current != null) {
            //Print each node and then go to next.
            System.out.print(current.item + " ");
            current = current.next;
        }
    }
}
class Main{
    public static void main(String[] args) {
        //create a DoublyLinkedList object
        DoublyLinkedList dl_List = new DoublyLinkedList();
        //Add nodes to the list
        dl_List.addNodetoback(10);
        dl_List.addNodetoback(20);
        dl_List.addNodetoback(30);
        dl_List.addNodetoback(40);
        dl_List.addNodetoback(50);
        dl_List.addNodetofront(70);
        dl_List.printNodes();
        dl_List.deletepositionnode(2);
        //print the nodes of DoublyLinkedList
        dl_List.printNodes();
        dl_List.getFirst();
        dl_List.getLast();

    }
}