export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-white relative">
      <div className="absolute top-8 right-8 flex gap-6" style={{ fontFamily: 'Gowun Batang, serif', fontSize: '1rem' }}>
        <a href="https://x.com/ibrahimansr" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'blue' }}>
          X
        </a>
        <a href="https://github.com/ibrahimansr" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'blue' }}>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ibrahimansr/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'blue' }}>
          LinkedIn
        </a>
      </div>

      <div className="max-w-2xl px-8 text-center" style={{ fontFamily: 'Gowun Batang, serif', color: 'black' }}>
        <h1 className="mb-8" style={{ fontSize: '2rem' }}>Ibrahim Ansari</h1>

        <p className="mb-4" style={{ fontSize: '1.125rem', lineHeight: '1.75' }}>
          I want to become deeply technical, so if you are doing anything research heavy, hmu! I've published 2 ml papers, fine tuned models and set up rl environments at startups, and am working with my best friends to build some cool stuff this summer in toronto and sf.
        </p>

        <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }}>
          I am joining something new full-time in palo alto soon, but am also actively seeking roles right now
        </p>
      </div>
    </div>
  );
}