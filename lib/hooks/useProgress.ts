"use client"

import { useState, useEffect, useCallback } from 'react'

interface LessonProgress {
  lessonKey: string
  completed: boolean
  completedAt: string | null
}

export function useProgress(courseId: string) {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({})
  const [hydrated, setHydrated] = useState(false)
  const storageKey = `emmaus_progress_${courseId}`

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setProgress(parsed)
      }
    } catch { /* ignore */ }
    setHydrated(true)
  }, [storageKey])

  const markComplete = useCallback((lessonIndex: number) => {
    const key = `lesson_${lessonIndex}`
    setProgress(prev => {
      const updated = {
        ...prev,
        [key]: { lessonKey: key, completed: true, completedAt: new Date().toISOString() }
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated))
      } catch { /* quota exceeded */ }
      return updated
    })
  }, [storageKey])

  const toggleComplete = useCallback((lessonIndex: number) => {
    const key = `lesson_${lessonIndex}`
    setProgress(prev => {
      const wasComplete = prev[key]?.completed ?? false
      const updated = {
        ...prev,
        [key]: { lessonKey: key, completed: !wasComplete, completedAt: !wasComplete ? new Date().toISOString() : null }
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated))
      } catch { /* quota exceeded */ }
      return updated
    })
  }, [storageKey])

  const isComplete = useCallback((lessonIndex: number) => {
    return progress[`lesson_${lessonIndex}`]?.completed ?? false
  }, [progress])

  const completedCount = Object.values(progress).filter(p => p.completed).length

  return { markComplete, toggleComplete, isComplete, completedCount, progress, hydrated }
}
