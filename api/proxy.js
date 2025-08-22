// /api/proxy.js
const fetchPoly = (...args) =>
  (global.fetch ? global.fetch(...args) : import('node-fetch').then(({ default: f }) => f(...args)));

module.exports = async (req, res) => {
  try {
    const q = req.query || {};
    const raw = q.url || q.u;
    if (!raw) {
      res.status(400).json({ error: "Missing ?url=" });
      return;
    }
    const target = decodeURIComponent(raw);

    // 👉 сюда вставь свои куки из браузера (раздел "Application → Cookies")
    const cookies = [
      "msToken=QKnzARceRG_kWxL8tTnL3w8LvuOWSy4qvA_nuAl8uiLNyg2ficUZ5aeaUBYyG2cmbKCuwZ0SpAi0NtIcIsvvnP5hnZ9vVus0T-_eRSFFrE6SF2jrJSJxpscN2MTX9rRFMK2nMhpLe5QTeaKzmM_BkoXXyg==",
      "msToken=yEe96QqkxqdRlWuiJkUVnNQCXVcDxsjucLIsomnjX31pg5WYqn3ZWUHrTPA-G-0bPSBFFLgunWwr6e8M4C5ZxbAsCpPEQws9-ceSeeYj2czMgplXOKPXlZq6wueAfarrr5ZUds6gkEHRXi6-9uLBr3sEZw=="
    ].join("; ");

    const r = await fetchPoly(target, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.tiktok.com/",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Accept-Encoding": "identity",
        "Cookie": cookies,

        // browser-like заголовки
        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not:A-Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
      }
    });

    const text = await r.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
