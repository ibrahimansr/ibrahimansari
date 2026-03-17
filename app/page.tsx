import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import FluidBackground from '@/components/ui/fluid-background'

const BRIKLI_URL = 'https://brikli.com/'

export default function Home() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] flex flex-col">
      <FluidBackground />

      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{ background: 'rgba(0,0,0,0.87)' }}
      />

      {/* Socials fixed top-right — mobile-friendly touch targets */}
      <nav
        className="fixed top-4 right-4 z-20 sm:top-6 sm:right-6 md:top-8 md:right-8 flex items-center gap-3 sm:gap-4"
        aria-label="Social links"
      >
        <a
          href="https://github.com/ibrahim-ansari-code"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/95 hover:text-white transition-opacity touch-manipulation"
        >
          <Github size={22} className="sm:w-5 sm:h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/ibrahim-ansari-775529270/"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/95 hover:text-white transition-opacity touch-manipulation"
        >
          <Linkedin size={22} className="sm:w-5 sm:h-5" />
        </a>
        <a
          href="https://x.com/ibrahimansr"
          target="_blank"
          rel="noreferrer"
          title="X (Twitter)"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/95 hover:text-white transition-opacity touch-manipulation"
        >
          <Twitter size={22} className="sm:w-5 sm:h-5" />
        </a>
        <a
          href="https://www.instagram.com/ibrahim.ansr/"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/95 hover:text-white transition-opacity touch-manipulation"
        >
          <Instagram size={22} className="sm:w-5 sm:h-5" />
        </a>
      </nav>

      {/* Content — left-aligned, mobile-responsive padding and typography */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-24 flex flex-col items-start">
        <p className="text-lg sm:text-xl text-white font-medium mb-2">
          ibrahim ansari
        </p>
        <div className="flex flex-col gap-4 sm:gap-5 text-white/95 text-left text-sm sm:text-base leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.4)]">
          <p>hi</p>
          <p>
            currently @{' '}
            <Image
              src="/brikli-logo.png"
              alt="Brikli"
              width={16}
              height={16}
              className="inline-block align-middle brightness-0 invert"
            />
            {' '}
            <a href={BRIKLI_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white transition-colors">
              Brikli
            </a>
          </p>
          <p>uwaterloo · ummah hacks · baconhead</p>
        </div>
      </div>
    </main>
  )
}
