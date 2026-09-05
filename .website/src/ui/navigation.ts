import { pageHash } from '../services/router';
import type { LibrarySection } from '../types';

export function renderNavigation(
  target: HTMLElement,
  sections: LibrarySection[],
  activePageId?: string,
): void {
  if (sections.length === 0) {
    target.innerHTML = `
      <div class="empty-search">
        <i data-lucide="file-text" aria-hidden="true"></i>
        <p>没有匹配的页面</p>
      </div>
    `;
    return;
  }

  target.innerHTML = sections
    .map(
      (section) => `
        <section class="nav-section" aria-labelledby="nav-${section.id}">
          <h2 id="nav-${section.id}">${section.title}</h2>
          <ul>
            ${section.pages
              .map(
                (page) => `
                  <li>
                    <a href="${pageHash(page)}" ${page.id === activePageId ? 'class="active" aria-current="page"' : ''}>
                      <span>${page.title}</span>
                    </a>
                  </li>
                `,
              )
              .join('')}
          </ul>
        </section>
      `,
    )
    .join('');
}
