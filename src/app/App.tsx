import { Analytics } from '@vercel/analytics/react';
import { Route, Routes } from 'react-router';
import { MusicPlayer } from '../components/music-player';
import { HomePage } from './HomePage';
import { ProjectPage } from './ProjectPage';

export default function App() {
  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/p/:slug" element={<ProjectPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
