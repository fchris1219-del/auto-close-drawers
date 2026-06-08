jQuery(async ($) => {
    'use strict';

    const ICON = '.drawer-icon';

    const observer = new MutationObserver((mutations) => {
        for (const mut of mutations) {
            const el = mut.target;
            const wasOpen = mut.oldValue?.split(' ').includes('open');
            const isNowOpen = el.classList.contains('open');

            if (!wasOpen && isNowOpen) {
                // 这个 drawer 刚打开 → 关掉其他所有已开的
                $(ICON).not(el).filter('.open').trigger('click');
                break;
            }
        }
    });

    function attach() {
        const icons = $(ICON);
        if (!icons.length) {
            setTimeout(attach, 500);
            return;
        }
        icons.each(function () {
            observer.observe(this, {
                attributes: true,
                attributeFilter: ['class'],
                attributeOldValue: true,
            });
        });
        console.log(`[auto-close-drawers] attached ${icons.length} icons`);
    }

    attach();
});
