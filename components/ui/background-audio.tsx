'use client';

import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.play().catch(() => setMuted(true));
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/got-that-feeling.mp3"
        loop
        playsInline
        preload="auto"
        className="hidden"
      />
      <button
        type="button"
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-white/20 bg-black/80 px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{muted ? 'Unmute' : 'Mute'}</span>
      </button>
    </>
  );
}
