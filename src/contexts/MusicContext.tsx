import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TRACKS } from '../data/tracks';

type MusicContextValue = {
  currentSongIndex: number;
  isPlaying: boolean;
  currentSong: (typeof TRACKS)[number];
  playSong: (index: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  togglePlayPause: () => void;
  setIsPlaying: (playing: boolean) => void;
};

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const lastLoadedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const idx = localStorage.getItem('currentSongIndex');
    const playing = localStorage.getItem('isPlaying');
    if (idx !== null) {
      const n = parseInt(idx, 10);
      if (!Number.isNaN(n) && n >= 0 && n < TRACKS.length) {
        setCurrentSongIndex(n);
      }
    }
    if (playing === 'true') setIsPlaying(true);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('currentSongIndex', String(currentSongIndex));
  }, [currentSongIndex, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('isPlaying', String(isPlaying));
  }, [isPlaying, hydrated]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hydrated) return;
    const src = TRACKS[currentSongIndex]?.src;
    if (!src) return;

    if (lastLoadedIndexRef.current !== currentSongIndex) {
      lastLoadedIndexRef.current = currentSongIndex;
      audio.src = src;
      audio.load();
    }

    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentSongIndex, isPlaying, hydrated]);

  const nextSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  }, []);

  const prevSong = useCallback(() => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? TRACKS.length - 1 : prev - 1,
    );
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => nextSong();
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [nextSong]);

  const playSong = useCallback((index: number) => {
    if (index < 0 || index >= TRACKS.length) return;
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const currentSong = TRACKS[currentSongIndex];

  const value: MusicContextValue = {
    currentSongIndex,
    isPlaying,
    currentSong,
    playSong,
    nextSong,
    prevSong,
    togglePlayPause,
    setIsPlaying,
  };

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" className="hidden" />
      {children}
    </MusicContext.Provider>
  );
}
