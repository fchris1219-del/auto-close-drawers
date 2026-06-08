# Auto-close Drawers · 导航抽屉自动收起

A SillyTavern extension that automatically closes other nav drawers when you open a new one.

在酒馆中打开一个导航抽屉时，自动收起其他已展开的抽屉。

---

## Installation · 安装

**Method A — ST built-in installer · 方式 A：通过酒馆安装器**

1. Open **Extensions → Install Extension**  
   打开 **Extensions → Install Extension**
2. Paste the repository URL and confirm  
   粘贴本仓库地址，确认安装
3. Reload the page  
   刷新页面

> Requires git to be installed on the server.  
> 服务器上需要已安装 git。

**Method B — Manual install · 方式 B：手动安装**

```bash
cd [SillyTavern root]/public/scripts/extensions/third-party
git clone [repo URL] auto-close-drawers
```

Then reload the SillyTavern page.  
完成后刷新酒馆页面。

---

## How it works · 原理

ST marks open nav drawers by adding an `open` class to `.drawer-icon` elements. This extension uses a `MutationObserver` to watch for that class change — when one drawer opens, all other open drawers are programmatically closed via their existing click handlers.

酒馆通过给 `.drawer-icon` 元素添加 `open` class 来标记已展开的抽屉。本扩展使用 `MutationObserver` 监听这一变化——当某个抽屉打开时，自动触发其他已展开抽屉的关闭逻辑。

No monkey-patching, no interference with ST's internal event system.  
不修改酒馆内部逻辑，不拦截原有事件。

---

## Compatibility · 兼容性

Tested on SillyTavern `1.12+`. Should work on any version that uses the `.drawer-icon` / `open` class convention.

在 SillyTavern `1.12+` 上测试通过。任何使用 `.drawer-icon` / `open` class 约定的版本应均可兼容。

---

## License · 许可

MIT
