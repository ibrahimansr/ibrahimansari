import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
// import { useEyeTracking } from "@/hooks/useEyeTracking";
// const unused = "test";
// const oldCode = () => { return null; };
// let debug = false;

function Logo({ src, alt, size = 18, darkSrc, invertDark }: { src: string; alt: string; size?: number; darkSrc?: string; invertDark?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center self-center">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[${size}px] w-[${size}px] object-contain ${darkSrc ? 'dark:hidden' : ''}`}
      />
      {darkSrc && (
        <Image
          src={darkSrc}
          alt={alt}
          width={size}
          height={size}
          sizes={`${size}px`}
          quality={100}
          priority={false}
          className={`h-[${size}px] w-[${size}px] object-contain hidden dark:block ${invertDark ? 'dark:brightness-0 dark:invert' : ''}`}
        />
      )}
    </span>
  );
}


export default function Home() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-md px-6 sm:px-4">
        <div className="pt-16 sm:pt-24" />

        <div className="flex gap-8">
          <div className="flex flex-col gap-4 min-w-[120px]">
            <Link href="/" className="font-extralight hover-scale text-left">home</Link>
            <Link href="/progress" className="font-extralight hover-scale text-left">progress</Link>
            <Link href="/about" className="font-extralight hover-scale text-left">other</Link>
            <Link href="/gallery" className="font-extralight hover-scale text-left">gallery</Link>
          </div>

          <div className="flex-1">
            <div className="custom-body space-y-4 animate-[fadeIn_400ms_ease]">
              <div className="flex items-center gap-3">
                <h1 className="custom-header">Ibrahim Ansari</h1>
                <Logo src="/waterloo-logo.png" alt="University of Waterloo" size={32} darkSrc="/waterloo-logo-dark.png" />
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                <span>management engineering @ uwaterloo</span>
              </div>
            </div>

        <div className="custom-divider-thick" />

        <div 
          id="experience-section"
          className="custom-body space-y-4 animate-[fadeIn_600ms_ease] section-border"
        >
          <div className="custom-section-title">experience</div>
          <div className="flex items-start gap-3">
            <div className="flex items-center pt-0.5">
              <Logo src="/brikli-logo.png" alt="Brikli" size={36} />
            </div>
            <div>
              <div className="custom-project-title">software engineer — <a href="https://brikli.com/" target="_blank" rel="noreferrer" className="hover-glow">brikli</a></div>
              <div className="text-neutral-600 dark:text-neutral-400 custom-small">making housing easier</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center pt-0.5">
              <Logo src="/tablingos-logo.png" alt="Tablingos" size={36} />
            </div>
            <div>
              <div className="custom-project-title">co‑founder — <a href="https://www.linkedin.com/company/tablingos/about/" target="_blank" rel="noreferrer" className="hover-glow">tablingos</a></div>
              <div className="text-neutral-600 dark:text-neutral-400 custom-small">data automation backed by Microsoft</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center pt-0.5">
              <Logo src="/wwf-logo.png" alt="WWF" size={36} darkSrc="/wwf-logo.png" invertDark={true} />
            </div>
            <div>
              <div className="custom-project-title">data scientist intern — <a href="https://www.worldwildlife.org/" target="_blank" rel="noreferrer" className="hover-glow">wwf</a></div>
              <div className="text-neutral-600 dark:text-neutral-400 custom-small">using data science to do good</div>
            </div>
          </div>
        </div>

        <div className="custom-divider" />

        <div 
          id="projects-section"
          className="custom-body space-y-4 animate-[fadeIn_700ms_ease] section-border"
        >
          <div className="custom-section-title">projects</div>
          <div>
            <div className="custom-project-title"><a className="hover-scale" href="https://github.com/ibrahim-ansari-code/Islam-or-JDM" target="_blank" rel="noreferrer">ufc predictor</a></div>
            <div className="text-neutral-600 dark:text-neutral-400 custom-small">because i lost too much money betting</div>
          </div>
          <div>
            <div className="custom-project-title"><a className="hover-slide" href="https://app.handsforu.com" target="_blank" rel="noreferrer">hands</a></div>
            <div className="text-neutral-600 dark:text-neutral-400 custom-small">RAG + cooking app</div>
          </div>
          <div>
            <div className="custom-project-title"><a className="hover-glow" href="https://github.com/ibrahim-ansari-code/no-rot" target="_blank" rel="noreferrer">norot</a></div>
            <div className="text-neutral-600 dark:text-neutral-400 custom-small">grammarly for brainrot</div>
          </div>
        </div>

        <div className="custom-divider-thick" />

        <div 
          id="research-section"
          className="custom-body space-y-4 animate-[fadeIn_800ms_ease] section-border"
        >
          <div className="custom-section-title">research papers</div>
          <div className="space-y-3">
            <div>
              <a className="hover-scale" href="https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2025-001" target="_blank" rel="noreferrer">optimizing budget allocations in ontario school boards for efficient, equitable, and inclusive education</a>
            </div>
            <div>
              <a className="hover-slide" href="https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2024-004" target="_blank" rel="noreferrer">analyzing urban heat islands and their impact on the monarch butterfly population</a>
            </div>
          </div>
        </div>

        <div className="custom-divider" />

        <div 
          id="contact-section"
          className="custom-body animate-[fadeIn_900ms_ease] section-border"
        >
          <div className="pt-6" />
          <footer className="pb-6">
            <div className="custom-contact">contact</div>
            <div className="mt-4 flex items-center gap-6">
              <a className="hover-scale" href="mailto:ibrahim.ansari4161@gmail.com" title="Email">
                <Mail size={20} className="text-neutral-600 dark:text-neutral-400" />
              </a>
              <a className="hover-slide" href="https://github.com/ibrahim-ansari-code" target="_blank" rel="noreferrer" title="GitHub">
                <Github size={20} className="text-gray-800 dark:text-gray-200" />
              </a>
              <a className="hover-glow" href="https://www.linkedin.com/in/ibrahim-ansari-775529270/" target="_blank" rel="noreferrer" title="LinkedIn">
                <Logo src="/linkedin.webp" alt="LinkedIn" size={20} />
              </a>
              <a className="hover-scale" href="https://x.com/IbrahimAns20615" target="_blank" rel="noreferrer" title="X (Twitter)">
                <Twitter size={20} className="text-black dark:text-white" />
              </a>
              <a className="hover-slide" href="https://www.instagram.com/ibrahim.ansr/" target="_blank" rel="noreferrer" title="Instagram">
                <Instagram size={20} className="text-pink-600" />
              </a>
            </div>
          </footer>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}

