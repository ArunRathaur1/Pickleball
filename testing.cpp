#include <bits/stdc++.h>
using namespace std;

long long cost(int x)
{
    if (x == 0)
        return 3; 
    return (long long)pow(3, x + 1) + 1LL * x * (long long)pow(3, x - 1);
}

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        long long n;
        cin >> n;
        long long ans = 0;
        int pos = 0;
        while (n > 0)
        {
            int digit = n % 3;
            if (digit > 0)
            {
                ans += 1LL * digit * cost(pos);
            }
            n /= 3;
            pos++;
        }
        cout << ans << "\n";
    }
    return 0;
}
