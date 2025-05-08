'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/db'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

export function ClientInitWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    (async () => {
      setProgress(25)
      try {
        await db.open() // explizit öffnen, Initialisierung triggern
        setProgress(50)
      } catch (err) {
        console.log(err)
        setProgress(0)
      }
      setProgress(75)
      setProgress(100)
      setReady(true)
    })()
  }, [])

  if (!ready) return <main className="flex flex-col items-center justify-center h-full">
      <Progress value={progress} className="w-50"></Progress>
  </main>

  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    >{children}</motion.div>
}
