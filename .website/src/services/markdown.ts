import { marked } from 'marked';

const legacyChromeSelectors = ['.nav-btn'];

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(source: string, target: HTMLElement): void {
  target.innerHTML = marked.parse(source, { async: false }) as string;

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
