import { calculateDistanceToMouse, findNthPrime } from './utils';

// test('Find nth prime number should be very fast', () => {
//   const times: number[] = [];
//   for (let i = 0; i < 100; ++i) {
//     const time = +Date.now();
//     for (let x = 0; x < 100; ++x) {
//       findNthPrime(500);
//     }
//     const deltaTime = +Date.now() - time;
//     times.push(deltaTime);
//   }
//   console.log(times);
//   const totalTime = times.reduce((total, curr) => total + curr, 0);

//   expect(totalTime / times.length).toBeLessThan(30);
// });

test('Distance calculation function should be very fast', () => {
  const times: number[] = [];
  for (let i = 0; i < 100; ++i) {
    const time = process.hrtime.bigint();

    // Test here
    const mousePosition = {
      x: 100.5,
      y: 100.5,
    };
    for (let x = 0; x < 100; ++x) {
      for (let y = 0; y < 100; ++y) {
        calculateDistanceToMouse({ x, y }, mousePosition, 300);
      }
    }
    // End of test

    const deltaTime = Number(process.hrtime.bigint() - time) / 1000000;
    times.push(deltaTime);
  }
  console.log(times);
  const totalTime = times.reduce((total, curr) => total + curr, 0);

  expect(totalTime / times.length).toBeLessThan(1);
});
