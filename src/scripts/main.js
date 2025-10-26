/**
 * 站点全局交互：导航菜单 & 滚动状态
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.NavLinks');
    const nav = document.querySelector('.FursNav');
    const SCROLL_HIDE_OFFSET = 100;

    /**
     * 更新导航展开状态与 ARIA 属性
     * @param {boolean} isOpen
     */
    const setMenuState = (isOpen) => {
        if (!hamburger || !navLinks) return;
        hamburger.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            setMenuState(!isActive);
        });

        document.addEventListener('click', (event) => {
            if (hamburger.contains(event.target) || navLinks.contains(event.target)) {
                return;
            }
            setMenuState(false);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 860) {
                setMenuState(false);
            }
        });
    }

    if (nav) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const shouldHide = currentScrollY > lastScrollY && currentScrollY > SCROLL_HIDE_OFFSET;
            nav.classList.toggle('scroll-hide', shouldHide);
            lastScrollY = currentScrollY;
        });
    }
});