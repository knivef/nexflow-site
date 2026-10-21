import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const urls = process.argv.slice(2);
const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});

for (const url of urls) {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
    formFactor: 'desktop',
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
  });

  const cats = result.lhr.categories;
  const pct = (key) => Math.round((cats[key]?.score ?? 0) * 100);

  const failed = [];
  for (const key of ['accessibility', 'best-practices', 'seo', 'performance']) {
    for (const ref of cats[key]?.auditRefs ?? []) {
      const audit = result.lhr.audits[ref.id];
      if (audit && audit.score !== null && audit.score < 1 && ref.weight > 0) {
        failed.push(`${key}/${ref.id}`);
      }
    }
  }

  console.log(
    JSON.stringify({
      url,
      performance: pct('performance'),
      accessibility: pct('accessibility'),
      bestPractices: pct('best-practices'),
      seo: pct('seo'),
      failed,
    }),
  );
}

await chrome.kill();
