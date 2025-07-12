#include<bits/stdc++.h>
using namespace std;
class node{
    node* prev;
    node* next;
    int val;
    node(int value){
        val=value;
        prev=NULL;
        next=NULL;
    }
    void insert(int value){
        node* tem=this;
        node* newnode=new node(value);
        tem->next=newnode;
        newnode->prev=tem;
    }
    void printlist(){
        
    }
};
int main(){

}