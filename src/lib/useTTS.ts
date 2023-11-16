'use client'

import { useState, useEffect } from 'react'

export default function useTTS(language: string = 'pl-PL') {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const handleEnd = () => {
    setSpeaking(false)
  }

  const cancel = () => {
    if (!supported) return
    setSpeaking(false)
    window.speechSynthesis.cancel()
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true)
    }
  }, [])

  const speak = (text: string) => {
    if (!supported) return
    setSpeaking(true)
    const utterance = new window.SpeechSynthesisUtterance()
    utterance.text = text
    utterance.lang = language
    utterance.pitch = 0.85
    utterance.onend = handleEnd
    window.speechSynthesis.speak(utterance)
  }

  return {
    supported,
    speak,
    speaking,
    cancel,
  }
}
