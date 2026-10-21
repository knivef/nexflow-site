#!/usr/bin/env node
/**
 * Contrast check against the token values, in both themes.
 * Pairs are the ones the site actually renders: body text on each surface, muted text,
 * links, button fills, control borders and the error state.
 */
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (hex) => { const h = hex.replace('#',''); const [r,g,b]=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b); };
const ratio = (a,b) => { const x=L(a), y=L(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); };

const light = {
  page:'#f6f3f1', raised:'#f6f3f1', accent:'#cfdaf5', inverted:'#242424', bar:'#000000',
  text:'#242424', secondary:'#4e4d4d', muted:'#706e6d', onInverted:'#f6f3f1',
  link:'#2b59d1', accentFill:'#2b59d1', onAccentFill:'#ffffff', control:'#8a8684',
  onAccentSurface:'#4e4d4d', error:'#b3261e',
};
const dark = {
  page:'#1a1918', raised:'#242221', accent:'#242221', inverted:'#0e0d0d', bar:'#0e0d0d',
  text:'#f2efec', secondary:'#c0bcb8', muted:'#a39f9b', onInverted:'#f2efec',
  link:'#8fa8f5', accentFill:'#3f6ae0', onAccentFill:'#ffffff', control:'#7a7572',
  onAccentSurface:'#c0bcb8', error:'#ff8a80',
};

const pairs = (t) => ([
  ['body text on page', t.text, t.page, 4.5],
  ['secondary text on page', t.secondary, t.page, 4.5],
  ['muted text on page', t.muted, t.page, 4.5],
  ['link text on page', t.link, t.page, 4.5],
  ['body text on raised card', t.text, t.raised, 4.5],
  ['muted text on raised card', t.muted, t.raised, 4.5],
  ['text on accent surface', t.onAccentSurface, t.accent, 4.5],
  ['text on inverted surface', t.onInverted, t.inverted, 4.5],
  ['text on bar', t.onInverted, t.bar, 4.5],
  ['label on accent fill', t.onAccentFill, t.accentFill, 4.5],
  ['error text on page', t.error, t.page, 4.5],
  ['error text on raised card', t.error, t.raised, 4.5],
  ['control border on page (non-text)', t.control, t.page, 3.0],
  ['accent fill vs page (non-text)', t.accentFill, t.page, 3.0],
  ['focus ring vs page (non-text)', t.link, t.page, 3.0],
]);

let failures = 0;
for (const [name, tokens] of [['LIGHT', light], ['DARK', dark]]) {
  console.log(`\n${name}`);
  for (const [label, fg, bg, need] of pairs(tokens)) {
    const r = ratio(fg, bg);
    const ok = r >= need;
    if (!ok) failures++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(6)} (need ${need})  ${label}`);
  }
}
console.log(`\nfailures: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
