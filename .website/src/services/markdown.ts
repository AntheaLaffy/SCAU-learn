import { marked } from 'marked';

const legacyChromeSelectors = ['.nav-btn'];

const headingIconRules: Array<[RegExp, string]> = [
  [/答案|解答/, 'clipboard-check'],
  [/题库|练习|题目|索引|检查/, 'list-checks'],
  [/复习|教材|资料说明/, 'book-open'],
  [/查询|搜索/, 'search'],
  [/入口|交流/, 'link'],
  [/学院/, 'school'],
  [/开发/, 'code'],
  [/部署/, 'rocket'],
  [/去重/, 'copy-check'],
  [/分层/, 'layers'],
  [/展示|浏览/, 'layout-list'],
  [/维护|其他资料/, 'folder-open'],
];

function headingIcon(title: string): string {
  return headingIconRules.find(([pattern]) => pattern.test(title))?.[1] ?? 'book-open';
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(source: string, target: HTMLElement): void {
  target.innerHTML = marked.parse(source, { async: false }) as string;

  target.querySelectorAll<HTMLHeadingElement>('h2').forEach((heading) => {
    const title = heading.textContent?.trim() ?? '';
    if (/^\p{Extended_Pictographic}/u.test(title)) return;
    if (/试卷|考试/.test(title)) {
      heading.prepend('📄 ');
      return;
    }

    const icon = document.createElement('i');
    icon.dataset.lucide = headingIcon(title);
    icon.setAttribute('aria-hidden', 'true');
    heading.classList.add('section-heading-with-icon');
    heading.prepend(icon);
  });

  for (const selector of legacyChromeSelectors) {
    target.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      const wrapper = element.parentElement;
      element.remove();
      if (wrapper && wrapper.children.length === 0 && !wrapper.textContent?.trim()) wrapper.remove();
    });
  }

  target.querySelectorAll<HTMLParagraphElement>('p').forEach((paragraph) => {
    const text = paragraph.textContent?.trim() ?? '';
    if (text.startsWith('🏠 /') || text.startsWith('版权声明： 网站由')) paragraph.remove();
  });

  target.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    if (/^https?:\/\//.test(href)) {
      link.target = '_blank';
      link.rel = 'noreferrer';
    }

    if (/\.(pdf|docx?|pptx?|xlsx?|md|zip|rar|jpe?g|png)(?:$|[?#])/i.test(href)) {
      link.classList.add('resource-link');
    }
  });

  target.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
    image.loading = 'lazy';
    image.decoding = 'async';
  });
}
