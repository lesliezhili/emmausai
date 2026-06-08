"use client"

import { useState, useEffect, useCallback } from 'react'

interface Bookmark {
  courseId: string
  lessonIndex: number
  title: string
  savedAt: string
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const storageKey = 'emmaus_bookmarks'

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try { setBookmarks(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }, [])

  const toggleBookmark = useCallback((courseId: string, lessonIndex: number, title: string) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.courseId === courseId && b.lessonIndex === lessonIndex)
      const updated = exists
        ? prev.filter(b => !(b.courseId === courseId && b.lessonIndex === lessonIndex))
        : [...prev, { courseId, lessonIndex, title, savedAt: new Date().toISOString() }]
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isBookmarked = useCallback((courseId: string, lessonIndex: number) => {
    return bookmarks.some(b => b.courseId === courseId && b.lessonIndex === lessonIndex)
  }, [bookmarks])

  return { bookmarks, toggleBookmark, isBookmarked }
}
