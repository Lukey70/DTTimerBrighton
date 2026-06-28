# Brighton Drive Thru Timer Website

This version uses the uploaded Bloxburg-style timer as the base and rebuilds the Brighton visual map from the screenshot dimensions.

## Brighton layout

- The map viewBox is set to 1198 x 478 to match the uploaded screenshot.
- The grey road shape is drawn as the same top road plus lower-right diagonal merge path shown in the screenshot.
- Top row: Present, one gap, Cash, one before-Cash gap, Lane 2 forward space, Order 2, then a Lane 2 pre-order entry space near the right edge.
- Lower right: Lane 1 pre-order entry space, Order 1, then a diagonal Lane 1 post-order merge space.
- Lane 1 and Lane 2 merge into the one before-Cash space.
- Total active capacity remains 10 car spaces.
- The existing timer controls, sounds, car count, completed-car table, and fullscreen mode are retained.

## Verification

- `node --check app.js`
- `node tests.mjs`
- Generated an alignment preview image using the same 1198 x 478 screenshot coordinate system.
