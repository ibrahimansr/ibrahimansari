import { Link } from 'react-router';
import researchThumbUrl from '../../assets/research/research-papers.jpeg?url';
import type { ProjectSlug } from '../../data/projects';

type ProjectCard = {
  id: ProjectSlug;
  title: string;
  media: 'video' | 'image' | 'none';
  src?: string;
};

const CARDS: ProjectCard[] = [
  {
    id: 'ummah',
    title: 'Ummah Hacks',
    media: 'video',
    src: '/projects/ummah-recap.mp4',
  },
  {
    id: 'research',
    title: 'Research',
    media: 'image',
    src: researchThumbUrl,
  },
  {
    id: 'baconhead',
    title: 'baconhead',
    media: 'video',
    src: '/projects/baconhead.mp4',
  },
  {
    id: 'surprise',
    title: '???',
    media: 'none',
  },
];

function ProjectThumb({ card }: { card: ProjectCard }) {
  if (card.media === 'none') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-xs tracking-widest text-white/35">
        ???
      </div>
    );
  }

  if (card.media === 'image' && card.src) {
    return (
      <img
        src={card.src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <video
      src={card.src}
      className="h-full w-full object-cover"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
    />
  );
}

/** Wider strip of project tiles; videos autoplay (muted). Clicks go to `/p/:slug`. */
export function ProjectsRail() {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] md:max-h-[min(82vh,36rem)] md:w-[min(32rem,46vw)] md:shrink-0 md:snap-none md:flex-col md:gap-3 md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pr-1">
      {CARDS.map((card) => (
        <Link
          key={card.id}
          to={`/p/${card.id}`}
          className="group relative h-56 w-[10.5rem] shrink-0 snap-start overflow-hidden border border-white/15 bg-white/[0.04] text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform hover:border-white/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] active:scale-[0.98] md:h-48 md:w-full"
        >
          <div className="absolute inset-0">
            <ProjectThumb card={card} />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-2.5 py-2.5 pt-10">
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-white/90">
              {card.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
