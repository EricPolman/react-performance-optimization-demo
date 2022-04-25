// This is a module worker, so we can use imports (in the browser too!)
import { findNthPrime } from '../src/utils';

addEventListener('message', (event) => {
  console.log(event);
  postMessage(findNthPrime(+event.data));
});
