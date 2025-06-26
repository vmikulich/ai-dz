// Web Worker for heavy computation
self.onmessage = (event) => {
  // Perform the heavy computation
  let t = 0;
  for (let i = 0; i < 1e8; i++) {
    t += i;
  }
  
  // Send the result back to the main thread
  self.postMessage(t);
};

// Need to declare this to make TypeScript happy with Web Workers
export {};