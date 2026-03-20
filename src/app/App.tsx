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
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
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

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const blobs = Array.from({ length: 6 }, (_, i) => ({
      baseX: 0.18 + i * 0.14,
      baseY: 0.25 + (i % 2) * 0.45,
      radius: 140 + i * 18,
      hue: [176, 197, 212, 165, 230, 188][i],
      phase: Math.random() * Math.PI * 2,
      speed: 0.18 + Math.random() * 0.24,
      drift: 0.025 + Math.random() * 0.035,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = w * 0.5;
      pointer.y = h * 0.42;
      pointer.tx = pointer.x;
      pointer.ty = pointer.y;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.tx = w * 0.5;
      pointer.ty = h * 0.42;
    };

    const drawGlow = (x: number, y: number, r: number, color: string, alpha = 1) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (timeMs: number) => {
      const t = timeMs * 0.001;
      pointer.x += (pointer.tx - pointer.x) * 0.075;
      pointer.y += (pointer.ty - pointer.y) * 0.075;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';

      blobs.forEach((b, i) => {
        const sx = w * b.baseX + Math.sin(t * b.speed + b.phase) * (w * b.drift);
        const sy = h * b.baseY + Math.cos(t * (b.speed * 0.9) + b.phase) * (h * b.drift);
        const pulse = 1 + Math.sin(t * 0.7 + i) * 0.1;
        drawGlow(sx, sy, b.radius * pulse, `hsla(${b.hue}, 78%, 64%, 0.26)`);
      });

      const pointerSize = pointer.active ? 210 : 165;
      drawGlow(pointer.x, pointer.y, pointerSize, 'rgba(170, 236, 255, 0.24)', 0.95);
      drawGlow(pointer.x * 0.86 + w * 0.07, pointer.y * 0.88 + h * 0.06, 120, 'rgba(116, 143, 255, 0.16)');

      ctx.globalCompositeOperation = 'source-over';
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.08, w * 0.5, h * 0.5, h * 0.8);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.58)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 120; i += 1) {
        const x = (Math.random() * w) | 0;
        const y = (Math.random() * h) | 0;
        ctx.fillStyle = i % 2 ? '#ffffff' : '#9cd9ff';
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1;

      rafId = window.requestAnimationFrame(render);
    };

    resize();
    rafId = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 px-8 py-20 md:px-16 md:py-32 max-w-3xl mx-auto">
        
        {/* Header with socials */}
        <header className="flex justify-between items-start mb-20">
          <img
            src="/minion-hoverboard.gif"
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

        <section className="mt-20 flex items-center gap-1 md:gap-15">
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

          <div className="relative aspect-square w-[108px] shrink-0 overflow-hidden border border-white/30 bg-black/30 shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white shadow-[0_6px_22px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors hover:bg-black/50"
              >
                {isPlaying ? (
                  <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="3" y="2" width="3" height="12" fill="currentColor" rx="1" />
                    <rect x="10" y="2" width="3" height="12" fill="currentColor" rx="1" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
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