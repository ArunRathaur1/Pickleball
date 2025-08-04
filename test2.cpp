#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Node
{
    char data;
    Node *next;
};

class Stack
{
private:
    Node *top;

public:
    Stack()
    {
        top = nullptr;
    }
    void push(char ch)
    {
        Node *newNode = new Node();
        newNode->data = ch;
        newNode->next = top;
        top = newNode;
    }
    char pop()
    {
        if (isEmpty())
        {
            cout << "Stack is empty.\n";
            exit(0);
        }
        char popped = top->data;
        Node *temp = top;
        top = top->next;
        delete temp;
        return popped;
    }
    bool isEmpty()
    {
        return top == nullptr;
    }
};

int main()
{
    Stack s;
    int n;

    cout << "Enter number of random uppercase characters to push: ";
    cin >> n;


    srand(time(0));
    cout << "\nPushing characters onto the stack:\n";
    for (int i = 0; i < n; ++i)
    {
        char ch = 'A' + rand() % 26;
        cout << "Pushed: " << ch << endl;
        s.push(ch);
    }
    cout << "\nPopping characters from the stack:\n";
    while (!s.isEmpty())
    {
        char ch = s.pop();
        cout << "Popped: " << ch << endl;
    }

    cout << "\nStack is empty. Program terminated.\n";
    return 0;
}
