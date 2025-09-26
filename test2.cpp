#include <bits/stdc++.h>
using namespace std;

int main()
{
    // your code goes here
    int t;
    cin >> t;
    while (t--)
    {
        int n,m;
        cin>>n>>m;
        if(n!=0&& m!=0){
            string ans="";
            for(int i=0;i<2*(n-1);i++){
                ans.push_back('<');
            }
            string s1="";
            for(int i=0;i<m;i++){
                s1.push_back('<');
                s1.push_back('>');
            }
            ans.append("<"+s1);
            cout<<ans<<endl;
        }
        else if(n==0){
            if(m==1){
                cout<<">"<<endl;
                continue;
            }
            else{
                string s1=">=>";
                string s2="";
                for(int i=0;i<m-2;i++){
                    s2.push_back('>');
                    s2.push_back('<');
                }
                s2=s2+s1;
                cout<<s2<<endl;
            }
        }
        else{
            if(n==1){
                cout<<"<"<<endl;
                continue;
            }
            string s1="<=<";
            string s2="";
            for(int i=0;i<n-2;i++){
                s2.push_back('<');
                s2.push_back('<');
            }
            s2.append(s1);
            cout<<s2<<endl;
        }
    }
}
