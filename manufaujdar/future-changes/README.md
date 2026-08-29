# Future changes

This folder is the planning handoff from the August 2026 website architecture,
security, and product review. New proposals should be documented here before
they are implemented in the production source.

The folder contains plans and decisions only. Production code remains under
`src/`, configuration remains at the repository root, and completed changes
should still be verified in the rendered website.

## Working principles

- Prefer a static portfolio architecture unless a feature genuinely requires a
  server runtime.
- Disable or remove framework capabilities that are not used by the product.
- Keep interaction code small, dependency-free, accessible, and easy to test.
- Preserve the existing restrained visual language.
- Record the intended behavior, fallback, test path, and completion status for
  each proposed change.

## Roadmap carried forward from the review

| Priority | Change | Why it matters | Status |
| --- | --- | --- | --- |
| P0 | Simplify the Wix/Astro server deployment or disable unused Wix routes | Removes the largest security and operational surface | Proposed |
| P0 | Resolve the generated auth redirect and image-proxy findings | Addresses the two medium-severity security findings | Proposed |
| P1 | Add Git history and CI checks for build, links, accessibility, headers, and security | Makes releases recoverable and repeatable | Proposed |
| P1 | Add CSP, framing, referrer, and permissions policies | Improves browser-side containment | Proposed |
| P1 | Review and rotate credential-bearing Wix diagnostic data when applicable | Reduces local credential exposure risk | Proposed |
| P2 | Follow the visitor's system light/dark preference by default | Removes the current dark-only first-visit behavior | Implemented and validated locally |
| P2 | Improve faint-text contrast in both themes | Fixes the identified readability and WCAG risk | Proposed |
| P2 | Turn selected work into evidence-backed case studies | Improves credibility and decision usefulness | Proposed |
| P2 | Move primary contact actions into the first viewport | Improves the conversion path | Proposed |
| P2 | Replace or supplement the `mailto:` feedback flow | Makes responses reliable across browser setups | Proposed |

## Proposal index

- [System-aware theme preference](./01-system-theme-preference.md)

## Change workflow

1. Add or update a proposal in this folder.
2. Confirm the desired product behavior and priority.
3. Implement the smallest production diff in the relevant source files.
4. Run the build and verify desktop, mobile, keyboard, and browser-console health.
5. Update the proposal with the completion date, affected files, and validation
   evidence.
