#include <iostream>
#include <cmath>
using namespace std;

bool isDisarium(int num)
{
   int temp = num;
   int length = 0;
   while (temp > 0)
   {
      length++;
      temp /= 10;
   }

   temp = num;
   int sum = 0;
   while (temp > 0)
   {
      int digit = temp % 10;
      sum += pow(digit, length);
      length--;
      temp /= 10;
   }

   return sum == num;
}

int main()
{
   int num;
   cout << "Enter a number: ";
   cin >> num;

   if (isDisarium(num))
      cout << num << " is a Disarium number." << endl;
   else
      cout << num << " is not a Disarium number." << endl;

   return 0;
}
