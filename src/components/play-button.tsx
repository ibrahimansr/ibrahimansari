import { Pause, Play } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

type PlayButtonProps = {
  songIndex: number;
};

/** Inline row control from legacy `app/about` (“other”) page + `play-button.tsx`. */
export function PlayButton({ songIndex }: PlayButtonProps) {
  const { currentSongIndex, isPlaying, playSong, setIsPlaying } = useMusic();
  const isCurrentSong = currentSongIndex === songIndex;

  const handleClick = () => {
    if (isCurrentSong && isPlaying) {
      setIsPlaying(false);
      return;
    }
    playSong(songIndex);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/15"
      aria-label={
        isCurrentSong && isPlaying ? 'Pause' : `Play track ${songIndex + 1}`
      }
    >
      {isCurrentSong && isPlaying ? (
        <Pause size={15} strokeWidth={2.25} fill="currentColor" />
      ) : (
        <Play size={15} strokeWidth={2.25} fill="currentColor" className="ml-0.5" />
      )}
    </button>
  );
}
