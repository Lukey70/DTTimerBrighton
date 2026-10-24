# Drive Thru Timer — reusable store layout template

**Baseline:** the finished Brighton timer, copied from `main` on 24 October 2026. This `layout-template` branch is a stable starting point for **new drive-thru locations**, not a live change to Brighton.

## What stays the same

Keep the Crystal Bay/Brighton UI theme and application behaviour unless specifically requested otherwise:

- Blue UI, scorecard, totals, history, station labels, car sprites and colour thresholds.
- Controls, keyboard shortcuts, sounds, fullscreen, car tracking and completed-car-only statistics.
- One-second automatic movement when the next position is empty; station vehicles leave only after their station release button is pressed; blocked releases remain pending.
- No overlapping active vehicles; arrivals wait if an entry slot is occupied.
- Two order lanes merge into the shared path to Cash and Present where applicable.
- **Target times:** Order 1 = 30 seconds, Order 2 = 30 seconds, Cash = 30 seconds, Present = **30 seconds**, total = **90 seconds**. The **live elapsed time** beside a window may exceed its target; do not cap the timer.
- No green entry dots (removed at the user's request).

## What changes for each layout

Start with a screenshot or drawing showing the lanes filled with cars, speaker boxes, cash/present windows, merge point, entry and exit. Count **every independently occupiable car space**; ensure all cars fit fully inside the road and the map boundaries.

1. **`index.html`:** adjust the map SVG `viewBox` and road paths, road outlines, station bay rectangles, and any layout-specific labels. Roads and merging paths should be smooth and joined.
2. **`app.js`:** update `MAP_SIZE` and **every** `POSITION_UI` coordinate/rotation for the new positions. Cars must be centered on lane centrelines and clear of labels. This file is the standalone browser build and contains the real browser simulator code.
3. **`styles.css`:** adjust the map aspect ratio, station label locations, widths and car sizing. Check fullscreen mode too. Preserve the Crystal Bay-style general UI.
4. **`simulation.mjs` and the embedded simulator in `app.js`:** change `POSITION_META`, entry positions and movement/merge logic **only if the new layout has different car spaces or routing**. These **two implementations must match**; updating only the .mjs simulator does not change browser behaviour. Maintain one-car-per-space, release gating, merge fairness and completed-only stats.
5. **`tests.mjs`:** update/add regression tests for the exact lane spacing, routing, station releases, merge priority, full queue capacity and completion. Preserve existing scoring tests.
6. **`index.html` asset references:** if the browser still serves an older script after a release, bump the query-string version on `app.js` and `styles.css` rather than asking users to live with stale cached assets.

## Existing Brighton reference

The current Brighton coordinates use `MAP_SIZE = { width: 1400, height: 478 }`:

- Top right-to-left lane: `lane2_pre1 → order2 → lane2_merge → gap_cash_entry → cash → gap_present1 → present → exit`.
- Lower right entry/diagonal: `lane1_pre1 → order1 → lane1_post → gap_cash_entry`, then shares the Cash/Present path.
- Pre-order entry spaces are **fully within the map**, separated from the order stations. The green dots are **not** part of the final layout.
- The Brighton visual design is **a reference, not a required physical layout**. New stores can be straight, curved, single-lane, dual-lane or have different spacing, provided the simulator is updated accordingly.

## Workflow for future stores

1. Keep **Brighton `main`** unchanged.
2. Create a **separate new store repository** or a dedicated store-specific branch from this template source. Do not publish a new store over Brighton.
3. Send ChatGPT a screenshot of the new layout and tell it: **"Use the Drive Thru Timer `layout-template` branch of `Lukey70/DTTimerBrighton` as the base. Keep the UI/software exactly the same; adapt the layout to this screenshot."**
4. Have ChatGPT map the lanes and slots, implement the change, run syntax checks plus `node tests.mjs` where possible, and test in a real browser if available.
5. Review the rendered map (including filled queues, station labels, entry cars and merge). Make positional refinements before treating the store as finished.

## Release checklist

- [ ] Correct number of order lanes, waiting spaces and station positions.
- [ ] Every car centered on the road; none clipped at entry or exit.
- [ ] No car overlaps another car or important text at full queue.
- [ ] Road junctions join smoothly; no unnatural diagonal kink.
- [ ] Station releases and merge priority work with blocked queues.
- [ ] Car timers and scoreboard work; Present target displays **0:30**.
- [ ] Desktop, fullscreen and narrower layouts checked.
- [ ] Existing regression tests pass; new layout-specific tests added.
- [ ] New store published separately; Brighton main unchanged.

**Note:** This is a reusable Git branch/source blueprint; it does **not** automatically enable GitHub's separate "Template repository" setting. That optional GitHub feature can be switched on in the repository's Settings if desired.
