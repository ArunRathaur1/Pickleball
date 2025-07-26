#include<bits/stdc++.h>
using namespace std;
int countsubset(vector<int>&ar,int index,int sum){
    if (sum == 0)
    {
       return 1;
    }
    if(sum<0||index>=ar.size())return 0;
    int c1=countsubset(ar,index+1,sum-ar[index]);
    int c2=countsubset(ar,index+1,sum);
    return c1+c2;
}
int subSetWithSumK(vector<int>ar,int k){
    int n=ar.size();
    int count = countsubset(ar, 0, k);
    return count;
}
int main(){
    vector<int>ar={3,4,5,2,1,5};
    int k=10;
    int count=subSetWithSumK(ar,k);
    cout<<count<<endl;
}