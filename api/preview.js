export default async function handler(req, res) {
  const url = (req.query && req.query.url) || '';
  if (!/^https:\/\/open\.spotify\.com\//.test(url)) {
    res.status(400).json({ error: 'invalid url' });
    return;
  }
  try {
    const oembedRes = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(url));
    if (!oembedRes.ok) throw new Error('oembed ' + oembedRes.status);
    const oembed = await oembedRes.json();
    let preview = null;
    if (oembed.title) {
      const itunesRes = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(oembed.title) + '&media=music&entity=song&limit=1');
      if (itunesRes.ok) {
        const itunes = await itunesRes.json();
        preview = (itunes.results && itunes.results[0] && itunes.results[0].previewUrl) || null;
      }
    }
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.status(200).json({
      title: oembed.title || null,
      cover: oembed.thumbnail_url || null,
      preview: preview
    });
  } catch (e) {
    res.status(502).json({ error: 'upstream failed' });
  }
}
