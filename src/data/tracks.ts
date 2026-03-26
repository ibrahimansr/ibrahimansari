export type Track = {
  title: string;
  artist: string;
  src: string;
  cover: string;
  /** Optional Spotify link (legacy “other” page) */
  spotifyUrl?: string;
};

export const TRACKS: Track[] = [
  {
    title: '2Tone',
    artist: 'Don Toliver',
    src: '/2TONE feat. Don Toliver.mp3',
    cover: '/covers/2tone-don-toliver.jpg',
    spotifyUrl: 'https://open.spotify.com/track/5SaKYcCTEdCkacDamzfRfX?si=8c5cef0586da43f1',
  },
  {
    title: '8PM',
    artist: 'Nemzzz',
    src: '/NEMZZZ 8PM Official Video.mp3',
    cover: '/Rents Due Nemzz.jpeg',
    spotifyUrl: 'https://open.spotify.com/track/7H5CsjEafNygkvcm69RevN?si=2a55ad0752784678',
  },
  {
    title: 'As We Speak',
    artist: 'Drake',
    src: '/As We Speak feat. Drake Official Audio.mp3',
    cover: '/covers/as-we-speak-drake.jpg',
  },
  {
    title: 'Cold',
    artist: 'Chris Stapleton',
    src: '/Cold Official Video.mp3',
    cover: '/covers/cold.jpg',
  },
  {
    title: 'Everybody Loves Somebody',
    artist: 'Dean Martin',
    src: '/Dean Martin Everybody Loves Somebody.mp3',
    cover: '/covers/everybody-loves-somebody.jpg',
  },
  {
    title: 'Fly Me to the Moon',
    artist: 'Frank Sinatra',
    src: '/Fly Me To The Moon - Frank Sinatra.mp3',
    cover: '/Fly Me to the Moon Frank Sinatra.jpeg',
    spotifyUrl: 'https://open.spotify.com/track/5b7OgznPJJr1vHNYGyvxau?si=a1c8f067770e4967',
  },
  {
    title: 'Got That Feeling',
    artist: 'Foster The People',
    src: '/got-that-feeling.mp3',
    cover: '/covers/got-that-feeling.jpg',
  },
  {
    title: 'Humsafar OST',
    artist: 'Qurat-ul-Ain Balouch',
    src: '/Humsafar OST by Qurat-ul-Ain Balouch.mp3',
    cover: '/covers/humsafar-ost.jpg',
  },
  {
    title: 'Jimmy Cooks',
    artist: 'Drake ft. 21 Savage',
    src: '/Drake Jimmy Cooks ft 21 Savage.mp3',
    cover: '/covers/jimmy-cooks.jpg',
  },
  {
    title: 'Sajna Da Dil Torya',
    artist: 'Zeeshan Ali',
    src: '/SAJNA DA DIL TORYA _ VIDEO SONG - 4K _ KABHI MAIN KABHI TUM _ MUSTAFA x SHARJEENA.mp3',
    cover: '/covers/sajna-da-dil-torya.jpg',
  },
];
