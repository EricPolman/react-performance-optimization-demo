import seedrandom from 'seedrandom';
import { GameBlock } from './GameContext';

export const generateRandomNumber = seedrandom('Team Rockstars IT');

export function calculateDistance(
  positionA: { x: number; y: number },
  positionB: { x: number; y: number },
  maxDistance: number
) {
  const distanceToMouse = {
    x: Math.abs(positionA.x - positionB.x),
    y: Math.abs(positionA.y - positionB.y),
  };

  const distance = Math.sqrt(
    distanceToMouse.x * distanceToMouse.x +
      distanceToMouse.y * distanceToMouse.y
  );

  const isWithinRange = distance <= maxDistance;

  const distanceRatio =
    Math.max(0, Math.min(maxDistance, distance)) / maxDistance;

  return {
    distance,
    isWithinRange,
    distanceRatio,
  };
}

export function calculateDistanceToMouse(
  position: { x: number; y: number },
  mousePosition: { x: number; y: number },
  maxDistance: number
) {
  return calculateDistance(position, mousePosition, maxDistance);
}

// Fast
const isPrime = (n: number, primes: number[]) => {
  let i = 1,
    p = primes[i],
    limit = Math.ceil(Math.sqrt(n));
  while (p <= limit) {
    if (n % p === 0) {
      return false;
    }
    i += 1;
    p = primes[i];
  }
  return true;
};

export function findNthPrime(nth: number) {
  let i,
    primes = [2, 3],
    n = 5;

  for (i = 2; i <= nth; i += 1) {
    while (!isPrime(n, primes)) {
      n += 2;
    }
    primes.push(n);
    n += 2;
  }
  return primes[nth - 1];
}

// Slow
// export function findNthPrime(nth: number) {
//   let i,
//     primes = [2, 3],
//     n = 5;
//   const isPrime = (n: number) => {
//     let i = 1,
//       p = primes[i],
//       limit = Math.ceil(Math.sqrt(n));
//     while (p <= limit) {
//       if (n % p === 0) {
//         return false;
//       }
//       i += 1;
//       p = primes[i];
//     }
//     return true;
//   };
//   for (i = 2; i <= nth; i += 1) {
//     while (!isPrime(n)) {
//       n += 2;
//     }
//     primes.push(n);
//     n += 2;
//   }
//   return primes[nth - 1];
// }
