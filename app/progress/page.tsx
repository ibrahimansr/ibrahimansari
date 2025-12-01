import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";

function Logo({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) {
  return (
    <span className="inline-flex items-center align-middle">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[${size}px] w-[${size}px] object-contain align-middle`}
      />
    </span>
  );
}

export default function Progress() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-md pl-4 pr-6 sm:pl-2 sm:pr-4">
        <div className="pt-16 sm:pt-24" />

        <div className="flex gap-8">
          <div className="flex flex-col gap-4 min-w-[120px]">
            <Link href="/" className="font-extralight hover-scale text-left">home</Link>
            <Link href="/progress" className="font-extralight hover-scale text-left">progress</Link>
            <Link href="/about" className="font-extralight hover-scale text-left">other</Link>
            <Link href="/gallery" className="font-extralight hover-scale text-left">gallery</Link>
          </div>

          <div className="flex-1">
            <div className="custom-body space-y-4 animate-[fadeIn_500ms_ease]">
              <h1 className="custom-header">Progress</h1>
            </div>

            <div className="custom-divider" />

        <div className="custom-body space-y-6 section-border">
          <div className="custom-section-title">weekly updates</div>

          <div className="space-y-3 pb-4">
            <div className="text-neutral-500 dark:text-neutral-400 custom-small">
              November 23rd - 30th, 2025
            </div>
            <div className="text-neutral-800 dark:text-neutral-200 space-y-2">
              <p>Exam stress, but worked a but on Brikli, starting reading papers, implemented Andrej Karpathy's LLM council as an <a href="https://github.com/ibrahim-ansari-code/LLM-Council-IDE" target="_blank" rel="noreferrer" className="hover-glow">IDE</a>.</p>
            </div>
          </div>
          
          <div className="space-y-3 pb-4">
            <div className="text-neutral-500 dark:text-neutral-400 custom-small">
              November 16th - 22nd, 2025
            </div>
            <div className="text-neutral-800 dark:text-neutral-200 space-y-2">
              <p>Exams coming up, learning more ML, grinding for brikli, building something new.</p>
            </div>
          </div>


          <div className="space-y-3 pb-4">
            <div className="text-neutral-500 dark:text-neutral-400 custom-small">
              November 9th - 15th, 2025
            </div>
            <div className="text-neutral-800 dark:text-neutral-200 space-y-2">
              <p>Went to first Socratica meeting, closed a couple PRs for Brikli, continued path to learning ML, need to catch up on uni 😛.</p>
            </div>
          </div>
          
          <div className="space-y-3 pb-4 last:pb-0">
            <div className="text-neutral-500 dark:text-neutral-400 custom-small">
              November 2nd - 8th, 2025
            </div>
            <div className="text-neutral-800 dark:text-neutral-200 space-y-2">
              <p>Working on <a href="https://www.letthemhit.ca/" target="_blank" rel="noreferrer" className="hover-glow">letthemhit.ca</a> (got botted multiple times). Added a couple features to brikli. Continued learning ML, focusing on the math side of things.</p>
            </div>
          </div>
        </div>

        <div className="custom-divider" />

        <div className="custom-body section-border">
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

