(() => {
    /**
     * FurMeet 活动展示配置
     */
    const FURMEET_API_CONFIG = {
        MAX_DISPLAY_MEETS: 6,
        API_ENDPOINT: 'https://api.furrycons.cn/event/recent',
        DEFAULT_MAPPING: {
            name: '暂无名称',
            city: '未知城市',
            detail: '暂无详情',
            coverUrl: '',
            globalUrl: '#'
        },
        ERROR_MESSAGE_DURATION: 5000,
        FETCH_TIMEOUT: 8000
    };

    const state = {
        containers: []
    };

    const errorHandler = {
        ensureContainer() {
            let container = document.getElementById('furMeetErrorContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'furMeetErrorContainer';
                document.body.appendChild(container);
            }
            return container;
        },

        show(message) {
            const container = this.ensureContainer();
            container.textContent = message;
            container.classList.add('is-visible');

            window.clearTimeout(container.hideTimer);
            container.hideTimer = window.setTimeout(() => {
                this.hide();
            }, FURMEET_API_CONFIG.ERROR_MESSAGE_DURATION);
        },

        hide() {
            const container = document.getElementById('furMeetErrorContainer');
            if (!container) return;
            container.classList.remove('is-visible');
            window.setTimeout(() => {
                container.textContent = '';
            }, 300);
        }
    };

    const collectMeetContainers = () => {
        const containers = [];
        for (let i = 1; i <= FURMEET_API_CONFIG.MAX_DISPLAY_MEETS; i += 1) {
            containers.push({
                id: i,
                name: document.getElementById(`FurMeet${i}Name`),
                cover: document.getElementById(`FurMeet${i}Cover`),
                city: document.getElementById(`FurMeet${i}City`),
                detail: document.getElementById(`FurMeet${i}Detail`),
                startDate: document.getElementById(`FurMeet${i}StartDate`),
                globalUrl: document.getElementById(`FurMeet${i}GlobalUrl`),
                card: document.getElementById(`MeetCard${i}`),
                coverBg: document.getElementById(`FurMeet${i}CoverBg`)
            });
        }
        return containers;
    };

    const cleanDescriptionText = (text) => {
        if (!text) return '';

        let cleaned = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        cleaned = cleaned.replace(/【[^】]*】/g, '').replace(/\[[^\]]*]/g, '');
        cleaned = cleaned.replace(/\n{2,}/g, '\n');
        cleaned = cleaned.replace(/\n/g, '<br>');

        return cleaned.trim();
    };

    const sanitizeHtml = (html) => {
        if (window.DOMPurify) {
            return window.DOMPurify.sanitize(html, { ALLOWED_TAGS: ['br', 'strong'], FORBID_ATTR: ['style'] });
        }
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    const cardManager = {
        populate(container, meetData) {
            if (!container || !meetData) return;

            const { name, cover, city, detail, startDate, globalUrl, coverBg } = container;
            const defaults = FURMEET_API_CONFIG.DEFAULT_MAPPING;

            if (name) name.textContent = meetData.name || defaults.name;
            if (city) city.textContent = meetData.city || defaults.city;
            if (startDate) {
                const dateSource = meetData.startDate || '';
                startDate.textContent = dateSource.substring(0, 10);
            }

            if (detail) {
                const safeHtml = sanitizeHtml(cleanDescriptionText(meetData.detail || defaults.detail));
                detail.innerHTML = safeHtml;
            }

            const coverSrc = meetData.coverUrl || defaults.coverUrl;
            if (cover) cover.src = coverSrc;
            if (coverBg) coverBg.src = coverSrc;

            if (globalUrl) {
                globalUrl.href = meetData.globalUrl || defaults.globalUrl;
                globalUrl.target = '_blank';
                globalUrl.rel = 'noopener noreferrer';
            }
        },

        hideUnused(totalMeets) {
            const displayCount = Math.min(totalMeets, FURMEET_API_CONFIG.MAX_DISPLAY_MEETS);
            state.containers.forEach((container, index) => {
                if (!container.card) return;
                container.card.style.display = index < displayCount ? '' : 'none';
            });
        },

        toggleLoading(isLoading) {
            state.containers.forEach((container) => {
                if (!container.card) return;
                container.card.classList.toggle('loading-state', isLoading);
            });
        }
    };

    const fetchMeetData = async () => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), FURMEET_API_CONFIG.FETCH_TIMEOUT);

        try {
            cardManager.toggleLoading(true);
            const response = await fetch(FURMEET_API_CONFIG.API_ENDPOINT, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`API 请求失败: ${response.status}`);
            }

            const payload = await response.json();
            return { total: payload.total ?? 0, meets: payload.data ?? [] };
        } finally {
            window.clearTimeout(timeoutId);
            cardManager.toggleLoading(false);
        }
    };

    const loadFurMeetData = async () => {
        try {
            const { total, meets } = await fetchMeetData();
            if (!Array.isArray(meets) || meets.length === 0) {
                throw new Error('暂无活动数据');
            }

            cardManager.hideUnused(total);
            meets.slice(0, FURMEET_API_CONFIG.MAX_DISPLAY_MEETS).forEach((meet, index) => {
                cardManager.populate(state.containers[index], meet);
            });
            errorHandler.hide();
        } catch (error) {
            console.error('[FurMeet] 加载失败:', error);
            cardManager.hideUnused(0);
            errorHandler.show(`加载活动信息失败，请稍后再试。（${error.message || '网络错误'}）`);
        }
    };

    const bootstrap = () => {
        state.containers = collectMeetContainers();
        if (!state.containers.length) return;
        window.setTimeout(loadFurMeetData, 120);
    };

    document.addEventListener('DOMContentLoaded', bootstrap);
})();