# Engineering checks

Existing native test, lint, build and domain-governance checks remain authoritative.
Main pushes additionally check workflows, outgoing secrets, changed engineering
Markdown/offline file links, and affected synthetic browser behavior.

## Before pushing

Use Betterleaks 1.8.1, actionlint 1.7.12, zizmor 1.30.1 and markdownlint-cli
0.49.1 on PATH, Node >=24.3 for docs tools and Python >=3.10 alongside the declared runtime.
Preserve native hooks/core.hooksPath; no hook replacement is installed here.

```sh
npm ci --prefix tools/docs-tools --ignore-scripts
npm ci --prefix tools/browser
tools/browser/node_modules/.bin/playwright install chromium
python3 tools/prepush.py --base origin/main
```

Fetch current main first. `--base` resolves to an immutable ancestor commit.
For pre-commit checks use `--working`, which explicitly skips commit-range secrets.
Complete staged-secret/native commit gates, then rerun on a clean tree without
`--working` and push the exact checked HEAD normally to main. Dirty trees and
HEAD changes fail; initial pushes explicitly scan all reachable history.
Post-push checks cannot prevent an already-landed commit. No auto-fix/push or deploy
loop is enabled. Fetch/recheck if concurrent main changes make the push fail.

## Tool provenance and limits

- [Betterleaks](https://github.com/betterleaks/betterleaks), MIT: redacted detection
  only, no live validation or revocation. All newly reachable ancestors are scanned.
- [actionlint](https://github.com/rhysd/actionlint) and
  [zizmor](https://github.com/zizmorcore/zizmor), MIT: workflow syntax/types and
  offline permission/injection/supply-chain checks. Linux binary downloads use
  pinned upstream release-asset SHA-256s in `tools/install_ci_tools.py`.
- [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli), MIT:
  scoped syntax/whitespace rules on changed root engineering docs and `docs/`
  Markdown. The repo-owned locked tool profile includes advisory patches.
  [lychee](https://github.com/lycheeverse/lychee), MIT/Apache-2.0, 0.24.2 checks
  offline links. Relative files within the repo are checked offline. Remote URLs,
  external workspace references and research/vendor/clinical corpora are not
  visited or reformatted; existing semantic validators retain authority.
- [Playwright](https://github.com/microsoft/playwright), Apache-2.0, 1.63.0:
  local synthetic browser regressions. API fixtures are intercepted; compiled
  Worker checks stay local. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select a
  trusted existing Chrome; otherwise install Chromium. Screen readers and
  physical devices remain unverified.
- Production npm audit checks locked production dependencies at the existing high
  severity threshold; metadata goes to npm's advisory service. No forced fixes
  or threshold reductions are used.

A green commit certifies these checks only; existing consent, clinical, model,
privacy and governed release boundaries still apply. Rollback removes added
checks/jobs without changing native checks or product contracts.

## Optional CodeRabbit scope preparation

`python3 tools/coderabbit_review.py --base <previous-main-SHA>` verifies the exact
committed main scope without a model call. The manual scope workflow does the
same. CLI 0.9.0 is installed locally but account status is `not_authenticated`.
Actual hosted review requires separate explicit `--execute`, authenticated
assigned-seat access and its allowance policy; it is advisory and does not fix
or push. No automatic cloud review is enabled and no credential is committed.

## Website boundary

The persisted browser test bundles the actual header controller, global styles and pinned Lenis module, substituting only Astro navigation map output with synthetic links. It checks mobile/desktop, persistence denial, reduced motion and dialog focus. Hosted CI runs this isolated fixture; it does not certify full Wix production packaging, account metadata or release deployment.

## Existing application dependency audit

The 11 October production lock audit reports one critical, six high, one moderate and three low advisories, including unpatched Astro 5.18.2; current patched Astro requires a major migration. The isolated tooling audit is clean and does not certify the Wix application dependencies. Preserve the existing runtime until an Astro/Wix migration can be verified with production metadata and full build. Inspect with `npm audit --prefix manufaujdar --omit=dev`; no vulnerability exclusions or forced major fixes were applied.
