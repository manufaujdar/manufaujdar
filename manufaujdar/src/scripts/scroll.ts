import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
let lenis: Lenis | undefined;
try { document.documentElement.dataset.scrollPreference = localStorage.getItem('mf-scroll') === 'smooth' ? 'smooth' : 'native'; } catch {}

function updateScroll() {
  lenis?.destroy();
  lenis = undefined;
  if (document.body.dataset.smoothScroll !== 'eligible' || document.documentElement.dataset.scrollPreference !== 'smooth' || motion.matches || !desktop.matches) return;
  lenis = new Lenis({
    autoRaf: true,
    respectReducedMotion: true,
    syncTouch: false,
    stopInertiaOnNavigate: true,
    prevent: (node) => Boolean(node.closest('dialog, textarea, select, [data-lenis-prevent]')),
  });
}
updateScroll();
window.addEventListener('mf-scroll-preference', updateScroll);
motion.addEventListener('change', updateScroll);
desktop.addEventListener('change', updateScroll);
window.addEventListener('pagehide', () => { lenis?.destroy(); lenis = undefined; });
window.addEventListener('pageshow', (event) => { if (event.persisted) updateScroll(); });
