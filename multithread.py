import threading
import time

# Get the start time
start_time = time.time()

# Function to calculate the sum of a portion of the range


def calculate_partial_sum(start, end, result):
    partial_sum = 0
    for i in range(start, end):
        partial_sum += i
    result.append(partial_sum)


# Define the number of threads
num_threads = 10
range_start = 1
range_end = 1000000001
step = (range_end - range_start) // num_threads

# Create a list to store thread objects
threads = []

# Create a list to store results from each thread
results = []

# Loop through a range of threads to perform parallel calculations
for i in range(num_threads):
    # Calculate the start and end values for the current thread's task
    start = range_start + i * step
    end = start + step if i < num_threads - 1 else range_end

    # Initialize an empty list to store the result of the current thread's calculation
    result = []

    # Create a new thread with the calculate_partial_sum function as the target,
    # and pass the start, end, and result as arguments to the function
    thread = threading.Thread(
        target=calculate_partial_sum, args=(start, end, result))

    # Append the thread to a list of threads
    threads.append(thread)

    # Append the result list to a list of results (one for each thread)
    results.append(result)

    # Start the thread to execute the calculation
    thread.start()


# Wait for all threads to complete
for thread in threads:
    thread.join()

# Calculate the total sum
total = sum(sum(result) for result in results)
print("Total of sum:", total)

# Get the end time
end_time = time.time()
print("Elapsed time:", end_time - start_time, "seconds")
