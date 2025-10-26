class ThemeSwitcher {
    constructor() {
        this.STORAGE_KEY = 'furs-theme';
        this.STYLE_ID = 'furs-theme-switcher-style';
        this.injectStyles();
        this.render();
        this.bindEvents();
        this.applyTheme(this.getInitialTheme());
    }

    injectStyles() {
        if (document.getElementById(this.STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = this.STYLE_ID;
        style.textContent = `
            .theme-switcher {
                position: fixed;
                top: 16px;
                right: 16px;
                z-index: 1200;
                font-size: 18px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 8px;
            }

            .theme-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 42px;
                height: 42px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.9);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                user-select: none;
            }

            .theme-menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 110%;
                right: 0;
                background: rgba(255, 255, 255, 0.96);
                border-radius: 10px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
                overflow: hidden;
                min-width: 160px;
            }

            .theme-menu.show {
                display: flex;
            }

            .theme-option {
                padding: 10px 16px;
                background: none;
                border: none;
                text-align: left;
                font: inherit;
                color: inherit;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.2s ease;
            }

            .theme-option:hover,
            .theme-option:focus-visible {
                background: rgba(0, 0, 0, 0.07);
            }

            body[data-theme='dark'] .theme-switcher .theme-icon {
                background: rgba(32, 25, 20, 0.92);
                color: #f4ede6;
            }

            body[data-theme='dark'] .theme-switcher .theme-menu {
                background: rgba(32, 25, 20, 0.95);
                color: #f4ede6;
            }

            body[data-theme='dark'] .theme-switcher .theme-option:hover,
            body[data-theme='dark'] .theme-switcher .theme-option:focus-visible {
                background: rgba(255, 255, 255, 0.08);
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const container = document.createElement('div');
        container.className = 'theme-switcher';
        container.innerHTML = `
            <button class="theme-icon" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="theme-switcher-menu" title="切换主题">🌞</button>
            <div class="theme-menu" id="theme-switcher-menu" role="menu">
                <button class="theme-option" type="button" data-theme="light" role="menuitemradio" aria-checked="false">🌞 日间模式</button>
                <button class="theme-option" type="button" data-theme="dark" role="menuitemradio" aria-checked="false">🌙 夜间模式</button>
            </div>
        `;
        document.body.appendChild(container);

        this.container = container;
        this.icon = container.querySelector('.theme-icon');
        this.menu = container.querySelector('.theme-menu');
        this.options = Array.from(container.querySelectorAll('.theme-option'));
    }

    bindEvents() {
        if (!this.icon || !this.menu) return;

        this.icon.addEventListener('click', () => {
            const isOpen = this.menu.classList.toggle('show');
            this.icon.setAttribute('aria-expanded', String(isOpen));
        });

        this.options.forEach((option) => {
            option.addEventListener('click', () => {
                this.applyTheme(option.dataset.theme);
                this.closeMenu();
            });
        });

        document.addEventListener('click', (event) => {
            if (!this.container.contains(event.target)) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    closeMenu() {
        if (!this.menu || !this.icon) return;
        this.menu.classList.remove('show');
        this.icon.setAttribute('aria-expanded', 'false');
    }

    getInitialTheme() {
        const storedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(theme) {
        const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', resolvedTheme);
        document.body.setAttribute('data-theme', resolvedTheme);
        localStorage.setItem(this.STORAGE_KEY, resolvedTheme);

        if (this.icon) {
            this.icon.textContent = resolvedTheme === 'dark' ? '🌙' : '🌞';
        }

        this.options?.forEach((option) => {
            const isSelected = option.dataset.theme === resolvedTheme;
            option.setAttribute('aria-checked', String(isSelected));
        });
    }
}

window.addEventListener('DOMContentLoaded', () => new ThemeSwitcher());
