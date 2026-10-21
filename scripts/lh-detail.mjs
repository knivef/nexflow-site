import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
const [url, ...ids] = process.argv.slice(2);
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new','--no-sandbox','--disable-gpu'] });
const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', formFactor: 'desktop',
  screenEmulation: { mobile:false, width:1350, height:940, deviceScaleFactor:1, disabled:false },
  throttling: { rttMs:40, throughputKbps:10240, cpuSlowdownMultiplier:1 } });
for (const id of ids) {
  const a = r.lhr.audits[id];
  if (!a) { console.log(id, 'not found'); continue; }
  console.log(`\n--- ${id}: score=${a.score} ---`);
  console.log(a.title);
  const items = a.details?.items ?? [];
  for (const it of items.slice(0, 8)) console.log('   ', JSON.stringify(it).slice(0, 300));
}
await chrome.kill();
