import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';
import { useMusic } from '../contexts/MusicContext';
import { playControlButtonClassName } from './play-button';

/**
 * Glass-style floating player (bottom-left), ported from Next-era
 * `components/ui/music-player.tsx` (e.g. commit 5e5dcc0f), themed for the dark site.
 */
export function MusicPlayer() {
  const { isPlaying, currentSong, nextSong, prevSong, togglePlayPause } =
    useMusic();
  const [isExpanded, setIsExpanded] = useState(false);

  const shell =
    'rounded-2xl border border-white/20 bg-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10';

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-[width] duration-300 ease-out ${
        isExpanded ? 'w-[min(calc(100vw-2rem),20rem)]' : 'w-14'
      }`}
      role="region"
      aria-label="Music player"
    >
      <div className={shell}>
        {isExpanded ? (
          <div className="p-4 text-white">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                Now playing
              </h3>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-lg leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Collapse player"
              >
                ×
              </button>
            </div>

            <div className="mb-4 space-y-0.5">
              <div className="text-sm font-medium leading-snug">
                {currentSong.title}
              </div>
              <div className="text-xs text-white/55">{currentSong.artist}</div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={prevSong}
                className={playControlButtonClassName}
                aria-label="Previous track"
              >
                <SkipBack size={15} strokeWidth={2.25} />
              </button>

              <button
                type="button"
                onClick={togglePlayPause}
                className={playControlButtonClassName}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={15} strokeWidth={2.25} fill="currentColor" />
                ) : (
                  <Play size={15} strokeWidth={2.25} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={nextSong}
                className={playControlButtonClassName}
                aria-label="Next track"
              >
                <SkipForward size={15} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className={playControlButtonClassName}
              aria-label={isPlaying ? 'Pause' : 'Play — expand player'}
            >
              {isPlaying ? (
                <Pause size={15} strokeWidth={2.25} fill="currentColor" />
              ) : (
                <Play size={15} strokeWidth={2.25} fill="currentColor" className="ml-0.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
