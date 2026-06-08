jQuery(async ($) => {
    'use strict';

    const ICON = '.drawer-icon';
    const EXT_PANEL = '.extensions_block';
    const EXT_BTN = '.drawer-icon.fa-cubes';

    // Observer 1：监听普通 drawer 的 class 变化
    const iconObserver = new MutationObserver((mutations) => {
        for (const mut of mutations) {
            const el = mut.target;
            const wasOpen = mut.oldValue?.split(' ').includes('open');
            const isNowOpen = el.classList.contains('open');

            if (!wasOpen && isNowOpen) {
                $(ICON).not(el).filter('.open').trigger('click');
                // 顺手关掉扩展面板（如果开着）
                if ($(EXT_PANEL).is(':visible')) {
                    $(EXT_BTN).trigger('click');
                }
                break;
            }
        }
    });

    // Observer 2：监听扩展面板的 style 变化
    const extObserver = new MutationObserver((mutations) => {
        for (const mut of mutations) {
            const el = mut.target;
            const wasHidden =
                mut.oldValue?.includes('display: none') ||
                mut.oldValue?.includes('display:none');
            const isNowVisible = window.getComputedStyle(el).display !== 'none';

            if (wasHidden && isNowVisible) {
                $(ICON).filter('.open').trigger('click');
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
                attributes: true,
                attributeFilter: ['class'],
                attributeOldValue: true,
            });
        });

        extObserver.observe(extPanel, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true,
        });

        console.log(`[auto-close-drawers] attached ${icons.length} icons + ext panel`);
    }

    attach();
});
