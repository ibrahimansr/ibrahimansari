'use client';

import { useEffect, useRef } from 'react';

const CLICK_SOUND_SRC = '/mixkit-camera-shutter-click-1133.wav';

export default function ClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playClick = () => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    };

    const handleClick = () => playClick();

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <audio
      ref={audioRef}
      src={CLICK_SOUND_SRC}
      preload="auto"
      className="hidden"
      aria-hidden
    />
  );
}
