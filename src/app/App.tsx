import React from 'react';

export default function App() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    const email = 'ibrahim.ansari4161@gmail.com';
    
    // Fallback method for copying text
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
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div className="px-8 py-20 md:px-16 md:py-32 max-w-3xl mx-auto">
        
        {/* Header with socials */}
        <header className="flex justify-between items-start mb-40">
          <div className="w-8 h-8" style={{ backgroundColor: '#3EBCB3' }} />
          <nav className="flex gap-6 text-sm">
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

        {/* Main content - all text */}
        <main className="space-y-16 text-base leading-relaxed" style={{ fontWeight: 300 }}>
          <p>
            i've done 5 technical roles, currently founding eng @ <a href="https://brikli.com/" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">brikli</a> (antler s26). 
            studying management engineering @ uwaterloo
          </p>
          <p>
            recently hosted <a href="https://ummahhacks.com/" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">ummah hacks</a> (backed by shopify, yc founders, etc.) 
            and made <a href="https://github.com/ibrahim-ansari-code/baconhead" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">baconhead</a>. Learning to post train
            models and change automations.
          </p>

          <p>
            previously published <a href="https://drive.google.com/file/d/13_mV8QIK9et7CNBK_AAbZibdZFb1-7HL/edit" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">paper on monarch butterflies</a> and <a href="https://drive.google.com/file/d/1zw4GxDShfs00zw66bCBYd9MF82Cvmyh_/view" target="_blank" rel="noopener noreferrer" className="border-b border-white hover:opacity-70 transition-opacity">budgeting education</a>
          </p>

          <div className="flex items-center gap-3 pt-16">
            <p>ibrahim.ansari4161@gmail.com</p>
            <button 
              onClick={copyEmail}
              className="px-3 py-1 border border-white/30 hover:border-white/60 transition-colors text-sm"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}