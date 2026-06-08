jQuery(async ($) => {
    'use strict';

    const CONTENT = '.drawer-content';
    let busy = false;

    function closeOthers(exceptContent) {
        if (busy) return;
        busy = true;

        $(CONTENT).each(function () {
            if (this === exceptContent) return;
            if (!$(this).is(':visible')) return;   // 用可见性判断，不靠 openDrawer

            const drawer = this.closest('.drawer');
            const toggle = drawer && drawer.querySelector('.drawer-toggle');
            if (toggle) toggle.click();
        });

        setTimeout(() => { busy = false; }, 120);
    }

    const observer = new MutationObserver((muts) => {
        for (const m of muts) {
            const el = m.target;
            let justOpened = false;

            if (m.attributeName === 'class') {
                const wasOpen = (m.oldValue || '').split(' ').includes('openDrawer');
                justOpened = !wasOpen && el.classList.contains('openDrawer');
            } else if (m.attributeName === 'style') {
                const wasHidden = /display:\s*none/.test(m.oldValue || '');
                justOpened = wasHidden && window.getComputedStyle(el).display !== 'none';
            }

            if (justOpened) {
                closeOthers(el);
                break;
            }
        }
    });

    function attach() {
        const contents = $(CONTENT);
        if (!contents.length) {
            setTimeout(attach, 500);
            return;
        }
        contents.each(function () {
            observer.observe(this, {
                attributes: true,
                attributeFilter: ['class', 'style'],
                attributeOldValue: true,
            });
        });
        console.log(`[auto-close-drawers] attached ${contents.length} drawer-contents`);
    }

    attach();
});
