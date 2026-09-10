export default async function handler(req, res) {
  const url = (req.query && req.query.url) || '';
  if (!/^https:\/\/open\.spotify\.com\//.test(url)) {
    res.status(400).json({ error: 'invalid url' });
    return;
  }
  try {
    let title = null;
    let cover = null;
    let preview = null;

    // 1. Try to fetch directly from Spotify's embed page which provides authentic Spotify MP3 previews and metadata
    try {
      const embedUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/').split('?')[0];
      const embedRes = await fetch(embedUrl);
      if (embedRes.ok) {
        const html = await embedRes.text();
        const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
        if (match) {
          const data = JSON.parse(match[1]);
          const entity = data?.props?.pageProps?.state?.data?.entity;
          if (entity) {
            title = entity.name || entity.title || null;
            cover = entity.visualIdentity?.image?.[0]?.url || null;
            preview = entity.audioPreview?.url || (entity.trackList && entity.trackList[0]?.audioPreview?.url) || null;
          }
        }
      }
    } catch (e) {}

    // 2. Fallback to Spotify oEmbed if title or cover is missing
    if (!title || !cover) {
      try {
        const oembedRes = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(url));
        if (oembedRes.ok) {
          const oembed = await oembedRes.json();
          title = title || oembed.title || null;
          cover = cover || oembed.thumbnail_url || null;
        }
      } catch (e) {}
    }

    // 3. Fallback to iTunes search only if Spotify embed had no preview
    if (!preview && title) {
      try {
        const itunesRes = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(title) + '&media=music&entity=song&limit=5');
        if (itunesRes.ok) {
          const itunes = await itunesRes.json();
          if (itunes.results && itunes.results.length > 0) {
            const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
            const matched = itunes.results.find(r => {
              const cleanTrack = (r.trackName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return cleanTitle.includes(cleanTrack) || cleanTrack.includes(cleanTitle);
            });
            preview = (matched || itunes.results[0]).previewUrl || null;
          }
        }
      } catch (e) {}
    }

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.status(200).json({
      title: title,
      cover: cover,
      preview: preview
    });
  } catch (e) {
    res.status(502).json({ error: 'upstream failed' });
  }
}
