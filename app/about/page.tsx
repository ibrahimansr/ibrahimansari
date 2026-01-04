import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { PlayButton } from "@/components/ui/play-button";

// const test = () => { return "hello"; }
// const unused = "this is not used";

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


export default function About() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-md pl-4 pr-6 sm:pl-2 sm:pr-4">
        <div className="pt-16 sm:pt-24" />

        <div className="flex gap-8">
          <div className="flex flex-col gap-4 min-w-[120px]">
            <Link href="/" className="font-extralight hover-scale text-left">home</Link>
            <Link href="/about" className="font-extralight hover-scale text-left">other</Link>
          </div>

          <div className="flex-1">
            <div className="custom-body space-y-4 animate-[fadeIn_500ms_ease]">
              <h1 className="custom-header">Other</h1>
            </div>

            <div className="custom-divider" />

        <div className="custom-body space-y-4 section-border">
          <div className="custom-section-title">music</div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/Rents Due Nemzz.jpeg"
                alt="Nemzzz"
                width={40}
                height={40}
                className="object-cover rounded-lg"
              />
              <div className="flex-1">
                <a className="hover-scale" href="https://open.spotify.com/track/7H5CsjEafNygkvcm69RevN?si=2a55ad0752784678" target="_blank" rel="noreferrer">cold — nemzzz</a>
              </div>
              <PlayButton songIndex={0} />
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/MSE100-TutorialWeek2DemoEmpty (1) (1).jpg"
                alt="Yeat"
                width={40}
                height={40}
                className="object-cover rounded-lg"
              />
              <div className="flex-1">
                <a className="hover-slide" href="https://open.spotify.com/track/5SaKYcCTEdCkacDamzfRfX?si=8c5cef0586da43f1" target="_blank" rel="noreferrer">2tone — yeat, don toliver</a>
              </div>
              <PlayButton songIndex={1} />
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/Fly Me to the Moon Frank Sinatra.jpeg"
                alt="Frank Sinatra"
                width={40}
                height={40}
                className="object-cover rounded-lg"
              />
              <div className="flex-1">
                <a className="hover-glow" href="https://open.spotify.com/track/5b7OgznPJJr1vHNYGyvxau?si=a1c8f067770e4967" target="_blank" rel="noreferrer">fly me to the moon — frank sinatra</a>
              </div>
              <PlayButton songIndex={2} />
            </div>
          </div>
        </div>

        <div className="custom-divider-thick" />

        <div className="custom-body space-y-4 section-border">
          <div className="custom-section-title">recommendations</div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📺</span>
                <a href="https://youtube.com/playlist?list=PLbVdwtmx18suCuPDLce5slcf8uCyJREBp&si=5-I5ZCir-qS7mnth" target="_blank" rel="noreferrer" className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">Humsafar</a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📺</span>
                <a href="https://youtube.com/playlist?list=PLb2aaNHUy_gHlSsv6128U9ZeoAPbZyBuj&si=SwvlyKsYF313vbWB" target="_blank" rel="noreferrer" className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">Kabhi Main Kabhi Tum</a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📚</span>
                <a href="https://archive.org/details/universalguideto0000coxb" target="_blank" rel="noreferrer" className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">Universal: A Guide to the Cosmos</a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <a href="https://watch32.sx/movie/watch-spider-man-into-the-spider-verse-sequel-full-66674" target="_blank" rel="noreferrer" className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">Spider-Man: Across The Spider-Verse</a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <a href="https://watch32.sx/movie/watch-a-man-called-otto-full-91870" target="_blank" rel="noreferrer" className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">A Man Called Otto</a>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-divider-thick" />

        <div className="custom-body space-y-4 section-border">
          <div className="custom-section-title">pictures</div>
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
              <a className="hover-scale" href="https://x.com/ibrahimansr" target="_blank" rel="noreferrer" title="X (Twitter)">
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
