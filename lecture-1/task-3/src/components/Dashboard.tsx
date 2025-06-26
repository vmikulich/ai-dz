import { useState, useEffect } from "react"

export default function Dashboard() {
  const [d, setD] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Create a new worker
    const worker = new Worker(
      new URL('../workers/computeWorker.ts', import.meta.url),
      { type: 'module' }
    )
    
    // Set up the message handler to receive results from the worker
    worker.onmessage = (event) => {
      setD(event.data)
      setIsLoading(false)
    }
    
    // Start the worker
    worker.postMessage({})
    
    // Clean up the worker when the component unmounts
    return () => {
      worker.terminate()
    }
  }, [])
  
  return (
    <div>
      {isLoading ? 'Computing...' : d}
    </div>
  )
}