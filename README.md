# Mission Control 4.0

A personal daily planner that makes room for meaningful work, income, faith, health and learning. Runs as a buildless, installable, offline-capable web app on GitHub Pages.

**Live app:** https://navaryan.github.io/FirstProject/

## The product approach

- **Missions are outcomes.** Choose up to three priorities; the rest stay in a separate queue.
- **Time blocks reserve the day.** Assign a mission to a block rather than counting its time twice. Blocks never inflate mission completion.
- **Habits are daily foundations.** Editable counters for prayer, Quran, exercise, meals, Spanish, reading and water, each with an independent daily record.
- **A short loop:** plan, focus on one action, record what happened, review and choose tomorrow's priorities.
- **Protect attention.** No fake AI, punitive streaks, empty-day success, automatic backlog floods, or accounts needed to get started.

## Using the app

1. Open **Plan → Paste plan**. Paste a checklist and/or time ranges, or load the included Tuesday example.
2. Review the extracted items, edit titles, choose which ones to include, and check suggested links between missions and blocks.
3. In **Today**, star up to three missions and log habits with the plus button. Undo accidental habit entries with minus.
4. Start focus from a mission. The timer uses a persisted end time, so returning after locking the phone or reloading shows the correct remaining time.
5. **Review day** saves a reflection and can create up to three priorities for tomorrow.
6. **More** contains paths, preferences, notes, money entries, backups and recovery.

Import supports Markdown checkboxes, numbered/bulleted lists, ISO or English date headings, 24-hour and am/pm time ranges, and overnight ranges. Checked items default to unchecked. Re-importing the same title/time/date skips duplicates. Preview the result: parsing is deterministic, runs on-device and can require edits.

Prayer counts do not calculate prayer times; follow a local timetable. Earnings are income minus logged expenses, before tax and unlogged costs. Notifications or sound while the app is closed are not guaranteed.

## Existing data and privacy

The original IndexedDB database (`mission-control-db`, store `kv`, key `state`) and application URL are retained. Schema 5 preserves previous tasks, completion flags, paths, transactions, notes, history and XP. A pre-upgrade copy is kept as `pre-v4-upgrade`. Backups created before this version can be restored. Current data is copied to `before-restore` before a backup replaces it.

**The app does not upload private entries to GitHub.** Storage belongs to the current browser/device; it is not cross-device sync. Clearing browser/site data can erase entries. Export a backup before switching phones or clearing Safari data. Encrypted backups use PBKDF2-SHA256 (210,000 iterations) and AES-256-GCM. Keep the passphrase: it cannot be recovered.

Fresh installations begin with an empty day, not the original hardcoded August 2026 sample. Future planning never silently becomes today's backlog. Recurring missions materialize once per eligible day; changes apply to the edited occurrence and days created afterward. Unfinished one-off missions move forward only when explicitly selected.

## Development and verification

No runtime dependencies or build step. Use Node 22+:

```sh
npm test
npm run check
```

Tests cover parser boundaries, empty-day progress, calendar arithmetic, overlapping time, block assignment, money calculations, migration, fresh habit counts, recurrence, priority limits, duplicate imports, manual rollover, review, queued mutations and storage-error rollback. State tests use Node's VM modules with an in-memory persistence adapter; they do not replace browser verification of IndexedDB.

For the managed preview environment, run `node scripts/prepare-preview.mjs` then use the preview supervisor. Only root application files are published by the GitHub Pages workflow. Preview configuration, generated output and test data are excluded.

## Deployment and updates

The existing GitHub Pages deployment from `master` continues publishing the application. Every JavaScript module, styles and the offline cache share a release version. Precache requests bypass the HTTP cache to avoid mixing old and new code. The service worker precaches the app shell, waits before replacing an existing release, and offers **Save & update**. Pause a running timer and close forms before applying it. Cache cleanup is restricted to Mission Control caches.

On iPhone, keep the existing Home Screen app. Open it online; use **Save & update** if shown. If the old shell remains, close Mission Control and its Safari tabs, then reopen. Do not clear website data to force an update.

## Release 4.0.2

A redesigned responsive interface; whole-plan import and review; core-three outcomes; linked time blocks; configurable daily habits; date navigation and deliberate rollover; review-to-tomorrow workflow; persistent focus timer; actual net earnings; seven-day insights; ordinary and encrypted backups; previous-version recovery; safer app updates, and cross-tab write protection.
