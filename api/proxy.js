// /api/proxy.js — серверлес-функция (формат CommonJS)
const fetchPoly = (...args) =>
  (global.fetch ? global.fetch(...args) : import('node-fetch').then(({ default: f }) => f(...args)));

module.exports = async (req, res) => {
  try {
    const q = req.query || {};
    const raw = q.url || q.u;                 // поддержим ?url= или ?u=
    if (!raw) {
      res.status(400).json({ error: "Missing ?url=" });
      return;
    }
    const target = decodeURIComponent(raw);

    const r = await fetchPoly(target, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache"
      }
    });

    const text = await r.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
