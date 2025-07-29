//使用Copilot优化FurMeetAPI之后得到的结果
// 看上去能跑，实际上也能跑，那就先用着好了
// 希望这一坨能坚持久一点

// 配置常量
const MAX_DISPLAY_MEETS = 6;
const API_URL = 'https://api.furrycons.cn/event/recent';

// 缓存DOM元素引用
const meetContainers = Array.from({ length: MAX_DISPLAY_MEETS }, (_, i) => ({
    name: document.getElementById(`FurMeet${i+1}Name`),
    cover: document.getElementById(`FurMeet${i+1}Cover`),
    city: document.getElementById(`FurMeet${i+1}City`),
    detail: document.getElementById(`FurMeet${i+1}Detail`),
    startDate: document.getElementById(`FurMeet${i+1}StartDate`),
    globalUrl: document.getElementById(`FurMeet${i+1}GlobalUrl`),
    card: document.getElementById(`MeetCard${i+1}`) // 添加卡片容器引用
}));

// 填充单个活动卡片
function populateMeetCard(container, meetData) {
    if (!container || !meetData) return;

    const { name, cover, city, detail, startDate, globalUrl } = container;

    if (name) name.textContent = meetData.name || '暂无名称';
    if (cover) cover.src = meetData.coverUrl || '';
    if (city) city.textContent = meetData.city || '未知城市';
    if (detail) detail.textContent = meetData.detail || '暂无详情';
    if (startDate) {
    const dateStr = meetData.startDate || '';
    startDate.textContent = dateStr.substring(0, 10);
    }
    if (globalUrl) {
    globalUrl.href = meetData.globalUrl || '#';
    globalUrl.target = "_blank";
    }
}

// 隐藏未使用的卡片
function hideUnusedCards(totalMeets) {
    const displayCount = Math.min(totalMeets, MAX_DISPLAY_MEETS);

  // 隐藏超出数量的卡片
    meetContainers.slice(displayCount).forEach(container => {
    if (container.card) container.card.style.display = 'none';
    });

  // 确保显示的卡片可见
    meetContainers.slice(0, displayCount).forEach(container => {
    if (container.card) container.card.style.display = '';
    });
}

// 主请求函数
async function fetchMeets() {
    try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`网络响应错误: ${response.status}`);
    
    const { total, data: meets } = await response.json();
    
    // 处理总活动数
    console.log(`API返回活动总数: ${total}`);
    hideUnusedCards(total);
    
    // 填充有效数据
    const displayCount = Math.min(total, MAX_DISPLAY_MEETS);
    for (let i = 0; i < displayCount; i++) {
        if (meets[i]) {
        populateMeetCard(meetContainers[i], meets[i]);
        }
    }
    
    } catch (error) {
    console.error('获取数据时发生错误:', error);
    // 错误处理：隐藏所有卡片
    meetContainers.forEach(container => {
        if (container.card) container.card.style.display = 'none';
    });
    // 可在此添加用户可见的错误提示
    }
}

// 初始化执行
fetchMeets();