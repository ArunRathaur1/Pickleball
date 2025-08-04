#include <bits/stdc++.h>
using namespace std;
void count(string s,int index,int n,string&tem,vector<string>&ans){
    if(index>=n){
        ans.push_back(tem);
        return;
    }
    tem.push_back(char(s[index]-'1'+'a'));
    count(s,index+1,n,tem,ans);
    tem.pop_back();
    if(index+1<n){
        int value=(s[index]-'0')*10+(s[index+1]-'0');
        if(value<=26){
            tem.push_back(char(value+'a'-1));
            count(s,index+2,n,tem,ans);
            tem.pop_back();
        }
    }
}
int main() {
	string s;
	cin>>s;
	vector<string>ans;
	string tem="";
	int index=0;
	int n=s.length();
	count(s,index,n,tem,ans);
	for(auto i: ans){
	    cout<<i<<" ";
	}
	return -1;

}
