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

    const cookies = "_ttp=30DPz8mhYfXOdoLclyZ3cg076RW; delay_guest_mode_vid=5; s_v_web_id=verify_memic1y1_hznQBUjo_uuxL_4l2R_AJ7P_m2s6TqAUYM1a; passport_csrf_token=fe2c8ab782e3a5bb1e9b0f63f1202a8f; passport_csrf_token_default=fe2c8ab782e3a5bb1e9b0f63f1202a8f; last_login_method=google; tiktok_webapp_theme_source=auto; tiktok_webapp_theme=dark; passport_fe_beating_status=true; msToken=nOyyvR87zK5owrnd1qkq7UTImdQSJMwQQ73BJBmjODBOEWR95p_9GGKJg4xYVZYRgBz1yMXJOT6C9Q7caEi762v665g6tAN_1y7muDmYAwVz3OC0yk54Vv_hF7jnoqf2N2hpJo2xhCNGwo7Ex9-pxbCE; msToken=TG0B7LfC4GwaZKB7yhf809vVB87zONnmsSt2boLT078R6eoGhZHkYEyVvVtzqhcxyVUIB8HLzhJ3yfJw_3gVwxMj6kwGT0bgo3fdojjLsZMh0rH39YqGo0BVDs-x1YjSF6g_hRoeUb7eqtejpcU1GH1B";

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

        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not:A-Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1"
      }
    });

    const text = await r.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

