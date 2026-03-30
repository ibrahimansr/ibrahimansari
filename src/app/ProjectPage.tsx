import { Link, Navigate, useParams } from 'react-router';
import { isProjectSlug } from '../data/projects';

const PAPER_MONARCH_EMBED =
  'https://drive.google.com/file/d/13_mV8QIK9et7CNBK_AAbZibdZFb1-7HL/preview';
const PAPER_MONARCH_OPEN =
  'https://drive.google.com/file/d/13_mV8QIK9et7CNBK_AAbZibdZFb1-7HL/view';
const PAPER_EDU_EMBED =
  'https://drive.google.com/file/d/1zw4GxDShfs00zw66bCBYd9MF82Cvmyh_/preview';
const PAPER_EDU_OPEN =
  'https://drive.google.com/file/d/1zw4GxDShfs00zw66bCBYd9MF82Cvmyh_/view';

const shellStyle = { fontFamily: "'Hanken Grotesk', sans-serif" } as const;

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isProjectSlug(slug)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white" style={shellStyle}>
      <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-12 md:py-24">
        <Link
          to="/"
          className="mb-12 inline-block text-sm text-white/60 transition-colors hover:text-white"
        >
          ← home
        </Link>

        {slug === 'ummah' && <UmmahBody />}
        {slug === 'research' && <ResearchBody />}
        {slug === 'baconhead' && <BaconheadBody />}
        {slug === 'surprise' && <SurpriseBody />}
      </div>
    </div>
  );
}

function MediaHero({
  type,
  src,
}: {
  type: 'video' | 'image' | 'none';
  src?: string;
}) {
  if (type === 'none' || !src) {
    return (
      <div className="mb-10 flex aspect-video w-full items-center justify-center border border-dashed border-white/20 bg-white/[0.03] text-sm tracking-widest text-white/40">
        no media
      </div>
    );
  }
  if (type === 'image') {
    return (
      <img
        src={src}
        alt=""
        className="mb-10 w-full border border-white/10 object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <video
      src={src}
      className="mb-10 aspect-video w-full border border-white/10 object-cover"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
    />
  );
}

function UmmahBody() {
  return (
    <>
      <MediaHero type="video" src="/projects/ummah-recap.mp4" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,504px)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="w-full max-w-[504px] border border-white/15 bg-black lg:max-w-none">
          <div className="max-h-[min(1004px,85vh)] overflow-y-auto [scrollbar-width:thin]">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7424895501914755072"
              height={1004}
              width={504}
              title="Ummah Hacks — LinkedIn post"
              allowFullScreen
              className="block h-[1004px] w-full max-w-[504px] border-0"
            />
          </div>
        </div>

        <div>
          <h1
            className="mb-4 text-2xl font-light md:text-3xl"
            style={{ fontWeight: 300 }}
          >
            Ummah Hacks
          </h1>
          <p className="mb-6 text-sm text-white/55">
            hackathon for Muslim builders — a weekend of shipping, mentorship,
            and meeting people who get it.
          </p>
          <div
            className="space-y-4 text-base leading-relaxed text-white/85"
            style={{ fontWeight: 300 }}
          >
            <p>
              organized and hosted{' '}
              <a
                href="https://ummahhacks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/40 hover:border-white"
              >
                Ummah Hacks
              </a>{' '}
              — wanted to build something where Muslim engineers and founders
              could actually meet each other, ship MVPs, and get feedback from
              people who&apos;ve raised and scaled.
            </p>
            <p>
              got{' '}
              <strong className="font-medium text-white/95">Shopify</strong>,{' '}
              <strong className="font-medium text-white/95">
                Automax AI (YC F25)
              </strong>
              ,{' '}
              <strong className="font-medium text-white/95">
                Hex Security (YC W26)
              </strong>
              , and others to sponsor.
            </p>
            <p>
              the 2026 edition ran Jan 24–25 at Builder&apos;s Club in Kitchener,
              100+ participants on{' '}
              <a
                href="https://ummah-hacks.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/40 hover:border-white"
              >
                Devpost
              </a>{' '}
              — prize tracks in fintech, medtech, open innovation, charity, and more.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://ummahhacks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 px-5 py-2.5 text-sm transition-colors hover:border-white/55"
            >
              ummahhacks.com
            </a>
            <a
              href="https://ummah-hacks.devpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 px-5 py-2.5 text-sm transition-colors hover:border-white/55"
            >
              Devpost → Ummah Hacks 2026
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function DrivePaperEmbed({
  title,
  embedSrc,
  openHref,
}: {
  title: string;
  embedSrc: string;
  openHref: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <div className="overflow-hidden border border-white/15 bg-black">
        <iframe
          src={embedSrc}
          title={title}
          className="h-[min(560px,70vh)] w-full"
          allow="autoplay"
        />
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-white/45 underline-offset-2 hover:text-white/70"
      >
        Open in Google Drive if the embed is blocked
      </a>
    </div>
  );
}

function ResearchBody() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_min(100%,440px)] lg:items-start lg:gap-14">
      <div className="min-w-0" style={{ fontWeight: 300 }}>
        <h1 className="mb-3 text-2xl font-light md:text-3xl">Research</h1>
        <p className="mb-10 text-sm text-white/50">
          two published papers — one centered on{' '}
          <strong className="font-medium text-white/80">CycleGAN</strong>, the other on an{' '}
          <strong className="font-medium text-white/80">MLP</strong>.
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-white/80">
          <section>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-white/45">
              Monarchs &amp; urban heat
            </h2>
            <p>
              looked at how urban heat islands affect monarch butterfly
              populations across Toronto, Montréal, and Vancouver. used a{' '}
              <strong className="text-white/90">CycleGAN</strong> to do
              unpaired image-to-image translation between satellite imagery
              and green space layout plans — basically generating equitable
              urban green space designs from Google Earth data. also built a
              22-layer CNN from scratch to classify 100 butterfly and moth
              species so you can actually track whether the green spaces help
              monarch populations over time.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-white/45">
              Ontario education budgeting
            </h2>
            <p>
              Ontario school boards have massive funding gaps — some schools
              are way over capacity while others sit 40% empty. we pulled
              financial reports and performance data for all 72 boards and
              trained an{' '}
              <strong className="text-white/90">MLP</strong> regression model
              to predict how budget allocations across 24 categories affect
              EQAO pass rates and graduation rates. the focus was on mental
              health, special education, and Indigenous education funding
              specifically — where the disparities are worst.
            </p>
          </section>
        </div>
      </div>

      <aside className="flex min-w-0 flex-col gap-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-8 lg:[scrollbar-width:thin]">
        <DrivePaperEmbed
          title="Paper — monarchs & UHI"
          embedSrc={PAPER_MONARCH_EMBED}
          openHref={PAPER_MONARCH_OPEN}
        />
        <DrivePaperEmbed
          title="Paper — budgeting & education"
          embedSrc={PAPER_EDU_EMBED}
          openHref={PAPER_EDU_OPEN}
        />
      </aside>
    </div>
  );
}

function BaconheadBody() {
  return (
    <>
      <MediaHero type="video" src="/projects/baconhead.mp4" />
      <h1
        className="mb-4 max-w-2xl text-2xl font-light md:text-3xl"
        style={{ fontWeight: 300 }}
      >
        baconhead
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-white/55">
        vision-based game agent — screen capture in, actions out, nothing
        injected.
      </p>
      <div
        className="max-w-3xl space-y-4 text-base leading-relaxed text-white/85"
        style={{ fontWeight: 300 }}
      >
        <p>
          originally wanted to implement{' '}
          <a
            href="https://arxiv.org/html/2505.24784v1"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-white/40 hover:border-white"
          >
            AXIOM
          </a>{' '}
          (active inference with expanding object-centric models) but didn&apos;t
          have the compute, so i went with DPO instead.
        </p>
        <p>
          <strong className="font-medium text-white/95">baconhead</strong> sits
          completely outside the Roblox client — reads pixels via macOS screen
          capture and sends inputs through the OS accessibility path. no
          injection, no hooks, no memory patching. the game just sees normal
          keyboard and mouse events.
        </p>
        <p>
          the vision model is fine-tuned on your own gameplay frames — weak
          labels from phase detectors (death screens, menus, round resets), then
          a ViT backbone with focal loss and heavy augmentation so it handles
          UI scaling and compression artifacts. a frontier model sits on top,
          reads frames + classifier logits, and decides what to do.
        </p>
        <p className="text-white/95">
          50+ stars on GitHub — macOS-first, more of a research project than a
          polished app.
        </p>
      </div>
      <a
        href="https://github.com/ibrahim-ansari-code/baconhead"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block border border-white/30 px-5 py-2.5 text-sm transition-colors hover:border-white/55"
      >
        GitHub → ibrahim-ansari-code/baconhead
      </a>
    </>
  );
}

function SurpriseBody() {
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <MediaHero type="none" />
        <h1 className="mb-4 text-2xl font-light md:text-3xl" style={{ fontWeight: 300 }}>
          you weren&apos;t supposed to find this
        </h1>
        <p className="mb-6 text-sm text-white/55">
          A joke build that leaned into the worst parts of "growth."
        </p>
        <div
          className="space-y-4 text-base leading-relaxed text-white/85"
          style={{ fontWeight: 300 }}
        >
          <p>
            This one is intentionally unserious: the headline claim is on the order
            of <strong className="text-white/95">10k+ users</strong>, with a
            meaningful slice of that number{' '}
            <strong className="text-white/95">botted</strong> because the whole
            point was to parody startup metrics theater.
          </p>
          <p>
            If you treat visits, signups, or "traction" here as signal for anything
            other than comedy, you&apos;ve missed the bit.
          </p>
        </div>
        <a
          href="https://www.letthemhit.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-white/30 px-5 py-2.5 text-sm transition-colors hover:border-white/55"
        >
          letthemhit.ca
        </a>
      </div>
    </>
  );
}
