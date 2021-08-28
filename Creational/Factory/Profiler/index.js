import { createProfiler } from "./createProfiler";
function getAllFactors (intNumber) {
  const profiler = createProfiler(`Finding all factors of ${intNumber}`);
  profiler.start();
  const factors = [];
  for (let factor = 2; factor <= intNumber; factor++) {
    while ((intNumber % factor) === 0) {
      factors.push(factor);
      intNumber = intNumber / factor;
    }
  }
  profiler.end();

  return factors;
}

const myNumber = process.argv[2];
const myFactors = getAllFactors(myNumber);
console.info(`Factors of ${myNumber} are: `, myFactors);
