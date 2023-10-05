#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 10
#define COUNT_PER_THREAD (1000000000 / NUM_THREADS)

long int sum = 0;
pthread_mutex_t mutex;

// Function that each thread runs
void *routine(void *arg)
{
    int *thread_num = (int *)arg;
    long int start = (*thread_num) * COUNT_PER_THREAD;
    long int end = start + COUNT_PER_THREAD;

    long int parcial = 0;

    // Calculate the partial sum for each thread
    for (long int i = start + 1; i <= end; i++)
    {
        // Lock the mutex before updating the shared sum
        pthread_mutex_lock(&mutex);
        sum = sum + i;
        pthread_mutex_unlock(&mutex);
    }

    // Exit the thread
    pthread_exit(NULL);
}

int main(int argc, char *argv[])
{
    // Record the start time
    clock_t begin = clock();

    pthread_t threads[NUM_THREADS];
    int thread_args[NUM_THREADS];

    // Initialize the mutex
    if (pthread_mutex_init(&mutex, NULL) != 0)
    {
        fprintf(stderr, "Error initializing mutex\n");
        return 1;
    }

    // Create threads
    for (int i = 0; i < NUM_THREADS; i++)
    {
        thread_args[i] = i;

        if (pthread_create(&threads[i], NULL, routine, &thread_args[i]) != 0)
        {
            fprintf(stderr, "Error creating thread %d\n", i);
            return 2;
        }
    }

    // Wait for threads to finish
    for (int i = 0; i < NUM_THREADS; i++)
    {
        if (pthread_join(threads[i], NULL) != 0)
        {
            fprintf(stderr, "Error joining thread %d\n", i);
            return 3;
        }
    }

    // Destroy the mutex
    pthread_mutex_destroy(&mutex);

    // Record the end time
    clock_t end = clock();
    double elapsed_time = (double)(end - begin) / CLOCKS_PER_SEC;
    printf("Elapsed time: %.4lf seconds\n", elapsed_time / NUM_THREADS);

    // Print the total sum
    printf("Total of sum: %ld\n", sum);
    return 0;
}