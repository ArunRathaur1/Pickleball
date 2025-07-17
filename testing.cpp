#include<bits/stdc++.h>
using namespace std;
class Queue{
    vector<int>ar;
    int front;
    int rear;
    int currsize;
    Queue(int size){
        ar.resize(size);
        front=-1;
        rear=-1;
        currsize=0;
    }
    void pushelement(int value){
        if(currsize==size)
    }
}
int main(){
    int n;
    cin>>n;
    vector<int>ans;
    for(int i=2;i<=sqrt(n);i++){
        if(n%i==0){
            ans.push_back(i);
            while(n%i==0){
                n=n/i;
            }
        }
    }
    if(n!=1){
        ans.push_back(n);
    }
    for(auto i: ans){
        cout<<i<<" ";
    }
}