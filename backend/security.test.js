'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRateLimiter } = require('./security');

test('rate limit permits configured requests, isolates addresses, and resets after the window', () => {
  let now = 1000;
  const limit = createRateLimiter({ windowMs: 60_000, max: 2, now: () => now });
  let calls = 0;
  const run = (ip) => {
    const headers = {};
    let status = 200;
    let body;
    const res = { setHeader: (key, value) => { headers[key] = value; }, status: (value) => { status = value; return res; }, json: (value) => { body = value; } };
    limit({ ip }, res, () => { calls += 1; });
    return { headers, status, body };
  };
  assert.equal(run('a').status, 200);
  assert.equal(run('a').status, 200);
  assert.equal(run('a').status, 429);
  assert.equal(run('b').status, 200);
  now += 60_001;
  assert.equal(run('a').status, 200);
  assert.equal(calls, 4);
});
