'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { PlayButton } from "@/components/ui/play-button";
import Webring from "@/components/ui/webring";
import { useEffect, useState, useRef, useMemo } from "react";

// Dynamic ASCII Box Component - Using table structure for perfect alignment
// All boxes use the same fixed width based on the longest title
const FIXED_BOX_WIDTH = 22; // Based on "STUFF FROM THIS MONTH" (22 chars)

function AsciiBox({ title, className = "" }: { title: string; className?: string }) {
  // Use fixed width for all boxes
  const contentWidth = FIXED_BOX_WIDTH + 4; // 2 spaces + title area + 2 spaces
  const horizontalDashes = '─'.repeat(contentWidth);
  
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ 
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '1.5rem',
        lineHeight: '1.2',
        color: 'rgba(255, 255, 255, 0.9)',
        marginLeft: '0',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: 'auto' }}>
        <tbody>
          {/* Top line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>┌</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${contentWidth}ch` }}>{horizontalDashes}</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>┐</td>
          </tr>
          {/* Middle line with title */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>│</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${contentWidth}ch`, textAlign: 'left' }}>
              &nbsp;&nbsp;{title}
            </td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>│</td>
          </tr>
          {/* Bottom line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>└</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${contentWidth}ch` }}>{horizontalDashes}</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>┘</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Main Header Component
function MainHeader() {
  const name = "IBRAHIM ANSARI";
  const subtitle = "management engineering @ uwaterloo";
  const maxWidth = Math.max(name.length, subtitle.length) + 4; // 2 spaces padding on each side
  const horizontalLine = '═'.repeat(maxWidth);
  
  return (
    <div 
      style={{ 
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '2.25rem',
        lineHeight: '1.2',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 0 15px rgba(0, 0, 0, 1), 0 0 25px rgba(0, 0, 0, 0.9), 3px 3px 6px rgba(0, 0, 0, 1)',
        filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.95))',
        position: 'relative',
        zIndex: 10
      }}
      className="backdrop-blur-[0.5px] bg-black/10 px-6 py-4"
    >
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: 'auto', margin: '0 auto' }}>
        <tbody>
          {/* Top line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>╔</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch` }}>{horizontalLine}</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>╗</td>
          </tr>
          {/* Empty line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch` }}>&nbsp;</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
          </tr>
          {/* Name line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch`, textAlign: 'center' }}>
              {name}
            </td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
          </tr>
          {/* Subtitle line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch`, textAlign: 'center' }}>
              management engineering @ uwaterloo
              <span style={{ display: 'inline-block', animation: 'float 3s ease-in-out infinite', marginLeft: '0.3em' }}>
      <Image
                  src="/uwaterloo.png"
                  alt="University of Waterloo"
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
    </span>
            </td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
          </tr>
          {/* Empty line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch` }}>&nbsp;</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>║</td>
          </tr>
          {/* Bottom line */}
          <tr>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>╚</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap', width: `${maxWidth}ch` }}>{horizontalLine}</td>
            <td style={{ padding: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>╝</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ASCII Cosmos Background Component - Exact replica from https://github.com/nobytesgiven/ASCII-Cosmos.git
function CosmosBackground() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; char: string; className: string }>>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Get window dimensions for star count calculation
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Exact calculation from ASCII Cosmos: 250 * window.innerWidth/2560
      // Ensure minimum stars for visibility
      const starCount = Math.max(Math.floor(250 * width / 2560), 100);
      
      // Generate stars exactly like ASCII Cosmos createStar function
      const newStars: Array<{ x: number; y: number; char: string; className: string }> = [];
      
      for (let i = 0; i < starCount; i++) {
        // Use Math.random() like ASCII Cosmos
        const x = Math.random() * width;
        const y = Math.random() * height;
        const t = Math.random();
        
        // Exact logic from ASCII Cosmos createStar: "*" by default, "." if t > 0.50
        let char = "*";
        if (t > 0.50) {
          char = ".";
        }
        
        // Assign animation class exactly like ASCII Cosmos
        const r = Math.random();
        let className = 'star'; // Default no animation
        if (r < 1/6) className = 'star1';
        else if (r < 2/6) className = 'star2';
        else if (r < 3/6) className = 'star3';
        else if (r < 4/6) className = 'star4';
        else if (r < 5/6) className = 'star5';
        
        newStars.push({ x, y, char, className });
      }
      
      setStars(newStars);
      console.log(`Generated ${newStars.length} stars`); // Debug
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      {stars.length > 0 ? (
        <>
          {stars.map((star, i) => {
        // Animation durations from ASCII Cosmos CSS
        const durations: { [key: string]: number } = {
          'star': 0, // No animation
          'star1': 2,
          'star2': 7,
          'star3': 13,
          'star4': 37,
          'star5': 107,
        };
        const duration = durations[star.className] || 0;
        
        return (
          <pre
            key={`cosmos-star-${i}`}
            className={`allstars ${star.className}`}
            style={{
              position: 'absolute',
              left: `${star.x}px`,
              top: `${star.y}px`,
              color: '#ffffff', // White for visibility
              fontSize: '18px', // Slightly larger for visibility
              lineHeight: '1',
              margin: 0,
              padding: 0,
              animation: duration > 0 ? `blink ${duration}s infinite` : 'none',
              opacity: 1.0, // Full opacity to ensure visibility
              fontFamily: 'Consolas, monospace',
              zIndex: 0,
              whiteSpace: 'pre',
              userSelect: 'none',
              textShadow: '0 0 2px rgba(255, 255, 255, 0.5)', // Subtle glow for visibility
            }}
          >
            {star.char}
          </pre>
        );
      })}
        </>
      ) : (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '20px' }}>
          Loading stars...
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerDimensions, setHeaderDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (headerRef.current && mounted) {
      const updateDimensions = () => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        if (rect) {
          setHeaderDimensions({
            width: rect.width,
            height: rect.height
          });
        }
      };
      
      // Small delay to ensure header is rendered
      setTimeout(updateDimensions, 100);
      // Also update after a longer delay to catch any layout shifts
      setTimeout(updateDimensions, 500);
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [mounted]);

  return (
    <main className="relative bg-black text-white font-mono min-h-screen overflow-x-hidden">
      {/* ASCII Cosmos Background - Exact replica from https://github.com/nobytesgiven/ASCII-Cosmos.git */}
      {mounted && <CosmosBackground />}

      {/* Main Content */}
      <div className="relative">
        {/* Content */}
        <div className="relative z-10 bg-black/10 backdrop-blur-sm min-h-screen">
          <div className="mx-auto max-w-6xl px-6 py-20">
            {/* ASCII Animation GIF - Option 4: Behind header as background */}
            <div className="mb-16 flex justify-center">
              <div 
                ref={headerRef}
                className="relative"
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  width: headerDimensions.width > 0 ? `${headerDimensions.width}px` : 'auto',
                  height: headerDimensions.height > 0 ? `${headerDimensions.height}px` : 'auto',
                  position: 'relative',
                  boxSizing: 'border-box'
                }}
              >
                {/* Background GIF - positioned behind the header box, contained within box */}
                {headerDimensions.width > 0 && headerDimensions.height > 0 && (
                  <div 
                    className="absolute pointer-events-none"
                    style={{
                      opacity: 1.0,
                      zIndex: 0,
                      top: 0,
                      left: 0,
                      width: `${headerDimensions.width}px`,
                      height: `${headerDimensions.height}px`,
                      overflow: 'hidden',
                      clipPath: `inset(0)`,
                      boxSizing: 'border-box'
                    }}
                  >
                    <div
                      style={{
                        width: `${headerDimensions.width}px`,
                        height: `${headerDimensions.height}px`,
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <Image
                        src="/ascii-animation.gif"
                        alt="ASCII Animation"
                        width={Math.round(headerDimensions.width)}
                        height={Math.round(headerDimensions.height)}
                        style={{
                          width: `${headerDimensions.width}px`,
                          height: `${headerDimensions.height}px`,
                          objectFit: 'cover',
                          display: 'block',
                          maxWidth: `${headerDimensions.width}px`,
                          maxHeight: `${headerDimensions.height}px`,
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                
                {/* Header with enhanced visibility - on top */}
                <div 
                  className="relative"
                  style={{
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  <MainHeader />
                </div>
              </div>
            </div>

            {/* 
              ALTERNATIVE OPTIONS (uncomment to try):
              
              OPTION 2: ASCII Box Frame around GIF
              <div className="mb-16 flex justify-center">
                <div className="relative inline-block">
                  <pre className="text-white font-mono text-xs leading-tight">
{`┌─────────────────────────────────────┐
│                                     │`}
                  </pre>
                  <div className="px-4">
                    <Image
                      src="/ascii-animation.gif"
                      alt="ASCII Animation"
                      width={300}
                      height={225}
                      className="max-w-full h-auto"
                      unoptimized
                    />
                  </div>
                  <pre className="text-white font-mono text-xs leading-tight">
{`│                                     │
└─────────────────────────────────────┘`}
                  </pre>
                </div>
              </div>
              
              OPTION 3: Floating top-right corner
              <div className="absolute top-4 right-4 z-20">
                <Image
                  src="/ascii-animation.gif"
                  alt="ASCII Animation"
                  width={200}
                  height={150}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>
              
              OPTION 4: Behind header as background
              <div className="mb-16 flex justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <Image
                    src="/ascii-animation.gif"
                    alt="ASCII Animation"
                    width={600}
                    height={450}
                    className="max-w-full h-auto"
                    unoptimized
                  />
                </div>
                <div className="relative z-10">
                  <MainHeader />
                </div>
          </div>

              OPTION 5: Wide banner at top
              <div className="mb-8 w-full">
                <Image
                  src="/ascii-animation.gif"
                  alt="ASCII Animation"
                  width={1200}
                  height={200}
                  className="w-full h-auto object-cover opacity-70"
                  unoptimized
                />
              </div>
              
              OPTION 6: Small next to header (side by side on desktop)
              <div className="mb-16 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-48 md:w-64">
                  <Image
                    src="/ascii-animation.gif"
                    alt="ASCII Animation"
                    width={256}
                    height={192}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <MainHeader />
              </div>
            */}

              {/* Grid Layout for Sections - Centered and aligned */}
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20" style={{ 
                  width: '100%',
                  maxWidth: 'fit-content'
                }}>
                {/* Experience */}
                <section className="flex flex-col">
                  <div className="mb-6 w-full flex justify-center">
                    <AsciiBox title="EXPERIENCE" />
            </div>

                  <div className="space-y-4 w-full pl-[2ch]" style={{ maxWidth: `${FIXED_BOX_WIDTH + 6}ch` }}>
                    <div className="py-2 flex items-center gap-2">
                      <Image
                        src="/brikli.png"
                        alt="Brikli"
                        width={32}
                        height={32}
                        className="object-contain flex-shrink-0"
                      />
                      <div>
                        <div className="font-vt323 text-xl text-white mb-1">
                          SOFTWARE ENGINEER — <a href="https://brikli.com/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">BRIKLI</a>
                        </div>
                        <div className="font-vt323 text-base text-white/60">making housing easier</div>
              </div>
            </div>

                    <div className="py-2 flex items-center gap-2">
                      <Image
                        src="/tablingos.png"
                        alt="Tablingos"
                        width={32}
                        height={32}
                        className="object-contain flex-shrink-0"
                      />
                      <div>
                        <div className="font-vt323 text-xl text-white mb-1">
                          CO-FOUNDER — <a href="https://www.linkedin.com/company/tablingos/about/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">TABLINGOS</a>
                        </div>
                        <div className="font-vt323 text-base text-white/60">data automation backed by Microsoft</div>
                      </div>
                    </div>
                    
                    <div className="py-2 flex items-center gap-2">
                      <Image
                        src="/wwf.png"
                        alt="WWF"
                        width={32}
                        height={32}
                        className="object-contain flex-shrink-0"
                      />
            <div>
                        <div className="font-vt323 text-xl text-white mb-1 whitespace-nowrap">
                          DATA SCIENTIST INTERN — <a href="https://www.worldwildlife.org/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">WWF</a>
                        </div>
                        <div className="font-vt323 text-base text-white/60">using data science to do good</div>
                      </div>
            </div>
          </div>
                </section>

                {/* Projects */}
                <section className="flex flex-col">
                  <div className="mb-6 w-full flex justify-center">
                    <AsciiBox title="STUFF FROM THIS MONTH" />
                  </div>
                  
                  <div className="space-y-4 w-full pl-[2ch]" style={{ maxWidth: `${FIXED_BOX_WIDTH + 6}ch` }}>
                    <div className="py-2">
                      <div className="font-vt323 text-xl text-white mb-1">
                        <a href="https://github.com/ibrahim-ansari-code/LLM-Council-IDE" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">LLM COUNCIL IDE</a>
                      </div>
                      <div className="font-vt323 text-base text-white/60">quick project, 20 stars on github</div>
                    </div>
                    
                    <div className="py-2">
                      <div className="font-vt323 text-xl text-white mb-1">
                        <a href="https://ummahhacks.com/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">UMMAH HACKS</a>
                      </div>
                      <div className="font-vt323 text-base text-white/60">backed by YC startups and Shopify</div>
                    </div>
                    
                    <div className="py-2 mt-6">
                      <div className="font-vt323 text-base text-white/60">possible publication 👀</div>
                    </div>
                  </div>
                </section>

                 {/* Research */}
                 <section className="flex flex-col">
                   <div className="mb-6 w-full flex justify-center">
                     <AsciiBox title="RESEARCH PAPERS" />
                   </div>
                   
                   <div className="space-y-3 w-full pl-[2ch]" style={{ maxWidth: `${FIXED_BOX_WIDTH + 6}ch`, wordBreak: 'break-word' }}>
                    <div className="py-2">
                      <a 
                        href="https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2025-001" 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                      >
                        optimizing budget allocations in ontario school boards for efficient, equitable, and inclusive education
                      </a>
            </div>
                    
                    <div className="py-2">
                      <a 
                        href="https://journal.stemfellowship.org/doi/abs/10.17975/sfj-2024-004" 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                      >
                        analyzing urban heat islands and their impact on the monarch butterfly population
                      </a>
            </div>
          </div>
                </section>

                 {/* Music */}
                 <section className="flex flex-col">
                   <div className="mb-6 w-full flex justify-center">
                     <AsciiBox title="MUSIC" />
            </div>
                   
                   <div className="space-y-4 w-full pl-[2ch] relative" style={{ maxWidth: `${FIXED_BOX_WIDTH + 20}ch` }}>
                    <div className="flex items-center gap-3 py-2">
                      <Image
                        src="/Rents Due Nemzz.jpeg"
                        alt="Nemzzz"
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <a 
                          className="font-vt323 text-lg text-white/80 hover:text-white underline" 
                          href="https://open.spotify.com/track/7H5CsjEafNygkvcm69RevN?si=2a55ad0752784678" 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          cold — nemzzz
                        </a>
            </div>
                      <div style={{ position: 'absolute', right: '0' }}>
                        <PlayButton songIndex={0} />
          </div>
        </div>

                    <div className="flex items-center gap-3 py-2 relative">
                      <Image
                        src="/MSE100-TutorialWeek2DemoEmpty (1) (1).jpg"
                        alt="Yeat"
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <a 
                          className="font-vt323 text-lg text-white/80 hover:text-white underline" 
                          href="https://open.spotify.com/track/5SaKYcCTEdCkacDamzfRfX?si=8c5cef0586da43f1" 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          2tone — yeat, don toliver
                        </a>
                      </div>
                      <div style={{ position: 'absolute', right: '0' }}>
                        <PlayButton songIndex={1} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 py-2 relative">
                      <Image
                        src="/Fly Me to the Moon Frank Sinatra.jpeg"
                        alt="Frank Sinatra"
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <a 
                          className="font-vt323 text-lg text-white/80 hover:text-white underline" 
                          href="https://open.spotify.com/track/5b7OgznPJJr1vHNYGyvxau?si=a1c8f067770e4967" 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          fly me to the moon — frank sinatra
                        </a>
                      </div>
                      <div style={{ position: 'absolute', right: '0' }}>
                        <PlayButton songIndex={2} />
                      </div>
                    </div>
          </div>
                </section>

               {/* Recommendations */}
               <section className="flex flex-col">
                 <div className="mb-6 w-full flex justify-center">
                   <AsciiBox title="RECOMMENDATIONS" />
          </div>
                 
                 <div className="space-y-3 w-full pl-[2ch]" style={{ maxWidth: `${FIXED_BOX_WIDTH + 6}ch` }}>
                   <div className="py-2">
                     <a 
                       href="https://youtube.com/playlist?list=PLbVdwtmx18suCuPDLce5slcf8uCyJREBp&si=5-I5ZCir-qS7mnth" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                     >
                       Humsafar
                     </a>
          </div>
                   
                   <div className="py-2">
                     <a 
                       href="https://youtube.com/playlist?list=PLb2aaNHUy_gHlSsv6128U9ZeoAPbZyBuj&si=SwvlyKsYF313vbWB" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                     >
                       Kabhi Main Kabhi Tum
                     </a>
        </div>

                   <div className="py-2">
                     <a 
                       href="https://archive.org/details/universalguideto0000coxb" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                     >
                       Universal: A Guide to the Cosmos
                     </a>
                   </div>
                   
                   <div className="py-2">
                     <a 
                       href="https://watch32.sx/movie/watch-spider-man-into-the-spider-verse-sequel-full-66674" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                     >
                       Spider-Man: Across The Spider-Verse
                     </a>
            </div>
                   
                   <div className="py-2">
                     <a 
                       href="https://watch32.sx/movie/watch-a-man-called-otto-full-91870" 
                       target="_blank" 
                       rel="noreferrer" 
                       className="font-vt323 text-lg text-white/80 hover:text-white underline block"
                     >
                       A Man Called Otto
                     </a>
            </div>
          </div>
               </section>

               {/* Pictures - Horizontal Scrollable */}
               <section className="flex flex-col">
                 <div className="mb-6 w-full flex justify-center">
                   <AsciiBox title="PICTURES" />
        </div>

                 <div className="w-full pl-[2ch]" style={{ maxWidth: `${FIXED_BOX_WIDTH + 18}ch` }}>
                   <div className="overflow-x-auto border-2 border-white/20 p-4">
                     <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                       <Image
                         src="/Activity from Ibrahim Khawar.jpeg"
                         alt="UNESCO Award"
                         width={400}
                         height={300}
                         className="h-64 w-auto object-contain flex-shrink-0"
                       />
                       <Image
                         src="/37.jpg"
                         alt="HammerHacks"
                         width={400}
                         height={300}
                         className="h-64 w-auto object-contain flex-shrink-0"
                       />
                       <Image
                         src="/IMG_7138.jpeg"
                         alt="Education Presentation"
                         width={400}
                         height={300}
                         className="h-64 w-auto object-contain flex-shrink-0"
                       />
                     </div>
                   </div>
                 </div>
               </section>
                </div>
              </div>


              {/* Contact */}
              <section className="mb-20 flex flex-col">
                <div className="mb-8 w-full flex justify-center">
                  <AsciiBox title="CONTACT" className="text-center" />
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-6 pl-[1ch]">
                  <a 
                    href="mailto:ibrahim.ansari4161@gmail.com" 
                    className="text-white/70 hover:text-white transition-colors"
                    title="Email"
                  >
                    <Mail size={24} />
                  </a>
                  <a 
                    href="https://github.com/ibrahim-ansari-code" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ibrahim-ansari-775529270/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="https://x.com/ibrahimansr" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    title="X (Twitter)"
                  >
                    <Twitter size={24} />
                  </a>
                  <a 
                    href="https://www.instagram.com/ibrahim.ansr/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    title="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                <Webring />
              </div>
              </section>
          </div>
        </div>
      </div>
    </main>
  );
}
