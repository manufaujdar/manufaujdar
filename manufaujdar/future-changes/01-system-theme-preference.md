# System-aware theme preference

Status: implemented and validated locally on 2026-08-29

## Decision

The website can follow the visitor's browser or operating-system color scheme
with a small, dependency-free change.

Recommended behavior:

1. If the visitor has previously chosen Light or Dark using the website toggle,
   keep that explicit choice.
2. If no website choice exists, use `prefers-color-scheme` from the browser.
3. While the site is following the system, update it when the operating-system
   appearance changes.
4. Once the visitor uses the website toggle, treat that as an explicit override
   and stop following system changes.

This preserves user intent and avoids adding a third visible setting to the
minimal header. A future “Use system setting” control can clear the saved
override if that becomes necessary, but it is not required for the initial
change.

## Current behavior

- Both dark and light design tokens already exist in `src/styles/global.css`.
- The toggle and its accessible label already exist in
  `src/components/SiteHeader.astro`.
- A manual selection is already stored as `mf-theme` in `localStorage`.
- The early script in `src/layouts/Layout.astro` applies only a saved Light
  choice. Every visitor without that value receives Dark, regardless of the
  system setting.

The color design, icons, CSS transitions, and button do not need to be rebuilt.

## Minimal implementation

The initial theme must be resolved in the inline `<head>` script so it is
applied before the page paints. This prevents a light page briefly appearing
dark, or the reverse.

Conceptually, the resolver is:

```js
const saved = localStorage.getItem('mf-theme');
const systemPrefersLight = matchMedia('(prefers-color-scheme: light)').matches;
const theme = saved === 'light' || saved === 'dark'
  ? saved
  : systemPrefersLight ? 'light' : 'dark';

document.documentElement.dataset.theme = theme;
```

The header script should use the same preference rule and add one listener:

```js
const systemTheme = matchMedia('(prefers-color-scheme: light)');

systemTheme.addEventListener('change', (event) => {
  if (!savedTheme) setTheme(event.matches ? 'light' : 'dark');
});
```

When the toggle is clicked, update the in-memory `savedTheme` value as well as
`localStorage`. That ensures later operating-system changes do not overwrite an
explicit website choice.

## Estimated scope

| Area | Expected change |
| --- | --- |
| `src/layouts/Layout.astro` | Replace the current saved-Light-only check with about 6–10 lines of preference resolution |
| `src/components/SiteHeader.astro` | About 10–15 lines for shared initial resolution, the system change listener, and the in-memory manual override |
| `src/styles/global.css` | No change required for the feature |
| Dependencies | None |
| Production code | Roughly 15–25 changed or added lines across two files |

Optional automated browser coverage would add approximately 30–50 test lines,
depending on whether a project-level browser test setup is introduced first.

## Clean implementation constraints

- Keep one `setTheme()` function as the only place that changes `data-theme`,
  the toggle label, accessibility state, and `theme-color` metadata.
- Do not duplicate the color palette in JavaScript; continue to keep colors in
  CSS variables.
- Keep the early head script synchronous and tiny to avoid a first-paint flash.
- Treat unavailable `localStorage` as “follow system,” not as an error.
- Use the existing `matchMedia` browser API; do not add a package.
- Preserve the existing manual Light/Dark toggle and keyboard behavior.

## Acceptance checks

- No saved preference + dark operating system → first paint and toggle show Dark.
- No saved preference + light operating system → first paint and toggle show Light.
- No saved preference + system changes while the page is open → theme follows it.
- Saved Light + dark operating system → website stays Light.
- Saved Dark + light operating system → website stays Dark.
- Toggle click persists across navigation and reload.
- `meta[name="theme-color"]`, `aria-pressed`, icon, and label match the visible
  theme in every case.
- No console errors when `localStorage` is unavailable.
- Reduced-motion behavior and mobile layout remain unchanged.

## Risk and effort

Risk is low. The main failure mode is a brief incorrect-color flash if initial
resolution happens after rendering. Keeping the resolver in the existing inline
head script prevents that. The change should fit comfortably in one small pull
request with no design migration and no new dependency.

## Implementation record

- `src/layouts/Layout.astro` now resolves a saved Light/Dark choice first and
  otherwise applies the browser's `prefers-color-scheme` value before paint.
- `src/components/SiteHeader.astro` follows live system changes until the theme
  toggle is used, then preserves the manual override in `localStorage`.
- No CSS or dependency changes were required.

## Validation record

- The Wix/Astro production build completed successfully.
- With the browser reporting a Dark system preference, the page rendered Dark
  with matching label, accessibility state, and `theme-color` metadata.
- A manual switch to Light persisted after reload and navigation to another
  page even while the system preference remained Dark.
- The tested pages produced no browser console warnings or errors.
- The browser test surface did not expose operating-system theme emulation, so
  the live `change` event path was source-reviewed rather than triggered by an
  automated system-setting change.
