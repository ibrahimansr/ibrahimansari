import { Analytics } from '@vercel/analytics/react';
import { Route, Routes } from 'react-router';
import { MusicPlayer } from '../components/music-player';
import { HomePage } from './HomePage';
import { OtherPage } from './OtherPage';

export default function App() {
  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
