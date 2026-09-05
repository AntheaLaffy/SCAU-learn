import type { LibraryPage } from '../types';

export type Route = { kind: 'home' } | { kind: 'page'; page: LibraryPage } | { kind: 'not-found' };

export function parseRoute(hash: string, pages: LibraryPage[]): Route {
  const raw = hash.replace(/^#\/?/, '');
  if (!raw) return { kind: 'home' };

  let routeId = raw;
  try {
    routeId = decodeURIComponent(raw);
  } catch {
    return { kind: 'not-found' };
  }

  const page = pages.find((candidate) => candidate.id === routeId || candidate.legacyPath === routeId);
  return page ? { kind: 'page', page } : { kind: 'not-found' };
}

export function pageHash(page: LibraryPage): string {
  return `#/${encodeURIComponent(page.id)}`;
}
