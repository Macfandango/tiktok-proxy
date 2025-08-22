export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400).json({ error: "Missing url parameter" });
      return;
    }

    const target = decodeURIComponent(url);

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    const text = await response.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(response.status).send(text);

  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
