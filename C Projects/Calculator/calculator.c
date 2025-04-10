#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

#define pi 3.141592653589793238462643383279502884197169399375105
#define e 2.718281828459045235360287471352662497757247

float addition() {
    int n;
    printf("Enter the number of elements you want to add: ");
    scanf("%d", &n);
    float a[n];
    float sum = 0;
    for (int i = 1; i <= n; i++) {
        printf("Enter the number %d: ", i);
        scanf("%f", &a[i - 1]);
        sum += a[i - 1];
    }
    printf("The sum is: %.2f\n", sum);
    return sum;
}

float subtraction() {
    int n;
    printf("Enter the number of elements you want to subtract: ");
    scanf("%d", &n);
    float a[n];
    float diff = a[0];
    for (int i = 1; i < n; i++) {
        printf("Enter the number %d: ", i + 1);
        scanf("%f", &a[i]);
        diff -= a[i];
    }
    printf("The diff is: %.2f \n", diff);
    return diff;
}

float multiplication() {
    int n;
    printf("Enter the number of elements you want to multiply: ");
    scanf("%d", &n);
    float a[n];
    float prod = 1;
    for (int i = 1; i <= n; i++) {
        printf("Enter the number %d: ", i);
        scanf("%f", &a[i - 1]);
        prod *= a[i - 1];
    }
    printf("The product is: %.2f\n", prod);
    return prod;
}

int main() {
    while (1) {
        printf("Enter your choice (add, sub, mul, exit): ");
        char ch[50];
        scanf("%49s", ch); // Prevent buffer overflow

        if (strcmp(ch, "add") == 0) {
            addition();
        } else if (strcmp(ch, "sub") == 0) {
            subtraction();
        } else if (strcmp(ch, "mul") == 0) {
            multiplication();
        } else if (strcmp(ch, "exit") == 0) {
            break;
        } else {
            printf("Invalid choice\n");
        }
    }
    return 0;
}
