/**
 * 加入页面：QQ群弹窗交互
 */
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('join-qq-group');
    const modal = document.getElementById('qqGroupModal');
    const closeButton = modal ? modal.querySelector('.modal-close') : null;
    let lastFocusedElement = null;

    if (!trigger || !modal || !closeButton) return;

    const focusableSelectors = [
        'a[href]:not([tabindex="-1"])',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input[type="text"]:not([disabled])',
        'input[type="radio"]:not([disabled])',
        'input[type="checkbox"]:not([disabled])',
        'select:not([disabled])'
    ].join(', ');

    const trapFocus = (event) => {
        const focusableElements = modal.querySelectorAll(focusableSelectors);
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    const openModal = () => {
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeButton.focus();
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
    });

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('active')) return;

        if (event.key === 'Escape') {
            closeModal();
        }

        if (event.key === 'Tab') {
            trapFocus(event);
        }
    });
});
