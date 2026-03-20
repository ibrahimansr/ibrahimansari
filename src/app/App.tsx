import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const TRACKS = [
  {
    title: '2Tone',
    artist: 'Don Toliver',
    src: '/2TONE feat. Don Toliver.mp3',
    cover: '/covers/2tone-don-toliver.jpg',
  },
  {
    title: '8PM',
    artist: 'Nemzzz',
    src: '/NEMZZZ 8PM Official Video.mp3',
    cover: '/Rents Due Nemzz.jpeg',
  },
  {
    title: 'As We Speak',
    artist: 'Drake',
    src: '/As We Speak feat. Drake Official Audio.mp3',
    cover: '/covers/as-we-speak-drake.jpg',
  },
  {
    title: 'Cold',
    artist: 'Chris Stapleton',
    src: '/Cold Official Video.mp3',
    cover: '/covers/cold.jpg',
  },
  {
    title: 'Everybody Loves Somebody',
    artist: 'Dean Martin',
    src: '/Dean Martin Everybody Loves Somebody.mp3',
    cover: '/covers/everybody-loves-somebody.jpg',
  },
  {
    title: 'Fly Me to the Moon',
    artist: 'Frank Sinatra',
    src: '/Fly Me To The Moon - Frank Sinatra.mp3',
    cover: '/Fly Me to the Moon Frank Sinatra.jpeg',
  },
  {
    title: 'Got That Feeling',
    artist: 'Foster The People',
    src: '/got-that-feeling.mp3',
    cover: '/covers/got-that-feeling.jpg',
  },
  {
    title: 'Humsafar OST',
    artist: 'Qurat-ul-Ain Balouch',
    src: '/Humsafar OST by Qurat-ul-Ain Balouch.mp3',
    cover: '/covers/humsafar-ost.jpg',
  },
  {
    title: 'Jimmy Cooks',
    artist: 'Drake ft. 21 Savage',
    src: '/Drake Jimmy Cooks ft 21 Savage.mp3',
    cover: '/covers/jimmy-cooks.jpg',
  },
  {
    title: 'Sajna Da Dil Torya',
    artist: 'Zeeshan Ali',
    src: '/SAJNA DA DIL TORYA _ VIDEO SONG - 4K _ KABHI MAIN KABHI TUM _ MUSTAFA x SHARJEENA.mp3',
    cover: '/covers/sajna-da-dil-torya.jpg',
  },
];

export default function App() {
  const [copied, setCopied] = React.useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const sixMonthsAgo = React.useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const copyEmail = () => {
    const email = 'ibrahim.ansari4161@gmail.com';
    
    // Fallback method for copying text
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textArea);
  };

  const togglePlayback = () => {
    const player = audioRef.current;
    if (!player) return;

    if (player.paused) {
      player.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    player.pause();
  };

  const currentTrack = TRACKS[currentTrackIndex];

  const goToNextTrack = React.useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  }, []);

  const goToPreviousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  React.useEffect(() => {
    const player = audioRef.current;
    if (!player) return;

    player.load();
    setProgress(0);
    setDuration(0);

    if (isPlaying) {
      player.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, isPlaying]);

  const onTimeUpdate = () => {
    const player = audioRef.current;
    if (!player || !player.duration) {
      setProgress(0);
      return;
    }

    setProgress((player.currentTime / player.duration) * 100);
  };

  const onLoadedMetadata = () => {
    const player = audioRef.current;
    if (!player || !player.duration) return;
    setDuration(player.duration);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div className="px-8 py-20 md:px-16 md:py-32 max-w-3xl mx-auto">
        
        {/* Header with socials */}
        <header className="flex justify-between items-start mb-40">
          <div className="w-8 h-8" style={{ backgroundColor: '#3EBCB3' }} />
          <nav className="flex gap-6 text-sm">
            <a 
              href="https://github.com/ibrahim-ansari-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              github
            </a>
            <a 
              href="https://www.linkedin.com/in/ibrahim-ansari-775529270/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              linkedin
            </a>
            <a 
              href="https://x.com/ibrahimansr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              x
            </a>
          </nav>
        </header>

        {/* Main content - all text */}
        <main className="space-y-16 text-base leading-relaxed" style={{ fontWeight: 300 }}>
          <p>
            i've done 5 technical roles, currently founding eng @ <a href="https://brikli.com/" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">brikli</a> (antler s26). 
            studying management engineering @ uwaterloo
          </p>
          <p>
            recently hosted <a href="https://ummahhacks.com/" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">ummah hacks</a> (backed by shopify, yc founders, etc.) 
            and made <a href="https://github.com/ibrahim-ansari-code/baconhead" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">baconhead</a>. Learning to post train
            models and change automations.
          </p>

          <p>
            previously published <a href="https://drive.google.com/file/d/13_mV8QIK9et7CNBK_AAbZibdZFb1-7HL/edit" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">paper on monarch butterflies</a> and <a href="https://drive.google.com/file/d/1zw4GxDShfs00zw66bCBYd9MF82Cvmyh_/view" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">budgeting education</a>
          </p>

          <div className="flex items-center gap-3 pt-16">
            <p>ibrahim.ansari4161@gmail.com</p>
            <button 
              onClick={copyEmail}
              className="px-3 py-1 border border-white/30 hover:border-white/60 transition-colors text-sm"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </main>

        <section className="mt-28 grid gap-8 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
          <div className="overflow-x-auto">
            <a
              href="https://github.com/ibrahim-ansari-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="View GitHub profile and contributions"
            >
              <GitHubCalendar
                username="ibrahim-ansari-code"
                colorScheme="dark"
                showColorLegend={false}
                showMonthLabels={false}
                showTotalCount={false}
                showWeekdayLabels={false}
                blockSize={11}
                blockMargin={4}
                fontSize={12}
                transformData={(data) =>
                  data.filter((day) => new Date(day.date) >= sixMonthsAgo)
                }
              />
            </a>
          </div>

          <div className="border border-white/20 bg-black/40 p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Now Playing</p>
            <div className="mt-3 overflow-hidden border border-white/15">
              <img
                src={currentTrack.cover}
                alt={`${currentTrack.title} cover art`}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-base">{currentTrack.title}</p>
            <p className="mt-1 text-xs text-white/50">{currentTrack.artist}</p>

            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: '#3EBCB3' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-white/45">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={goToPreviousTrack}
                className="border border-white/30 px-3 py-2 text-sm transition-colors hover:border-white/70"
              >
                prev
              </button>
              <button
                onClick={togglePlayback}
                className="min-w-20 border border-white/30 px-4 py-2 text-sm transition-colors hover:border-white/70"
              >
                {isPlaying ? 'pause' : 'play'}
              </button>
              <button
                onClick={goToNextTrack}
                className="border border-white/30 px-3 py-2 text-sm transition-colors hover:border-white/70"
              >
                next
              </button>
            </div>

            <audio
              ref={audioRef}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={goToNextTrack}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              className="hidden"
            >
              <source src={currentTrack.src} type="audio/mpeg" />
            </audio>
          </div>
        </section>

      </div>
    </div>
  );
}