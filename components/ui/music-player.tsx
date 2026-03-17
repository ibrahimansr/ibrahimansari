'use client'

import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Music2 } from 'lucide-react'

const TRACKS = [
  { src: '/got-that-feeling.mp3', name: 'got that feeling' },
  { src: '/2TONE feat. Don Toliver.mp3', name: '2TONE feat. Don Toliver' },
  { src: '/As We Speak feat. Drake Official Audio.mp3', name: 'As We Speak feat. Drake' },
  { src: '/Cold Official Video.mp3', name: 'Cold' },
  { src: '/Dean Martin Everybody Loves Somebody.mp3', name: 'Everybody Loves Somebody' },
  { src: '/Drake Jimmy Cooks ft 21 Savage.mp3', name: 'Jimmy Cooks ft 21 Savage' },
  { src: '/Fly Me To The Moon - Frank Sinatra.mp3', name: 'Fly Me To The Moon' },
  { src: '/Humsafar OST by Qurat-ul-Ain Balouch.mp3', name: 'Humsafar OST' },
  { src: '/NEMZZZ 8PM Official Video.mp3', name: 'NEMZZZ 8PM' },
  { src: '/SAJNA DA DIL TORYA _ VIDEO SONG - 4K _ KABHI MAIN KABHI TUM _ MUSTAFA x SHARJEENA.mp3', name: 'Sajna Da Dil Torya' },
]

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const track = TRACKS[currentIndex]

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().catch(() => {})
    setPlaying(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const toggle = () => {
    if (playing) pause()
    else play()
  }

  const selectTrack = (index: number) => {
    setCurrentIndex(index)
    setPlaying(false)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setCurrentIndex((i) => (i + 1) % TRACKS.length)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = track.src
    audioRef.current.load()
  }, [currentIndex])

  return (
    <>
      <audio ref={audioRef} preload="metadata" className="hidden" />
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="min-h-[44px] min-w-[44px] flex items-center gap-2 rounded-lg border border-white/25 bg-black/70 px-3 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
          aria-label={open ? 'Close music player' : 'Open music player'}
        >
          <Music2 size={18} />
          <span className="hidden sm:inline">{open ? 'Close' : 'Music'}</span>
        </button>
        {open && (
          <div
            className="absolute bottom-full right-0 mb-2 w-[min(calc(100vw-2rem),18rem)] max-h-[60vh] overflow-hidden rounded-lg border border-white/25 bg-black/85 shadow-xl flex flex-col"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            <div className="p-3 border-b border-white/15 flex items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                className="flex-shrink-0 min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <span className="text-sm text-white/95 truncate">{track.name}</span>
            </div>
            <ul className="overflow-y-auto py-2 max-h-[50vh]">
              {TRACKS.map((t, i) => (
                <li key={t.src}>
                  <button
                    type="button"
                    onClick={() => selectTrack(i)}
                    className={`w-full text-left px-4 py-3 min-h-[44px] text-sm transition-colors touch-manipulation ${
                      i === currentIndex
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
