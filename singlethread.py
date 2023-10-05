import time

# Get the start time
start_time = time.time()

# Calculate the sum of the range
total = 0

for i in range(1000000001):
    total += i

print("Total of sum:", total)

# Get the end time
end_time = time.time()
print("Elapsed time:", end_time - start_time, "seconds")
