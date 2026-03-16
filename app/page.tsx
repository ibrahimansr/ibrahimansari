import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DisorientBackground from '@/components/ui/disorient-background'

const MONARCH_PAPER = 'https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2024-004'
const BUDGET_PAPER = 'https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2025-001'
const SPOTIFY_TRACK = 'https://open.spotify.com/track/1Jguf6gwtrywE2mRHqsdmY?si=4a0f7722fd4f4cf7'
const BRIKLI_URL = 'https://brikli.com/'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Full-viewport disorient background */}
      <DisorientBackground />

      {/* Dark gradient overlay so text stays readable over the image */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%),
            linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.35) 100%)
          `,
        }}
      />

      {/* Content on top with strong contrast */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 pt-16 pb-24 flex flex-col items-start">
        <header className="w-full flex items-center justify-between mb-16">
          <p className="text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            ibrahim ansari
          </p>
          <nav className="flex items-center gap-5">
            <a
              href="https://github.com/ibrahim-ansari-code"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="text-white/95 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:opacity-90 transition-opacity"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ibrahim-ansari-775529270/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-white/95 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:opacity-90 transition-opacity"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://x.com/ibrahimansr"
              target="_blank"
              rel="noreferrer"
              title="X (Twitter)"
              className="text-white/95 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:opacity-90 transition-opacity"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/ibrahim.ansr/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="text-white/95 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
            </a>
          </nav>
        </header>

        <div className="flex flex-col gap-6 text-white text-left [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.4)]">
          <p className="text-base leading-relaxed">
            currently @{' '}
            <Image
              src="/brikli-logo.png"
              alt="Brikli"
              width={16}
              height={16}
              className="inline-block align-middle brightness-0 invert drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            />
            {' '}
            <a href={BRIKLI_URL} target="_blank" rel="noreferrer" className="link-sweep">
              Brikli
            </a>
          </p>

          <p className="text-base leading-relaxed">
            learning to post-train models
          </p>

          <p className="text-base leading-relaxed">
            check out my papers on{' '}
            <a href={MONARCH_PAPER} target="_blank" rel="noreferrer" className="link-sweep">
              monarch butterflies
            </a>
            {' '}and{' '}
            <a href={BUDGET_PAPER} target="_blank" rel="noreferrer" className="link-sweep">
              budgeting education
            </a>
          </p>

          <p className="text-base leading-relaxed flex flex-wrap items-center gap-2">
            <span>currently playing</span>
            <Image
              src="/scandinavian-thing.png"
              alt="A Scandinavian Thing — Peter Sandberg"
              width={28}
              height={28}
              className="rounded-sm inline-block shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            />
            <a href={SPOTIFY_TRACK} target="_blank" rel="noreferrer" className="link-sweep">
              got that feeling
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
