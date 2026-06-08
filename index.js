// Lock Zoom (iOS) — 禁止 SillyTavern 页面缩放
// 原生扩展在主页面全局运行，直接绑顶层 document，无需 window.top
(function lockZoom() {
  const opt = { passive: false }; // 关键：不设这个，preventDefault 会被忽略

  // iOS Safari 手势缩放（pinch）
  document.addEventListener('gesturestart',  e => e.preventDefault(), opt);
  document.addEventListener('gesturechange', e => e.preventDefault(), opt);
  document.addEventListener('gestureend',    e => e.preventDefault(), opt);

  // 双指 pinch 兜底（非 iOS 设备的 touchmove 没有 scale，先判断 undefined 避免误伤）
  document.addEventListener('touchmove', e => {
    if (e.scale !== undefined && e.scale !== 1) e.preventDefault();
  }, opt);

  // 双击放大
  let lastTouchEnd = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, opt);

  // 加载确认：装上后若 pinch 仍能缩放，先到 console 看有没有这一行
  // 有 → 扩展已加载，是 iOS 不认；无 → 扩展没启用/没加载
  console.log('[Lock Zoom] loaded — zoom gestures intercepted on top document');
})();
