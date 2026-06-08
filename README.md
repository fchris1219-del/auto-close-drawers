# SillyTavern — Lock Zoom (iOS)

A tiny SillyTavern UI extension that disables page zooming (pinch-to-zoom,
gesture zoom, and double-tap-to-zoom) on iOS — for a more app-like feel when
running SillyTavern as a home-screen PWA (standalone) on iPhone/iPad.

## Install

In SillyTavern: **Extensions → Install Extension**, then paste this repo's URL:

```
https://github.com/<your-username>/SillyTavern-LockZoom
```

On a shared/multi-user instance you can choose **Install for all users**.
After installing, make sure the extension is enabled in the Extensions panel.

## How it works

It binds native `gesturestart` / `gesturechange` / `gestureend` / `touchmove`
/ `touchend` listeners on the top-level `document` and calls `preventDefault()`
to stop zoom gestures. It does **not** call any SillyTavern internal API, so it
should keep working across ST updates.

## Troubleshooting

If pinch still zooms after enabling, open the browser console and look for:

```
[Lock Zoom] loaded — zoom gestures intercepted on top document
```

- **Line present** → the script loaded fine; the limitation is on the iOS side
  (some iOS versions ignore JS zoom prevention even in standalone mode).
- **Line missing** → the extension isn't loaded/enabled; recheck install.

## License

MIT (or pick your own — add a `LICENSE` file if you plan to make it public).
