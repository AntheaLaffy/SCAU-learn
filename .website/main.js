// main.js —— 稳定索引 + hash 路由 + 内容引擎 + UI/动画完整恢复版
// ==================================================
// 主干：路由 + 内容显示（md/html）
// 补回：按钮 / 搜索 / 首页跳转 / 右侧快捷动画 / UI 面板

/* -------------------- 1. 全局变量声明 -------------------- */
// 将原本立即执行的配置改为占位符，等待 fetch 完成后填充
let CONFIG = {};
let LIBRARY_DATA = [];
let ALL = [];
let VISIBLE = [];
const USED_IDX = new Set();
let autoIdx = 1;
const ANIM_STORAGE_KEY = 'scau-learn.anim-config';

const AnimConfig = {
    duration: 400,
    offset: 15,
    mode: 'fade'
};

/* -------------------- 2. 异步启动引擎 -------------------- */
async function initApp() {
    try {
        // 1. 获取 JSON 数据
        const response = await fetch('data.json?v=' + Date.now());
        if (!response.ok) throw new Error(`无法加载 data.json (Status: ${response.status})`);
        const data = await response.json();

        // 2. 注入配置
        CONFIG = data.config || {
            baseUrl: "",
            welcomeTemplate: "docs/welcome-template.md",
            errorTemplate: "docs/error-template.md"
        };
        LIBRARY_DATA = data.sections || [];

        // 3. 构建索引系统
        buildIndexSystem();

        // 4. 初始化 UI 组件
        showLocalFileWarning();
        initSidebar();
        initSidebarSearch();
        syncCssVar();

        // 5. 执行初始路由
        handleRoute(location.hash);

    } catch (err) {
        console.error("Critical Error:", err);
        const box = document.getElementById('content');
        if (box) box.innerHTML = `<div style="padding:20px; color:red;"><h3>数据加载失败</h3><p>${err.message}</p></div>`;
    }
}

/* -------------------- 3. 索引处理逻辑 -------------------- */
function buildIndexSystem() {
    // 清空集合和数组
    USED_IDX.clear();
    ALL.length = 0;
    VISIBLE.length = 0;
    autoIdx = 1;
    
    // 收集已有的索引
    LIBRARY_DATA.forEach(sec => sec.items.forEach(it => {
        if (typeof it.idx === 'number') USED_IDX.add(it.idx);
    }));

    function nextFreeIdx() {
        while (USED_IDX.has(autoIdx)) autoIdx++;
        USED_IDX.add(autoIdx);
        return autoIdx++;
    }

    // 填充 ALL 和 VISIBLE 列表
    LIBRARY_DATA.forEach(sec => sec.items.forEach(it => {
        if (typeof it.idx !== 'number') it.idx = nextFreeIdx();
        it.rawPath = it.mdPath;
        it.visible = it.visible !== false;

        ALL.push(it);
        if (it.visible) VISIBLE.push(it);
    }));

    VISIBLE.sort((a, b) => a.idx - b.idx);
}

/* -------------------- 4. 核心功能函数 (保持不变或微调) -------------------- */

// file:// 警告
function showLocalFileWarning() {
    if (location.protocol !== 'file:') return;
    const div = document.createElement('div');
    div.style.cssText = `position:fixed;top:0;left:300px;right:0;padding:10px 20px;background:#e3f2fd;color:#0d47a1;z-index:9999;border-bottom:2px solid #90caf9;`;
    div.innerHTML = `⚠️ 当前使用 file:// 模式，浏览器安全策略可能拦截 JSON 请求。请使用 Web 服务器打开。<br><button style="margin-left:15px">我知道了</button>`;
    div.querySelector('button').onclick = () => div.remove();
    document.body.appendChild(div);
}

// 内容渲染引擎
async function renderContent(rec) {
    const box = document.getElementById('content');
    if (!box) return;

    box.classList.remove('active');
    box.style.transitionDuration = AnimConfig.duration + 'ms';
    box.style.transform = AnimConfig.mode === 'slide' ? `translateY(${AnimConfig.offset}px)` : 'translateY(0)';

    try {
        const res = await fetch(CONFIG.baseUrl + rec.mdPath + '?t=' + Date.now());
        if (!res.ok) throw new Error('404');
        const txt = await res.text();
        box.innerHTML = rec.mdPath.endsWith('.html') ? txt : marked.parse(txt);
    } catch {
        try {
            const errRes = await fetch(CONFIG.baseUrl + CONFIG.errorTemplate);
            const errTxt = errRes.ok ? await errRes.text() : '# 内容未完工\n\n> 章节正在施工中...';
            box.innerHTML = marked.parse(errTxt);
        } catch {
            box.innerHTML = marked.parse('# 内容未完工\n\n> 无法加载错误模板');
        }
    }

    requestAnimationFrame(() => {
        box.style.transform = 'translateY(0)';
        box.classList.add('active');
    });
}

// 路由处理
function getRecordByHash(hash) {
    if (!hash || hash === '#' || hash === '#/') return ALL.find(it => it.idx === 0) || ALL[0];
    const path = decodeURIComponent(hash.slice(1));
    return ALL.find(it => it.rawPath === path);
}

function handleRoute(hash) {
    const rec = getRecordByHash(hash);
    if (!rec) return;
    renderContent(rec);

    document.querySelectorAll('.menu-list a').forEach(a => {
        a.classList.toggle('active', parseInt(a.dataset.idx) === rec.idx);
    });
}

// 侧边栏初始化
function initSidebar() {
    const menu = document.getElementById('menu');
    if (!menu) return;
    menu.innerHTML = '';

    LIBRARY_DATA.forEach(sec => {
        const items = sec.items.filter(i => i.visible);
        if (!items.length) return;

        const title = document.createElement('p');
        title.className = 'menu-title';
        title.textContent = sec.caption;

        const ul = document.createElement('ul');
        ul.className = 'menu-list';

        items.forEach(it => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${encodeURIComponent(it.rawPath)}`;
            link.dataset.idx = String(it.idx);
            link.textContent = it.title;
            li.appendChild(link);
            ul.appendChild(li);
        });

        menu.appendChild(title);
        menu.appendChild(ul);
    });
}

// 搜索功能
function initSidebarSearch() {
    const input = document.getElementById('search');
    if (!input) return;

    input.addEventListener('input', () => {
        const key = input.value.toLowerCase();
        document.querySelectorAll('.menu-title').forEach(title => {
            const ul = title.nextElementSibling;
            let any = false;
            ul.querySelectorAll('li').forEach(li => {
                const show = li.textContent.toLowerCase().includes(key);
                li.style.display = show ? '' : 'none';
                if (show) any = true;
            });
            title.style.display = any ? '' : 'none';
            ul.style.display = any ? '' : 'none';
        });
    });
}

/* -------------------- 5. 动画与交互 -------------------- */
function applyAnimConfig({ duration, offset, mode } = {}) {
    if (typeof duration === 'number') AnimConfig.duration = duration;
    if (typeof offset === 'number') AnimConfig.offset = offset;
    if (mode) AnimConfig.mode = mode;
    syncCssVar();
    syncAnimControls();

    try {
        localStorage.setItem(ANIM_STORAGE_KEY, JSON.stringify(AnimConfig));
    } catch (err) {
        console.warn('Unable to persist animation config:', err);
    }
}

function syncCssVar() {
    const root = document.documentElement;
    root.style.setProperty('--duration', AnimConfig.duration + 'ms');
    root.style.setProperty('--offset', AnimConfig.offset + 'px');
}

function syncAnimControls() {
    const dur = document.getElementById('anim-duration');
    const off = document.getElementById('anim-offset');
    const durVal = document.getElementById('duration-val');
    const offVal = document.getElementById('offset-val');

    if (dur) dur.value = String(AnimConfig.duration);
    if (off) off.value = String(AnimConfig.offset);
    if (durVal) durVal.textContent = `${AnimConfig.duration}ms`;
    if (offVal) offVal.textContent = `${AnimConfig.offset}px`;
}

function restoreAnimConfig() {
    try {
        const saved = JSON.parse(localStorage.getItem(ANIM_STORAGE_KEY) || 'null');
        if (!saved || typeof saved !== 'object') return;
        applyAnimConfig(saved);
    } catch (err) {
        console.warn('Unable to restore animation config:', err);
    }
}

function openModal(id) {
    const overlay = document.getElementById('settings-overlay');
    const target = document.getElementById(id);
    if (!overlay || !target) return;

    overlay.style.display = 'flex';
    document.querySelectorAll('.modal-content').forEach(modal => {
        modal.style.display = modal.id === id ? 'block' : 'none';
    });
}

function closeModal(event) {
    const overlay = document.getElementById('settings-overlay');
    if (!overlay) return;
    if (event && event.target !== overlay) return;
    overlay.style.display = 'none';
}

function quickSetAnim(duration, offset, mode) {
    applyAnimConfig({ duration, offset, mode });
    openModal('modal-anim');
}

/* 索引匹配引擎 */
function matchRecord(condition = '') {
    const cur = getRecordByHash(location.hash);
    const curIdx = cur ? cur.idx : 0;
    const op = condition.slice(0, 1);
    const num = parseInt(condition.slice(1), 10);
    if (Number.isNaN(num)) return null;

    if (op === '=') return ALL.find(it => it.idx === num) || null;

    const arr = VISIBLE.map(it => it.idx).sort((a, b) => a - b);
    if (op === '+') {
        const hit = arr.find(ix => ix >= curIdx + num);
        return VISIBLE.find(it => it.idx === hit) || null;
    }
    if (op === '-') {
        const hit = arr.slice().reverse().find(ix => ix <= curIdx - num);
        return VISIBLE.find(it => it.idx === hit) || null;
    }
    return null;
}

/* -------------------- 6. 事件监听 -------------------- */
document.addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn[data-goto]');
    if (!btn) return;
    const rec = matchRecord(btn.dataset.goto);
    if (rec) location.hash = `#${encodeURIComponent(rec.rawPath)}`;
});

window.addEventListener('DOMContentLoaded', () => {
    // 启动异步程序
    restoreAnimConfig();
    syncAnimControls();
    initApp();

    const home = document.getElementById('welcome-title');
    if (home) home.onclick = () => { location.hash = '#/'; };

    const dur = document.getElementById('anim-duration');
    const off = document.getElementById('anim-offset');
    if (dur) dur.addEventListener('input', e => applyAnimConfig({ duration: +e.target.value }));
    if (off) off.addEventListener('input', e => applyAnimConfig({ offset: +e.target.value }));
});

window.addEventListener('hashchange', () => handleRoute(location.hash));
