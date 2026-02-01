#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        vector<vector<int>>ar;
        for(int i=0;i<n-1;i++){
            int a,b,x,y;
            cin>>a>>b>>x>>y;
            ar.push_back({a,b,x,y});
        }
        vector<vector<int>>m(n);
        for(int i=0;i<n;i++){
            int c1=max(ar[i][0],ar[i][1]);
            int c2=min(ar[i][0],ar[i][1]);
            if(ar[i][2]>ar[i][3]){
                m[c1-1].push_back(c2-1);
            }
            else{
                m[c2-1].push_back(c1-1);
            }
        }
        cout<<"hello"<<endl;
        for(int i=0;i<n;i++){
            cout<<i<<"->";
            for(auto k: m[i]){
                cout<<k<<" ";
            }
            cout<<endl;
        }
        vector<int>indgree(n,0);
        vector<int>ans;
        for(int i=0;i<n;i++){
            for(auto j: m[i]){
                indgree[j]++;
            }
        }
        std::queue<int>q;
        for(int i=0;i<n;i++){
            if(indgree[i]==0){
                q.push(i);
            }
        }
        while(!q.empty()){
            int tem=q.front();
            q.pop();
            ans.push_back(tem);
            for(auto i: m[tem]){
                indgree[i]--;
                if(indgree[i]==0){
                    q.push(i);
                }
            }
        }
        for(int i=0;i<n;i++){
            cout<<ans[i]+1<<" ";
        }
        cout<<endl;
        
    }
}
