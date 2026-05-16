class ThemeSwitcher {
    constructor() {
        this.injectStyles();
        this.init();
        this.handleClickOutside();
    }

    injectStyles() {
        const style = document.createElement("style");
        style.textContent = `
            /* ========== 浅色模式 (默认) ========== */
            :root, [data-theme="light"] {
                --bg-color: #ffffff;
                --bg-secondary: #f8f9fa;
                --text-color: #000000;
                --text-secondary: #5e3719;
                --card-bg: rgba(255, 255, 255, 0.92);
                --nav-bg: rgba(255, 255, 255, 0.98);
                --border-color: rgba(94, 55, 25, 0.1);
                --shadow-color: rgba(94, 55, 25, 0.15);
                --menu-hover: rgba(0, 0, 0, 0.05);
                --news-item-hover: rgba(255, 214, 180, 0.2);
                --link-color: #000000;
                --footer-bg: rgba(255, 255, 255, 0.9);
                --modal-bg: rgba(255, 255, 255, 0.98);
                --input-bg: #ffffff;
                --scrollbar-thumb: #ff9f68;
                --scrollbar-track: #f0f0f0;
            }

            /* ========== 深色模式 ========== */
            [data-theme="dark"] {
                --bg-color: #1a1a2e;
                --bg-secondary: #16213e;
                --text-color: #eaeaea;
                --text-secondary: #d4c4b8;
                --card-bg: rgba(30, 30, 50, 0.95);
                --nav-bg: rgba(26, 26, 46, 0.98);
                --border-color: rgba(255, 255, 255, 0.1);
                --shadow-color: rgba(0, 0, 0, 0.3);
                --menu-hover: rgba(255, 255, 255, 0.1);
                --news-item-hover: rgba(255, 159, 104, 0.15);
                --link-color: #ffd3b6;
                --footer-bg: rgba(26, 26, 46, 0.95);
                --modal-bg: rgba(30, 30, 50, 0.98);
                --input-bg: #2a2a4a;
                --scrollbar-thumb: #ff6b6b;
                --scrollbar-track: #2a2a4a;
            }

            /* ========== 全局样式 ========== */
            body {
                background: var(--bg-color) !important;
                color: var(--text-color) !important;
                transition: background 0.3s ease, color 0.3s ease;
            }

            a {
                color: var(--link-color) !important;
            }

            /* ========== 导航栏 ========== */
            .FursNav {
                background: var(--nav-bg) !important;
                backdrop-filter: blur(12px);
                box-shadow: 0 4px 20px var(--shadow-color);
            }

            .logo-text {
                background: linear-gradient(to right, #ff6b6b, #ff9f68);
                -webkit-background-clip: text;
                background-clip: text;
            }

            .nav-link {
                color: var(--text-secondary) !important;
            }

            .nav-link:hover {
                color: #ff9f68 !important;
            }

            .nav-link.active {
                background: rgba(255, 159, 104, 0.15);
                color: #ff6b6b !important;
            }

            .hamburger span {
                background: var(--text-secondary);
            }

            /* 移动端导航菜单 */
            @media (max-width: 860px) {
                .NavLinks {
                    background: var(--nav-bg) !important;
                }
            }

            /* ========== 主题切换器组件 ========== */
            .theme-switcher {
                position: fixed;
                top: 10px;
                right: 10px;
                font-size: 18px;
                z-index: 1000;
            }

            .theme-icon {
                cursor: pointer;
                padding: 4px;
                user-select: none;
                background: var(--card-bg);
                border-radius: 50%;
                box-shadow: 0 2px 8px var(--shadow-color);
            }

            .theme-menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: 5px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                overflow: hidden;
                box-shadow: 0 2px 8px var(--shadow-color);
                min-width: 120px;
                font-size: 14px;
            }

            .theme-menu.show {
                display: flex;
            }

            .theme-option {
                padding: 8px 12px;
                cursor: pointer;
                transition: background 0.2s;
                text-align: left;
                color: var(--text-color);
            }

            .theme-option:hover {
                background: var(--menu-hover);
            }

            /* ========== 页面头部 ========== */
            .page-header {
                background: linear-gradient(to bottom, rgba(255, 211, 182, 0.1), transparent);
                border-bottom: 1px solid var(--border-color);
            }

            .page-title {
                color: #FF806A;
            }

            .page-subtitle {
                color: var(--text-secondary);
            }

            /* ========== 内容块和卡片 ========== */
            .content-block,
            .announcements {
                background: var(--card-bg) !important;
                box-shadow: 0 8px 24px var(--shadow-color);
            }

            .content-block:hover {
                box-shadow: 0 12px 30px var(--shadow-color);
            }

            .content-title {
                color: var(--text-secondary);
            }

            .event-card {
                background: var(--card-bg) !important;
                box-shadow: 0 5px 15px var(--shadow-color);
            }

            .event-card:hover {
                box-shadow: 0 12px 25px rgba(255, 107, 107, 0.2);
            }

            .event-title {
                color: var(--text-secondary);
            }

            .event-details {
                color: var(--text-secondary);
                opacity: 0.8;
            }

            .event-meta {
                color: var(--text-secondary);
            }

            .event-status {
                background: var(--accent-color, #ffd3b6);
                color: var(--text-secondary);
            }

            /* ========== 新闻列表 ========== */
            .news-item {
                border-bottom: 1px solid var(--border-color);
            }

            .news-item:hover {
                background: var(--news-item-hover);
            }

            .news-title {
                color: var(--text-secondary);
            }

            .news-info {
                color: var(--text-secondary);
                opacity: 0.7;
            }

            /* ========== 公告容器 ========== */
            .announcement-container {
                background: var(--card-bg) !important;
                box-shadow: 0 4px 12px var(--shadow-color);
            }

            .announcement-title {
                color: #ff6b6b;
            }

            .announcement-content {
                color: var(--text-secondary);
            }

            .announcement-date {
                color: var(--text-secondary);
                opacity: 0.7;
            }

            /* ========== 按钮 ========== */
            .cta-button {
                background: linear-gradient(to right, #ff6b6b, #ff9f68);
                color: white !important;
            }

            .secondary-button {
                border: 2px solid #ff9f68;
                color: var(--text-secondary) !important;
            }

            .secondary-button:hover {
                background: rgba(255, 159, 104, 0.1);
            }

            /* ========== 页脚 ========== */
            .CopyRight {
                background: var(--footer-bg) !important;
                box-shadow: 0 4px 20px var(--shadow-color);
            }

            .footer-info p {
                color: var(--text-secondary);
            }

            .link-group h4 {
                color: var(--text-secondary);
            }

            .link-group a {
                color: var(--text-secondary) !important;
            }

            .link-group a:hover {
                color: #ff9f68 !important;
            }

            .CopyRightInfor {
                color: var(--text-secondary);
                border-top: 1px solid var(--border-color);
            }

            .social-links a {
                background: #ff9f68;
                color: white !important;
            }

            .social-links a:hover {
                background: #ff6b6b;
            }

            /* ========== 表单和输入框 ========== */
            input, textarea, select {
                background: var(--input-bg) !important;
                color: var(--text-color) !important;
                border-color: var(--border-color) !important;
            }

            /* ========== 滚动条样式 ========== */
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            ::-webkit-scrollbar-track {
                background: var(--scrollbar-track);
            }

            ::-webkit-scrollbar-thumb {
                background: var(--scrollbar-thumb);
                border-radius: 5px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: #ff9f68;
            }

            /* ========== 其他通用样式 ========== */
            .team-member,
            .value-card {
                background: var(--card-bg) !important;
                box-shadow: 0 8px 24px var(--shadow-color);
            }

            /* ========== 模态框和弹窗 ========== */
            .modal,
            .popup,
            .dialog {
                background: var(--modal-bg) !important;
                color: var(--text-color) !important;
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        const container = document.createElement("div");
        container.className = "theme-switcher";
        container.innerHTML = `
            <div class="theme-icon">⚪</div>
            <div class="theme-menu">
                <div class="theme-option" data-theme="light">🌞 日间模式</div>
                <div class="theme-option" data-theme="dark">🌙 夜间模式</div>
            </div>
        `;
        document.body.appendChild(container);

        this.icon = container.querySelector(".theme-icon");
        this.menu = container.querySelector(".theme-menu");
        const options = container.querySelectorAll(".theme-option");

        this.icon.addEventListener("click", () => this.menu.classList.toggle("show"));

        options.forEach(opt => {
            opt.addEventListener("click", () => {
                this.setTheme(opt.dataset.theme);
                this.menu.classList.remove("show");
                localStorage.setItem("theme", opt.dataset.theme);
            });
        });

        // 在页面加载时立即应用保存的主题，防止闪烁
        const savedTheme = localStorage.getItem("theme") || "light";
        this.applyTheme(savedTheme);

        // DOM 加载完成后再设置一次主题，确保所有元素都已渲染
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setTheme(savedTheme);
            });
        } else {
            this.setTheme(savedTheme);
        }
    }

    applyTheme(theme) {
        // 立即设置 data-theme 属性，用于 CSS 变量选择器
        document.documentElement.setAttribute("data-theme", theme);
        document.body.setAttribute("data-theme", theme);
    }

    setTheme(theme) {
        // 设置 data-theme 属性，让 CSS 变量生效
        this.applyTheme(theme);

        // 更新图标
        this.icon.textContent = theme === "dark" ? "🌙" : "🌞";

        // 保存到 localStorage
        localStorage.setItem("theme", theme);
    }

    handleClickOutside() {
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".theme-switcher")) {
                this.menu.classList.remove("show");
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", () => new ThemeSwitcher());