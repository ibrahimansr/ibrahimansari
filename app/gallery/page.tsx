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

export default function Gallery() {
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
              <h1 className="custom-header">Gallery</h1>
            </div>

            <div className="custom-divider" />

            <div className="custom-body space-y-8 section-border">
              <div>
                <div className="custom-section-title mb-4">achievements</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Image
                      src="/Activity from Ibrahim Khawar.jpeg"
                      alt="UNESCO Award"
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                    <div className="text-neutral-600 dark:text-neutral-400 custom-small">got CC UNESCO Award for Scholarly Communication</div>
                  </div>
                  <div className="space-y-2">
                    <Image
                      src="/37.jpg"
                      alt="HammerHacks"
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                    <div className="text-neutral-600 dark:text-neutral-400 custom-small">winning project at HammerHacks with good friends</div>
                  </div>
                  <div className="space-y-2">
                    <Image
                      src="/IMG_7138.jpeg"
                      alt="Education Presentation"
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                    <div className="text-neutral-600 dark:text-neutral-400 custom-small">presented findings about Ontario education budgeting to some big names</div>
                  </div>
                </div>
              </div>

              <div className="custom-divider" />

              <div>
                <div className="custom-section-title mb-4">travelling</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add travelling photos here when available */}
                  <div className="text-neutral-500 dark:text-neutral-400 custom-small">coming soon</div>
                </div>
              </div>

              <div className="custom-divider" />

              <div>
                <div className="custom-section-title mb-4">random</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Add random photos here when available */}
                  <div className="text-neutral-500 dark:text-neutral-400 custom-small">coming soon</div>
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

