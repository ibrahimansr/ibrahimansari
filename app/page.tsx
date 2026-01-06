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
        textAlign: 'center'
      }}
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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Butterfly shape
  const butterflyShape = useMemo(() => {
    const points: Array<{ x: number; y: number; char: string }> = [];
    const centerX = 40;
    const centerY = 25;
    
    // Left upper wing
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 2) + (i / 7) * (Math.PI / 2.5);
      const radius = 12 + (i / 7) * 8;
      points.push({
        x: centerX - Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 2.2) + (i / 5) * (Math.PI / 3);
      const radius = 8 + (i / 5) * 6;
      points.push({
        x: centerX - Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    // Left lower wing
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 2) - (i / 7) * (Math.PI / 2.5);
      const radius = 12 + (i / 7) * 8;
      points.push({
        x: centerX - Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    // Right upper wing
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 2) - (i / 7) * (Math.PI / 2.5);
      const radius = 12 + (i / 7) * 8;
      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 2.2) - (i / 5) * (Math.PI / 3);
      const radius = 8 + (i / 5) * 6;
      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    // Right lower wing
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 2) + (i / 7) * (Math.PI / 2.5);
      const radius = 12 + (i / 7) * 8;
      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        char: '*'
      });
    }
    
    // Body
    for (let i = 0; i < 10; i++) {
      points.push({
        x: centerX,
        y: centerY - 5 + i,
        char: i === 0 ? 'o' : '|'
      });
    }
    
    // Antennae
    points.push({ x: centerX - 2, y: centerY - 6, char: '/' });
    points.push({ x: centerX + 2, y: centerY - 6, char: '\\' });
    points.push({ x: centerX - 3, y: centerY - 7, char: '.' });
    points.push({ x: centerX + 3, y: centerY - 7, char: '.' });
    
    return points;
  }, []);

  // Cosmos positions - scattered stars that will form butterfly
  // Use seeded random for consistent server/client rendering
  const cosmosPositions = useMemo(() => {
    let seed = 12345; // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    return butterflyShape.map((_, i) => {
      seededRandom(); // Advance seed
      return {
        x: seededRandom() * 70 + 5,
        y: seededRandom() * 40 + 5,
      };
    });
  }, [butterflyShape]);

  // Animation sequence
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Wait a bit for butterfly to fly away, then show content
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Render animation
  const renderAnimation = () => {
    const canvas: string[][] = Array(50).fill(null).map(() => Array(80).fill(' '));
    
    if (animationProgress < 0.5) {
      // Phase 1: Cosmos stars transform to butterfly (0-1.5s)
      const transformProgress = animationProgress / 0.5;
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const eased = easeInOut(transformProgress);
      
      // Morph from cosmos positions to butterfly shape
      butterflyShape.forEach((point, index) => {
        const cosmosPos = cosmosPositions[index];
        const currentX = cosmosPos.x + (point.x - cosmosPos.x) * eased;
        const currentY = cosmosPos.y + (point.y - cosmosPos.y) * eased;
        
        const x = Math.round(currentX);
        const y = Math.round(currentY);
        
        if (x >= 0 && x < 80 && y >= 0 && y < 50) {
          canvas[y][x] = point.char;
        }
      });
    } else {
      // Phase 2: Butterfly flies away (1.5-3s)
      const flyProgress = (animationProgress - 0.5) / 0.5;
      const centerX = 40;
      const centerY = 25;
      
      butterflyShape.forEach((point) => {
        const offsetX = point.x - centerX;
        const offsetY = point.y - centerY;
        const flyDistance = 100;
        const currentX = point.x + offsetX * flyProgress * flyDistance / 20;
        const currentY = point.y + offsetY * flyProgress * flyDistance / 20;
        const opacity = 1 - flyProgress;
        
        const x = Math.round(currentX);
        const y = Math.round(currentY);
        
        if (x >= 0 && x < 80 && y >= 0 && y < 50 && opacity > 0.1) {
          canvas[y][x] = point.char;
        }
      });
    }

    return canvas.map(row => row.join('')).join('\n');
  };

  // Shooting stars - use seeded random
  const shootingStars = useMemo(() => {
    let seed = 67890;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    return Array.from({ length: 3 }).map((_, i) => {
      seededRandom();
      return {
        id: i,
        x: seededRandom() * 100,
        y: seededRandom() * 100,
        delay: seededRandom() * 5,
        duration: 1 + seededRandom() * 1
      };
    });
  }, []);

  return (
    <main className="relative bg-black text-white font-mono min-h-screen overflow-x-hidden">
      {/* Intro Animation - Blocks page for 3 seconds */}
      {!showContent && mounted && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <pre className="text-[6px] sm:text-[8px] md:text-[10px] leading-[1.1] text-white font-mono whitespace-pre select-none">
            {renderAnimation()}
          </pre>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="relative">
          {/* Twinkling Stars Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {Array.from({ length: 100 }).map((_, i) => {
              // Use seeded random for consistent positions
              let seed = 54321 + i;
              const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
              };
              
              const x = seededRandom() * 100;
              const y = seededRandom() * 100;
              const size = seededRandom() * 2 + 1;
              const delay = seededRandom() * 3;
              const duration = 2 + seededRandom() * 2;
              
  return (
                <div
                  key={`star-${i}`}
                  className="absolute text-white/30"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    fontSize: `${size}px`,
                    animation: `twinkle ${duration}s infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  *
                </div>
              );
            })}
          </div>

          {/* Shooting Stars */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {shootingStars.map((star) => (
              <div
                key={star.id}
                className="absolute text-white/80"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animation: `shoot ${star.duration}s infinite`,
                  animationDelay: `${star.delay}s`,
                }}
              >
                <span className="inline-block">*</span>
                <span className="inline-block ml-1">-</span>
                <span className="inline-block ml-1">-</span>
                <span className="inline-block ml-1">-</span>
                <span className="inline-block ml-1">-</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 bg-black/80 backdrop-blur-sm min-h-screen">
            <div className="mx-auto max-w-6xl px-6 py-20">
              {/* Header */}
              <div className="mb-16 flex justify-center">
                <MainHeader />
              </div>

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
                        <a href="https://www.letthemhit.ca/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">LET THEM HIT</a>
                      </div>
                      <div className="font-vt323 text-base text-white/60">10k users in a week</div>
                    </div>
                    
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
      )}
    </main>
  );
}
