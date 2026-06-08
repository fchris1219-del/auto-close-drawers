# SillyTavern — Lock Zoom (iOS)

[English](#english) | [中文](#中文)

---

## English

A tiny SillyTavern UI extension that disables page zooming (pinch-to-zoom,
gesture zoom, and double-tap-to-zoom) on iOS — for a more app-like feel when
running SillyTavern as a home-screen PWA (standalone) on iPhone/iPad.

### Install

In SillyTavern: **Extensions → Install Extension**, then paste this repo's URL:

```
https://github.com/<your-username>/SillyTavern-LockZoom
```

On a shared / multi-user instance you can choose **Install for all users**.
After installing, make sure the extension is enabled in the Extensions panel.

### How it works

It binds native `gesturestart` / `gesturechange` / `gestureend` / `touchmove`
/ `touchend` listeners on the top-level `document` and calls `preventDefault()`
to stop zoom gestures. It does **not** call any SillyTavern internal API, so it
should keep working across ST updates.

### Troubleshooting

If pinch still zooms after enabling, open the browser console and look for:

```
[Lock Zoom] loaded — zoom gestures intercepted on top document
```

- **Line present** → the script loaded fine; the limitation is on the iOS side
  (some iOS versions ignore JS zoom prevention even in standalone mode).
- **Line missing** → the extension isn't loaded / enabled; recheck the install.

### License

MIT (or pick your own — add a `LICENSE` file if you plan to make it public).

---

## 中文

一个很小的 SillyTavern 界面扩展，用来在 iOS 上禁掉页面缩放（双指 pinch、
手势缩放、双击放大）。把 SillyTavern 作为主屏幕 PWA（standalone 模式）在
iPhone / iPad 上使用时，体验会更接近原生 app。

### 安装

在 SillyTavern 里：**扩展 → 安装扩展（Install Extension）**，粘贴本仓库地址：

```
https://github.com/fchris1219-del/SillyTavern-Lock-Zoom
```

共享 / 多用户实例可以选 **为所有用户安装（Install for all users）**。
装好后，记得在扩展面板里确认它处于启用状态。

### 工作原理

它在顶层 `document` 上绑定原生的 `gesturestart` / `gesturechange` /
`gestureend` / `touchmove` / `touchend` 监听器，调用 `preventDefault()` 拦掉
缩放手势。它**不调用任何 SillyTavern 内部接口**，所以基本不会因为酒馆升级
而失效。

### 排查

如果启用后双指仍然能缩放，打开浏览器 console，看有没有这一行：

```
[Lock Zoom] loaded — zoom gestures intercepted on top document
```

- **有这行** → 脚本已正常加载，限制在 iOS 那边（某些 iOS 版本即使在
  standalone 模式下也会无视 JS 的禁缩放）。
- **没这行** → 扩展没加载 / 没启用，回去检查安装。

### 许可

MIT（或你自己选 —— 打算公开的话加一个 `LICENSE` 文件）。
