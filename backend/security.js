'use strict';

function createRateLimiter({ windowMs, max, now = Date.now }) {
  const hits = new Map();
  return function rateLimit(req, res, next) {
    const key = req.ip || req.socket?.remoteAddress || 'unknown';
    const current = now();
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= current) {
      entry = { count: 0, resetAt: current + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(Math.max(0, max - entry.count)));
    if (entry.count > max) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((entry.resetAt - current) / 1000))));
      return res.status(429).json({ error: 'Muitas tentativas. Aguarde antes de tentar novamente.' });
    }
    if (hits.size > 10000) for (const [address, record] of hits) if (record.resetAt <= current) hits.delete(address);
    next();
  };
}

module.exports = { createRateLimiter };
