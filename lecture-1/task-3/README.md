# Why "total blocking time" is high

The Total Blocking Time (TBT) in your application is high (600ms) because the Dashboard component is performing a heavy computation directly on the main thread. Specifically, the issue is in this code:

```typescript
useEffect(() => {
  let t = 0
  for (let i = 0; i < 1e8; i++) {
    t += i
  }
  setD(t)
}, [])
```

This loop iterates 100 million times, which blocks the main thread for a significant amount of time, preventing the browser from responding to user interactions and causing UI jank.

# Solution: Using Web Workers

I've implemented a solution that moves the heavy computation to a Web Worker, which runs in a separate thread and doesn't block the main UI thread:

1. Created a Web Worker (`computeWorker.ts`) that handles the heavy computation
2. Updated the Dashboard component to use this worker
3. Updated the Vite configuration to properly handle Web Workers

## How it works:

1. The Dashboard component creates a Web Worker when it mounts
2. The heavy computation runs in the worker thread instead of the main thread
3. When the computation is complete, the worker sends the result back to the main thread
4. The component updates its state with the result

This approach keeps the UI responsive while the computation is running.

## Metric Checklist for Re-measurement

After implementing this change, you should re-measure performance using Lighthouse with these specific metrics in mind:

1. **Total Blocking Time (TBT)** - Should be significantly reduced from 600ms
2. **First Input Delay (FID)** - Should improve as the main thread is no longer blocked
3. **Interaction to Next Paint (INP)** - Should show better responsiveness
4. **Time to Interactive (TTI)** - Should be faster as the page becomes interactive sooner
5. **Largest Contentful Paint (LCP)** - May improve slightly as resources are better allocated
6. **Cumulative Layout Shift (CLS)** - Should remain stable or improve

To perform the re-measurement:
1. Open Chrome DevTools
2. Go to the Lighthouse tab
3. Select "Performance" category
4. Run the audit in either mobile or desktop mode
5. Compare the new TBT value with the previous 600ms value
6. Check that other metrics have also improved

## Commit Message

```
fix: Move heavy computation to Web Worker to reduce Total Blocking Time

- Created Web Worker to handle CPU-intensive loop
- Updated Dashboard component to use the worker
- Added loading state for better UX
- Updated Vite config for Web Worker support
```

## PR Description

```
## Performance Optimization: Reduce Total Blocking Time

### Problem
The Dashboard component was running a heavy computation loop (100M iterations) directly on the main thread, 
causing a Total Blocking Time of 600ms and making the UI unresponsive during calculation.

### Solution
- Moved the computation to a Web Worker that runs in a separate thread
- Added proper loading state while computation is in progress
- Updated Vite configuration to support Web Workers

### Expected Results
- Significant reduction in Total Blocking Time (from 600ms)
- Improved responsiveness during computation
- Better Lighthouse performance scores

### Testing
Please verify with Lighthouse that the Total Blocking Time has been reduced.
```