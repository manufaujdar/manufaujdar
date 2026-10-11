import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const root = fileURLToPath(new URL('../../', import.meta.url));
const source = await readFile(`${root}manufaujdar/src/components/SiteHeader.astro`, 'utf8');
const inline = source.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
assert.ok(inline, 'Actual header inline controller must be present');
let header = source.replace(/^---[\s\S]*?---\s*/, '').replace(/<script is:inline>[\s\S]*?<\/script>/, '');
const mappings = header.match(/\{navLinks\.map\([^\n]+\)\}/g);
assert.equal(mappings?.length, 2, 'Fixture only substitutes the two Astro navigation maps');
header = header.replace(/\{navLinks\.map\([^\n]+\)\}/g, '<a href="/">Home</a><a href="/my-research">Work</a>')
  .replace('href={links.github}', 'href="https://github.com/manufaujdar"');
assert.equal(JSON.parse(await readFile(`${root}manufaujdar/package.json`)).dependencies.lenis, '1.3.26', 'Fixture Lenis must match app pin');
const bundle = await build({entryPoints: [`${root}manufaujdar/src/scripts/scroll.ts`], bundle: true, write: false,
  nodePaths: [fileURLToPath(new URL('node_modules', import.meta.url))], outdir: '/fixture', tsconfigRaw: {}, format: 'iife', platform: 'browser'});
const javascript = bundle.outputFiles.find(file => file.path.endsWith('.js'))?.text;
const lenisCss = bundle.outputFiles.find(file => file.path.endsWith('.css'))?.text;
assert.ok(javascript && lenisCss, 'Actual scrolling module must bundle');
const css = await readFile(`${root}manufaujdar/src/styles/global.css`, 'utf8');
const html = `<!doctype html><html lang="en"><head><title>Synthetic website settings</title><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#070707"><style>${css}\n${lenisCss}</style></head><body data-smooth-scroll="eligible">${header}<main><h1>Synthetic settings regression</h1><p>No personal content or provider endpoints.</p></main><script>${inline}</script><script>${javascript}</script></body></html>`;
const server = createServer((request, response) => { response.setHeader('Content-Type', 'text/html; charset=utf-8'); response.end(html); });
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH} : {})});
  for (const scenario of [{width:1280, reduce:false, denied:false}, {width:390, reduce:true, denied:true}]) {
    const context = await browser.newContext({viewport:{width:scenario.width, height:780}, reducedMotion:scenario.reduce?'reduce':'no-preference', serviceWorkers:'block'});
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    if (scenario.denied) await context.addInitScript(() => { Storage.prototype.getItem = () => { throw Error('Synthetic read denial'); }; Storage.prototype.setItem = () => { throw Error('Synthetic write denial'); }; });
    const page = await context.newPage(); const errors=[]; page.on('pageerror', error=>errors.push(error.message));
    await page.goto(base);
    const opener = page.getByRole('button', {name:'Open quick navigation'});
    await opener.click();
    await page.locator('[data-theme-preference]').selectOption('dark');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.locator('select[data-scroll-preference]').selectOption('smooth');
    await page.waitForTimeout(100);
    assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('lenis')), !scenario.reduce);
    if (scenario.denied) await page.getByRole('status').filter({hasText:'page only'}).waitFor();
    else {
      assert.equal(await page.evaluate(()=>localStorage.getItem('mf-theme')), 'dark');
      assert.equal(await page.evaluate(()=>localStorage.getItem('mf-scroll')), 'smooth');
    }
    const violations=(await new AxeBuilder({page}).include('[data-command-palette]').analyze()).violations;
    if (violations.length) console.error(JSON.stringify(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
    assert.deepEqual(violations.map(v=>({id:v.id,impact:v.impact})), [], 'Visible preferences pass scoped axe');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelector('[data-command-open]').getAttribute('aria-expanded') === 'false' && document.activeElement === document.querySelector('[data-command-open]'));
    assert.equal(await opener.getAttribute('aria-expanded'), 'false');
    assert.equal(await opener.evaluate(el=>el===document.activeElement),true);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    if (!scenario.denied) {
      await page.reload(); await opener.click();
      assert.equal(await page.locator('[data-theme-preference]').inputValue(),'dark');
      assert.equal(await page.locator('select[data-scroll-preference]').inputValue(),'smooth');
      await page.emulateMedia({reducedMotion:'reduce'}); await page.waitForTimeout(100);
      assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('lenis')),false);
    }
    assert.deepEqual(errors,[]); await context.close();
  }
  console.log('Actual header/Lenis: desktop/mobile, persistence/denial, live reduced motion, focus and scoped axe passed.');
} finally { await browser?.close(); await new Promise(resolve=>server.close(resolve)); }
