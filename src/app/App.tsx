import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const TRACK = {
  title: 'Fly Me to the Moon',
  artist: 'Frank Sinatra',
  src: '/Fly Me To The Moon - Frank Sinatra.mp3',
  cover: '/Fly Me to the Moon Frank Sinatra.jpeg',
};

const CONTRIBUTION_BLOCK_SIZE = 12;
const CONTRIBUTION_BLOCK_MARGIN = 4;

export default function App() {
  const [copied, setCopied] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
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

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div className="px-8 py-20 md:px-16 md:py-32 max-w-3xl mx-auto">
        
        {/* Header with socials */}
        <header className="flex justify-between items-start mb-40">
          <img
            src="/minion-hoverboard.png"
            alt="Minion on hoverboard"
            className="h-15 w-15 object-cover"
          />
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

        <section className="mt-20 flex flex-col gap-1 md:flex-row md:items-end md:gap-15">
          <div className="w-full overflow-x-auto md:w-auto">
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
                blockSize={CONTRIBUTION_BLOCK_SIZE}
                blockMargin={CONTRIBUTION_BLOCK_MARGIN}
                fontSize={12}
                transformData={(data) =>
                  data.filter((day) => new Date(day.date) >= sixMonthsAgo)
                }
              />
            </a>
          </div>

          <div className="relative aspect-square w-24 overflow-hidden border border-white/30 bg-black/30 shadow-[0_8px_28px_rgba(0,0,0,0.45)] md:w-[108px]">
            <img
              src={TRACK.cover}
              alt={`${TRACK.title} cover art`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            <div className="relative flex h-full items-center justify-center p-5">
              <button
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white shadow-[0_6px_22px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors hover:bg-black/50"
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="3" y="2" width="3" height="12" fill="currentColor" rx="1" />
                    <rect x="10" y="2" width="3" height="12" fill="currentColor" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>

            <audio
              ref={audioRef}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            >
              <source src={TRACK.src} type="audio/mpeg" />
            </audio>
          </div>
        </section>
      </div>
    </div>
  );
}