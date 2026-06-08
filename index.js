jQuery(async ($) => {
    'use strict';

    const CONTENT = '.drawer-content';
    let busy = false;

    function closeOthers(exceptContent) {
        if (busy) return;
        busy = true;

        $(CONTENT).each(function () {
            if (this === exceptContent) return;
            if (!this.classList.contains('openDrawer')) return;

            const drawer = this.closest('.drawer');
            const toggle = drawer &&
                (drawer.querySelector('.drawer-toggle') ||
                 drawer.querySelector('.drawer-icon'));
            if (toggle) toggle.click();
        });

        setTimeout(() => { busy = false; }, 100);
    }

    const observer = new MutationObserver((muts) => {
        for (const m of muts) {
            const el = m.target;
            const wasOpen = (m.oldValue || '').split(' ').includes('openDrawer');
            if (!wasOpen && el.classList.contains('openDrawer')) {
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
                attributeFilter: ['class'],
                attributeOldValue: true,
            });
        });
        console.log(`[auto-close-drawers] attached ${contents.length} drawer-contents`);
    }

    attach();
});
