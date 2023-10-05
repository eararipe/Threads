#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>

long int sum = 0;

int main(int argc, char *argv[])
{
    // Record the start time
    clock_t begin = clock();

    // Calculate the sum
    for (long int i = 1; i <= 1000000000; i++)
    {
        sum = sum + i;
    }

    // Record the end time
    clock_t end = clock();
    double elapsed_time = (double)(end - begin) / CLOCKS_PER_SEC;
    printf("Elapsed time: %.4lf seconds\n", elapsed_time);

    // Print the total sum
    printf("Total of sum: %ld\n", sum);
    return 0;
}