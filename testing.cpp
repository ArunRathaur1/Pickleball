#include<bits/stdc++.h>
using namespace std;
void solve(){
   long long n;
   cin>>n;
   long long start=1;
   long long ans=0;
   while(start<=n){
      long long tem=start;
      if((tem&n)!=0){
         ans=ans+(tem<<1)-1;
      }
      start=start<<1;
   }
   cout<<ans<<endl;
}
int main(){
   long long t;
   cin>>t;
   while(t--){
      solve();
   }
}