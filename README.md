# Brighton Drive Thru Timer Website

This is the Brighton version of the drive-thru timer website, based on the uploaded Bloxburg/Crystal Bay style app.

## What changed

- The visual drive-thru map now follows the grey path shown in the screenshot.
- The top road is the Lane 2 / shared road.
- Lane 1 starts lower-right and merges diagonally into Lane 2.
- The spacing follows the requested 10-car setup:
  - Lane 1: one pre-order space, Order 1, one diagonal post-order merge space.
  - Lane 2: one pre-order space, Order 2, one forward post-order space.
  - Shared section: one before-Cash space, Cash, one space between Cash and Present, Present.
- Timer logic, controls, sounds, completed-car stats, and fullscreen mode are retained.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `simulation.mjs`
- `tests.mjs`
- `assets/`

## Keyboard shortcuts

- `1` = Add Car Lane 1
- `2` = Add Car Lane 2
- `Q` = Order 1 complete
- `W` = Order 2 complete
- `C` = Cash complete
- `P` = Present complete
- `F` = Fullscreen
