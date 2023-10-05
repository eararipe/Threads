// Get the start time as a BigInt
const startTime = process.hrtime.bigint();

// Calculate the sum of BigInt numbers within a range
let sum = BigInt(0);

for (let i = BigInt(0); i <= BigInt(1000000000); i++) {
  sum += i;
}

// Log the total sum as a string (to avoid displaying it as scientific notation)
console.log(`Total sum of all numbers.......: ${sum.toString()}`);

// Get the end time as a BigInt
const endTime = process.hrtime.bigint();

// Calculate elapsed time in nanoseconds, convert it to seconds, and format it
const elapsedTime = Number(endTime - startTime) / 1e9;
console.log(`Elapsed time: ${elapsedTime.toFixed(3)} seconds`);
