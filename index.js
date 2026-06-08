jQuery(async ($) => {
    'use strict';

    const ICON = '.drawer-icon';
    const EXT_PANEL = '.extensions_block';
    const EXT_BTN = '.drawer-icon.fa-cubes';

    let busy = false;

    // 关掉除「触发源」外的所有面板
    function closeOthers({ exceptIcon = null, fromExt = false }) {
        if (busy) return;
        busy = true;

        $(ICON).filter('.open').each(function () {
            if (this !== exceptIcon) $(this).trigger('click');
        });

        if (!fromExt && $(EXT_PANEL).is(':visible')) {
            const btn = document.querySelector(EXT_BTN);
            if (btn) btn.click();
        }

        setTimeout(() => { busy = false; }, 80);
    }

    // 普通 drawer：盯 class 变化
    const iconObserver = new MutationObserver((muts) => {
        for (const m of muts) {
            const el = m.target;
            const wasOpen = m.oldValue?.split(' ').includes('open');
            if (!wasOpen && el.classList.contains('open')) {
                closeOthers({ exceptIcon: el });
                break;
            }
        }
    });

    // 扩展面板：盯 style 变化
    const extObserver = new MutationObserver((muts) => {
        for (const m of muts) {
            const el = m.target;
            const wasHidden = /display:\s*none/.test(m.oldValue || '');
            const isVisible = window.getComputedStyle(el).display !== 'none';
            if (wasHidden && isVisible) {
                closeOthers({ fromExt: true });
                break;
            }
        }
    });

    function attach() {
        const icons = $(ICON);
        const extPanel = document.querySelector(EXT_PANEL);
        if (!icons.length || !extPanel) {
            setTimeout(attach, 500);
            return;
        }
        icons.each(function () {
            iconObserver.observe(this, {
                attributes: true, attributeFilter: ['class'], attributeOldValue: true,
            });
        });
        extObserver.observe(extPanel, {
            attributes: true, attributeFilter: ['style'], attributeOldValue: true,
        });
        console.log(`[auto-close-drawers] attached ${icons.length} icons + ext panel`);
    }

    attach();
});
