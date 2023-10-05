// Import necessary modules from the 'worker_threads' package
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

// Function to calculate the sum of BigInt numbers within a range
function countNumbers(start, end, callback) {
  let count = BigInt(0);
  for (let i = BigInt(start); i <= BigInt(end); i++) {
    count += i;
  }
  callback(count);
}

// Check if the current script is the main thread
if (isMainThread) {
  // Get the start time as a BigInt
  const startTime = process.hrtime.bigint();

  // Define the number of worker threads and the range of numbers for each worker
  const numWorkers = 10;
  const numbersPerWorker = 1000000000 / numWorkers;

  // Initialize variables to store the total sum and count completed workers
  let totalSum = BigInt(0);
  let completedWorkers = 0;

  // Loop to create and manage worker threads
  for (let i = 0; i < numWorkers; i++) {
    const start = i * numbersPerWorker + 1;
    const end = (i + 1) * numbersPerWorker;

    // Create a new worker thread and pass the range as workerData
    const worker = new Worker(__filename, {
      workerData: { start, end },
    });

    // Listen for messages from worker threads
    worker.on("message", (message) => {
      // Accumulate the result from each worker
      totalSum += message.result;
      completedWorkers++;

      // When all workers have completed their tasks
      if (completedWorkers === numWorkers) {
        // Log the total sum as a string (to avoid displaying it as scientific notation)
        console.log(`Total of sum: ${totalSum.toString()}`);

        // Get the end time as a BigInt
        const endTime = process.hrtime.bigint();

        // Calculate elapsed time in nanoseconds, convert it to seconds, and format it
        const elapsedTime = Number(endTime - startTime) / 1e9;
        console.log(`Elapsed time: ${elapsedTime.toFixed(3)} seconds`);
      }
    });
  }
} else {
  // This code is executed within worker threads

  // Retrieve the start and end values for this worker from workerData
  const { start, end } = workerData;

  // Call the countNumbers function to calculate the sum
  countNumbers(start, end, (result) => {
    // Send the result back to the main thread via parentPort
    parentPort.postMessage({ start, end, result });
  });
}
