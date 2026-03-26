import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './app/App.tsx';
import { MusicProvider } from './contexts/MusicContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MusicProvider>
      <App />
    </MusicProvider>
  </BrowserRouter>,
);
  