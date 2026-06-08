"use client"

import { useState, useRef } from 'react'
import { Volume2, VolumeX, Play, Pause, SkipForward } from 'lucide-react'

interface AudioBibleProps {
  bibleRef: string  // e.g. "John 3:16" or "Romans 8:1-39"
}

// Maps Bible references to free audio (Bible.is / Faith Comes By Hearing)
// Using the free Digital Bible Platform API (ESV audio, public domain KJV narration)
function getAudioUrl(ref: string): string | null {
  // Parse book and chapter from reference
  const match = ref.match(/^(\d?\s?[A-Za-z]+)\s+(\d+)/)
  if (!match) return null
  
  const book = match[1].trim()
  const chapter = match[2]
  
  // Bible.is book codes (ENGESV — English ESV audio)
  const bookCodes: Record<string, string> = {
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
    'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
    '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
    'Psalm': 'PSA', 'Psalms': 'PSA', 'Proverbs': 'PRO', 'Ecclesiastes': 'ECC',
    'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Ezekiel': 'EZK', 'Daniel': 'DAN',
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
    'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
    'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
    '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
    'Titus': 'TIT', 'Hebrews': 'HEB', 'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE',
    '1 John': '1JN', 'Revelation': 'REV',
  }
  
  const code = bookCodes[book]
  if (!code) return null
  
  // Use ESV.org free audio (their public listening endpoint)
  const chapterPadded = chapter.padStart(3, '0')
  return `https://audio.esv.org/hw/mq/${code}${chapterPadded}.mp3`
}

export default function AudioBible({ bibleRef }: AudioBibleProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Get first reference
  const firstRef = bibleRef.split(';')[0].trim()
  const audioUrl = getAudioUrl(firstRef)
  
  if (!audioUrl) return null

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg border border-primary-100">
      <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
      <button onClick={togglePlay} className="p-1.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition">
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
      <span className="text-xs text-primary-700 font-medium flex-1">
        🎧 {firstRef}
      </span>
      <button onClick={toggleMute} className="p-1 text-primary-600 hover:text-primary-800">
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
