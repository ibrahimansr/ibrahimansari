import { GitHubCalendar } from 'react-github-calendar';
import { Link } from 'react-router';
import React from 'react';

const CONTRIBUTION_BLOCK_SIZE = 12;
const CONTRIBUTION_BLOCK_MARGIN = 4;

export function HomePage() {
  const [copied, setCopied] = React.useState(false);

  const sixMonthsAgo = React.useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const copyEmail = () => {
    const email = 'ibrahim.ansari4161@gmail.com';
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-8 py-20 md:px-16 md:py-32">
        <header className="mb-20 flex items-start justify-between">
          <img
            src="/minion-hoverboard.gif"
            alt="Minion on hoverboard"
            className="h-15 w-15 object-cover"
          />
          <nav className="flex flex-wrap items-center justify-end gap-6 text-sm">
            <Link
              to="/other"
              className="hover:opacity-70 transition-opacity"
            >
              other
            </Link>
            <a
              href="https://github.com/ibrahim-ansari-code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/ibrahim-ansari-775529270/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              linkedin
            </a>
            <a
              href="https://x.com/ibrahimansr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              x
            </a>
          </nav>
        </header>

        <main
          className="space-y-16 text-base leading-relaxed"
          style={{ fontWeight: 300 }}
        >
          <p>
            i've done 5 technical roles, currently founding eng @{' '}
            <a
              href="https://brikli.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-70 transition-opacity"
            >
              brikli
            </a>{' '}
            (antler w26). studying management engineering @ uwaterloo
          </p>
          <p>
            recently hosted{' '}
            <a
              href="https://ummahhacks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-70 transition-opacity"
            >
              ummah hacks
            </a>{' '}
            (backed by shopify, yc founders, etc.) and made{' '}
            <a
              href="https://github.com/ibrahim-ansari-code/baconhead"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-70 transition-opacity"
            >
              baconhead
            </a>
            . Learning to post train models and change automations.
          </p>

          <p>
            previously published{' '}
            <a
              href="https://drive.google.com/file/d/13_mV8QIK9et7CNBK_AAbZibdZFb1-7HL/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-70 transition-opacity"
            >
              paper on monarch butterflies
            </a>{' '}
            and{' '}
            <a
              href="https://drive.google.com/file/d/1zw4GxDShfs00zw66bCBYd9MF82Cvmyh_/view"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white hover:opacity-70 transition-opacity"
            >
              budgeting education
            </a>
          </p>

          <div className="flex items-center gap-3 pt-16">
            <p>ibrahim.ansari4161@gmail.com</p>
            <button
              type="button"
              onClick={copyEmail}
              className="border border-white/30 px-3 py-1 text-sm transition-colors hover:border-white/60"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </main>

        <section className="mt-20 w-full">
          <div className="flex justify-center overflow-x-auto">
            <a
              href="https://github.com/ibrahim-ansari-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="View GitHub profile and contributions"
            >
              <GitHubCalendar
                username="ibrahim-ansari-code"
                colorScheme="dark"
                showColorLegend={false}
                showMonthLabels={false}
                showTotalCount={false}
                showWeekdayLabels={false}
                blockSize={CONTRIBUTION_BLOCK_SIZE}
                blockMargin={CONTRIBUTION_BLOCK_MARGIN}
                fontSize={12}
                transformData={(data) =>
                  data.filter((day) => new Date(day.date) >= sixMonthsAgo)
                }
              />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
