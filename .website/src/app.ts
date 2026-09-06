import { allPages, getSectionForPage, librarySections, searchLibrary } from './data/library';
import { renderMarkdown } from './services/markdown';
import { pageHash, parseRoute } from './services/router';
import type { LibraryPage, Textbook } from './types';
import { refreshIcons } from './ui/icons';
import { renderNavigation } from './ui/navigation';

const THEME_KEY = 'scau-learn.theme';

function element<T extends HTMLElement>(selector: string): T {
  const result = document.querySelector<T>(selector);
  if (!result) throw new Error(`Missing required element: ${selector}`);
  return result;
}

export class App {
  private readonly view = element<HTMLDivElement>('#page-view');
  private readonly main = element<HTMLElement>('#main-content');
  private readonly sidebar = element<HTMLElement>('#sidebar');
  private readonly nav = element<HTMLElement>('#library-nav');
  private readonly search = element<HTMLInputElement>('#course-search');
  private readonly searchStatus = element<HTMLParagraphElement>('#search-status');
  private readonly clearSearchButton = element<HTMLButtonElement>('#clear-search');
  private readonly menuToggle = element<HTMLButtonElement>('#menu-toggle');
  private readonly navScrim = element<HTMLButtonElement>('#nav-scrim');
  private activePageId?: string;

  start(): void {
    this.bindEvents();
    this.syncThemeButtons();
    this.renderRoute();
    refreshIcons();
  }

  private bindEvents(): void {
    window.addEventListener('hashchange', () => this.renderRoute());
    this.search.addEventListener('input', () => this.renderSearch());
    this.clearSearchButton.addEventListener('click', () => {
      this.search.value = '';
      this.search.focus();
      this.renderSearch();
    });

    this.menuToggle.addEventListener('click', () => this.setSidebarOpen(!this.sidebar.classList.contains('is-open')));
    this.navScrim.addEventListener('click', () => this.setSidebarOpen(false));
    this.nav.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a')) this.setSidebarOpen(false);
    });

    document.querySelectorAll<HTMLButtonElement>('#theme-toggle, #mobile-theme-toggle').forEach((button) => {
      button.addEventListener('click', () => this.toggleTheme());
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.setSidebarOpen(false);
      if (event.key === '/' && document.activeElement !== this.search) {
        event.preventDefault();
        this.search.focus();
      }
    });
  }

  private renderRoute(): void {
    const route = parseRoute(window.location.hash, allPages);
    this.activePageId = route.kind === 'page' ? route.page.id : undefined;
    this.renderSearch();

    if (route.kind === 'home') this.renderHome();
    if (route.kind === 'page') this.renderPage(route.page);
    if (route.kind === 'not-found') this.renderNotFound();

    this.main.scrollTo({ top: 0, behavior: 'instant' });
    document.title = route.kind === 'page' ? `${route.page.title} | SCAU 学习资料库` : '华南农业大学学习资料库';
    refreshIcons(this.view);
  }

  private renderSearch(): void {
    const query = this.search.value;
    const result = searchLibrary(query);
    renderNavigation(this.nav, result.sections, this.activePageId);
    this.clearSearchButton.classList.toggle('visible', query.length > 0);
    this.searchStatus.textContent = query ? `找到 ${result.pageCount} 个页面` : `共 ${allPages.length} 个页面`;
    refreshIcons(this.nav);
  }

  private renderHome(): void {
    const courseSection = librarySections.find((section) => section.id === 'courses');
    const courses = courseSection?.pages ?? [];

    this.view.innerHTML = `
      <section class="home-view">
        <header class="home-heading">
          <div class="title-mark"><i data-lucide="book-open" aria-hidden="true"></i></div>
          <p class="eyebrow">学生共享资料</p>
          <h1>华南农业大学学习资料库</h1>
          <p class="lead">集中查找课程试卷、参考答案、课件与复习资料。</p>
        </header>

        <div class="library-stats" aria-label="资料库概况">
          <div><strong>${courses.length}</strong><span>门课程</span></div>
          <div><strong>${allPages.length}</strong><span>个索引页面</span></div>
          <div><strong>持续</strong><span>整理更新</span></div>
        </div>

        <section class="course-directory" aria-labelledby="course-directory-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">课程目录</p>
              <h2 id="course-directory-title">选择课程开始浏览</h2>
            </div>
          </div>
          <div class="course-grid">
            ${courses.map((course) => this.courseCard(course)).join('')}
          </div>
        </section>

        <aside class="contribution-note">
          <div class="note-icon"><i data-lucide="github" aria-hidden="true"></i></div>
          <div>
            <h2>发现缺失或错误？</h2>
            <p>通过 GitHub Issue 反馈，或提交 Pull Request 补充资料。</p>
          </div>
          <a href="https://github.com/AntheaLaffy/SCAU-learn/issues" target="_blank" rel="noreferrer">
            前往反馈 <i data-lucide="external-link" aria-hidden="true"></i>
          </a>
        </aside>
      </section>
    `;
  }

  private courseCard(page: LibraryPage): string {
    return `
      <a class="course-card" href="${pageHash(page)}">
        <span class="course-icon"><i data-lucide="file-text" aria-hidden="true"></i></span>
        <span class="course-copy">
          <strong>${page.title}</strong>
          <small>${page.summary}</small>
        </span>
        <i class="course-arrow" data-lucide="arrow-right" aria-hidden="true"></i>
      </a>
    `;
  }

  private renderPage(page: LibraryPage): void {
    const section = getSectionForPage(page.id);
    const pageIndex = allPages.findIndex((candidate) => candidate.id === page.id);
    const previous = pageIndex > 0 ? allPages[pageIndex - 1] : undefined;
    const next = pageIndex < allPages.length - 1 ? allPages[pageIndex + 1] : undefined;

    this.view.innerHTML = `
      <article class="document-view page-${page.id}">
        <nav class="breadcrumb" aria-label="面包屑">
          <a href="#/"><i data-lucide="home" aria-hidden="true"></i><span>首页</span></a>
          <span aria-hidden="true">/</span>
          <span>${section?.title ?? '资料'}</span>
        </nav>
        <header class="document-heading">
          <p class="eyebrow">${section?.title ?? '资料页面'}</p>
          <h1><i data-lucide="file-text" aria-hidden="true"></i><span>${page.title}</span></h1>
          <p>${page.summary}</p>
        </header>
        ${page.textbook ? this.renderTextbook(page.textbook) : ''}
        <div class="markdown-body" id="markdown-content"></div>
        ${this.renderPager(previous, next)}
      </article>
    `;

    renderMarkdown(page.content, element<HTMLElement>('#markdown-content'));
    this.bindTextbookPanel();
  }

  private renderTextbook(textbook: Textbook): string {
    return `
      <details class="textbook-panel">
        <summary>
          <span class="textbook-icon"><i data-lucide="book-marked" aria-hidden="true"></i></span>
          <span class="textbook-summary">
            <strong>教材参考</strong>
            <small>ISBN ${textbook.isbn}</small>
          </span>
          <span class="textbook-action">查看封面 <i data-lucide="chevron-down" aria-hidden="true"></i></span>
        </summary>
        <div class="textbook-content">
          <div class="textbook-cover">
            <img
              data-src="${textbook.coverSrc}"
              alt="${textbook.coverAlt}"
              width="${textbook.coverWidth}"
              height="${textbook.coverHeight}"
              decoding="async"
            />
            <span class="cover-loading">正在加载封面...</span>
          </div>
          <div class="textbook-meta">
            <span>课程参考教材</span>
            <strong>ISBN ${textbook.isbn}</strong>
            <p>教材版本可能随教学安排调整，请以任课教师要求为准。</p>
          </div>
        </div>
      </details>
    `;
  }

  private bindTextbookPanel(): void {
    const panel = this.view.querySelector<HTMLDetailsElement>('.textbook-panel');
    const image = panel?.querySelector<HTMLImageElement>('img[data-src]');
    if (!panel || !image) return;

    panel.addEventListener('toggle', () => {
      if (!panel.open || !image.dataset.src) return;
      const source = image.dataset.src;
      delete image.dataset.src;
      image.addEventListener('load', () => image.closest('.textbook-cover')?.classList.add('is-loaded'), { once: true });
      image.addEventListener(
        'error',
        () => {
          const cover = image.closest('.textbook-cover');
          cover?.classList.add('has-error');
          const message = cover?.querySelector<HTMLElement>('.cover-loading');
          if (message) message.textContent = '封面加载失败';
        },
        { once: true },
      );
      image.src = source;
    });
  }

  private renderPager(previous?: LibraryPage, next?: LibraryPage): string {
    return `
      <nav class="page-nav" aria-label="相邻页面">
        ${
          previous
            ? `<a class="previous" href="${pageHash(previous)}"><i data-lucide="arrow-left" aria-hidden="true"></i><span><small>上一篇</small><strong>${previous.title}</strong></span></a>`
            : '<span></span>'
        }
        ${
          next
            ? `<a class="next" href="${pageHash(next)}"><span><small>下一篇</small><strong>${next.title}</strong></span><i data-lucide="arrow-right" aria-hidden="true"></i></a>`
            : '<span></span>'
        }
      </nav>
    `;
  }

  private renderNotFound(): void {
    this.view.innerHTML = `
      <section class="not-found">
        <span class="status-code">404</span>
        <h1>没有找到这个页面</h1>
        <p>链接可能已经失效，或页面地址发生了变化。</p>
        <a class="primary-action" href="#/"><i data-lucide="home" aria-hidden="true"></i>返回资料库首页</a>
      </section>
    `;
  }

  private setSidebarOpen(open: boolean): void {
    this.sidebar.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    this.menuToggle.setAttribute('aria-expanded', String(open));
    this.menuToggle.setAttribute('aria-label', open ? '关闭课程导航' : '打开课程导航');
  }

  private toggleTheme(): void {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // The selected theme still applies for the current page when storage is unavailable.
    }
    this.syncThemeButtons();
  }

  private syncThemeButtons(): void {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.querySelectorAll<HTMLButtonElement>('#theme-toggle, #mobile-theme-toggle').forEach((button) => {
      button.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
      button.setAttribute('aria-label', isDark ? '切换浅色模式' : '切换深色模式');
      button.title = isDark ? '切换浅色模式' : '切换深色模式';
    });
    refreshIcons();
  }
}
