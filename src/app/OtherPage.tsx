import { Link } from 'react-router';
import { PlayButton } from '../components/play-button';
import { TRACKS } from '../data/tracks';

/**
 * “Other” page: playlist with per-track play (legacy `app/about/page.tsx`
 * before commit 06c06975), plus pictures block.
 */
export function OtherPage() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-8 py-20 md:px-16 md:py-32">
        <header className="mb-16 flex items-start justify-between">
          <Link
            to="/"
            className="text-sm hover:opacity-70 transition-opacity"
          >
            ← home
          </Link>
        </header>

        <h1
          className="mb-10 text-2xl font-light tracking-tight md:text-3xl"
          style={{ fontWeight: 300 }}
        >
          Other
        </h1>

        <div className="mb-16 border-t border-white/15 pt-10">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
            Music
          </h2>
          <ul className="space-y-5">
            {TRACKS.map((track, index) => (
              <li
                key={track.src}
                className="flex items-center gap-3 border-b border-white/10 pb-5 last:border-0"
              >
                <img
                  src={track.cover}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  {track.spotifyUrl ? (
                    <a
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm hover:opacity-80"
                    >
                      {track.title.toLowerCase()} —{' '}
                      {track.artist.toLowerCase()}
                    </a>
                  ) : (
                    <span className="block truncate text-sm text-white/90">
                      {track.title.toLowerCase()} —{' '}
                      {track.artist.toLowerCase()}
                    </span>
                  )}
                </div>
                <PlayButton songIndex={index} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/15 pt-10">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
            Pictures
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <figure className="space-y-2">
              <img
                src="/Activity from Ibrahim Khawar.jpeg"
                alt="UNESCO award"
                className="w-full object-contain"
                loading="lazy"
              />
              <figcaption className="text-xs text-white/50">
                got CC UNESCO Award for Scholarly Communication
              </figcaption>
            </figure>
            <figure className="space-y-2">
              <img
                src="/37.jpg"
                alt="HammerHacks"
                className="w-full object-contain"
                loading="lazy"
              />
              <figcaption className="text-xs text-white/50">
                winning project at HammerHacks with good friends
              </figcaption>
            </figure>
            <figure className="space-y-2 md:col-span-2">
              <img
                src="/IMG_7138.jpeg"
                alt="Education presentation"
                className="w-full max-w-2xl object-contain"
                loading="lazy"
              />
              <figcaption className="text-xs text-white/50">
                presented findings about Ontario education budgeting to some big
                names
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
