import FluidBackground from '@/components/ui/fluid-background'

const BRIKLI_URL = 'https://brikli.com/'
const UMMAH_HACKS_URL = 'https://ummahhacks.com/'
const BACONHEAD_URL = 'https://github.com/ibrahim-ansari-code/baconhead'

const textShadow = '0 2px 12px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.9), 0 0 48px rgba(0,0,0,0.6)'
const linkShadow = '0 2px 14px rgba(0,0,0,1), 0 0 28px rgba(0,0,0,0.9)'

export default function Home() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] text-white">
      <FluidBackground />

      {/* Overlay – 0.87 opacity */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{ background: 'rgba(0,0,0,0.87)' }}
      />

      {/* Socials – top right, text labels like Vite */}
      <nav
        className="fixed top-4 right-4 z-20 flex gap-4 text-sm sm:top-6 sm:right-6 sm:gap-6 md:top-8 md:right-8"
        aria-label="Social links"
      >
        <a
          href="https://github.com/ibrahim-ansari-code"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex items-center hover:opacity-90 transition-opacity text-white touch-manipulation"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/ibrahim-ansari-775529270/"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex items-center hover:opacity-90 transition-opacity text-white touch-manipulation"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}
        >
          linkedin
        </a>
        <a
          href="https://x.com/ibrahimansr"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex items-center hover:opacity-90 transition-opacity text-white touch-manipulation"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}
        >
          x
        </a>
      </nav>

      <div className="relative z-10 pl-6 pr-6 pt-16 pb-20 md:pl-16 md:pr-16 md:pt-24 md:pb-32 max-w-2xl">
        <header className="mb-12 md:mb-16">
          <span
            className="text-lg font-medium text-white"
            style={{ textShadow }}
          >
            ibrahim ansari
          </span>
        </header>

        <div
          className="space-y-5 sm:space-y-6 text-base leading-relaxed text-white font-light"
          style={{ textShadow: '0 2px 14px rgba(0,0,0,1), 0 0 28px rgba(0,0,0,0.9), 0 0 56px rgba(0,0,0,0.6)' }}
        >
          <p>hi, im ibrahim</p>

          <p>
            i&apos;ve done 5 technical roles, currently founding eng @{' '}
            <a
              href={BRIKLI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-90 transition-opacity"
              style={{ textShadow: linkShadow }}
            >
              brikli
            </a>{' '}
            (antler s26). studying management engineering @ uwaterloo
          </p>

          <p>
            recently hosted{' '}
            <a
              href={UMMAH_HACKS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-90 transition-opacity"
              style={{ textShadow: linkShadow }}
            >
              ummah hacks
            </a>{' '}
            (backed by shopify, yc founders, etc.) and made{' '}
            <a
              href={BACONHEAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-90 transition-opacity"
              style={{ textShadow: linkShadow }}
            >
              baconhead
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
