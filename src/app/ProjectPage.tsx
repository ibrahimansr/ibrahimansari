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
            Muslim-focused hackathon — builders, mentors, and founders in one
            room for a weekend.
          </p>
          <div
            className="space-y-4 text-base leading-relaxed text-white/85"
            style={{ fontWeight: 300 }}
          >
            <p>
              I organized and hosted{' '}
              <a
                href="https://ummahhacks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/40 hover:border-white"
              >
                Ummah Hacks
              </a>{' '}
              as a space where technical ambition meets community: teams ship
              MVPs, learn from people who have raised and scaled, and meet
              sponsors who care about the Muslim tech ecosystem.
            </p>
            <p>
              The event is backed by serious partners — including{' '}
              <strong className="font-medium text-white/95">Shopify</strong>,{' '}
              <strong className="font-medium text-white/95">
                Automax AI (YC F25)
              </strong>
              ,{' '}
              <strong className="font-medium text-white/95">
                Hex Security (YC W26)
              </strong>
              , and others — which meant real API credits, mentorship, and
              visibility for hackers, not just a logo on a slide.
            </p>
            <p>
              The 2026 edition ran Jan 24–25 at Builder&apos;s Club in Kitchener,
              with 100+ participants on{' '}
              <a
                href="https://ummah-hacks.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/40 hover:border-white"
              >
                Devpost
              </a>{' '}
              — prize tracks spanning fintech (VePay), open innovation (Automax
              AI), medtech (Amano), startup (UMMAH1), charity, and more.
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
          Two papers; both lean on a small{' '}
          <strong className="font-medium text-white/80">GAN</strong> stage and an{' '}
          <strong className="font-medium text-white/80">MLP</strong> head for the
          numeric core.
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-white/80">
          <section>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-white/45">
              Monarchs &amp; urban heat
            </h2>
            <p>
              A conditional{' '}
              <strong className="text-white/90">GAN</strong> synthesizes
              counterfactual land-cover / thermal patches so we aren&apos;t
              limited to sparse real tiles when stress-testing the
              habitat–heat link. Tabular GIS features (impervious fraction,
              canopy, distance-to-core) feed a compact{' '}
              <strong className="text-white/90">MLP</strong> that maps each
              real or GAN-generated scene to a habitat-stress score; the paper
              compares distributions under observed vs. perturbed UHI.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-white/45">
              Ontario education finance (IK)
            </h2>
            <p>
              Board-level budgets are encoded as fixed-length vectors (grants,
              instructional, ops, admin, etc.). A lightweight{' '}
              <strong className="text-white/90">GAN</strong> proposes synthetic
              “what-if” allocations that stay near the manifold of real boards,
              which surfaces brittle equilibria. An{' '}
              <strong className="text-white/90">MLP</strong> regresses those
              vectors (and GAN samples) onto outcome proxies so skew and tail
              risk read as numbers, not vibes.
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
        Screen-capture vision + fine-tuned classifier + LLM planner — no in-game
        script injection.
      </p>
      <div
        className="max-w-3xl space-y-4 text-base leading-relaxed text-white/85"
        style={{ fontWeight: 300 }}
      >
        <p>
          <strong className="font-medium text-white/95">baconhead</strong> stays{' '}
          <strong className="text-white/95">outside</strong> the Roblox client: it
          samples pixels from macOS display capture (ScreenCaptureKit /
          display-stream APIs) and emits keyboard/mouse events through the OS
          accessibility / event-tap path. That means{' '}
          <strong className="text-white/95">
            zero DLL injection, zero Lua hooks, zero memory patching
          </strong>{' '}
          — the game sees a normal human peripheral stream, which keeps the threat
          model closer to “macro tool” than “cheat engine,” at the cost of
          latency and needing screen real estate dedicated to the window.
        </p>
        <p>
          The vision stack isn&apos;t just a pretrained checkpoint off the shelf.
          <strong className="text-white/95"> GameSense</strong> is{' '}
          <strong className="text-white/95">fine-tuned</strong> on frames harvested
          from your own sessions: weak labels come from gameplay phase detectors
          (death screens, menu idle, round resets), then a compact ViT-style
          backbone is trained with a frozen lower trunk + warmed classification
          head, focal loss for rare classes, and heavy{' '}
          <strong className="text-white/95">on-the-fly augmentation</strong>{' '}
          (blur, JPEG artifacts, resolution jitter) so it still works when Roblox
          UI scales or streaming compression kicks in.
        </p>
        <p>
          Fine-tuning loop in practice: (1) capture N minutes of labeled frames
          per title, (2) stratified train/val by map/session, (3) run short
          cosine-decay schedules with early stopping on macro-F1, (4) export a
          TorchScript / local weights bundle the runtime loads before the agent
          loop starts. Precision/recall per class are logged so you know whether
          “menu” is polluting “death” before you trust the policy head.
        </p>
        <p>
          Above GameSense, a frontier model reads recent frames + the classifier
          logits and proposes high-level actions; that layer is swappable, but
          the <em>differentiator</em> is the on-device, fine-tuned perception
          head that doesn&apos;t phone home for every pixel block.
        </p>
        <p className="text-white/95">
          The repo has crossed <strong className="font-semibold">50+ stars</strong>{' '}
          on GitHub — macOS-first, very much a research-y automation stack rather
          than a polished consumer app.
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
          A joke build that leaned into the worst parts of “growth.”
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
            If you treat visits, signups, or “traction” here as signal for anything
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
