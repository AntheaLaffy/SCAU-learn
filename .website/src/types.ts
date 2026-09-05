export interface Textbook {
  isbn: string;
  coverSrc: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
}

export interface LibraryPage {
  id: string;
  title: string;
  summary: string;
  content: string;
  legacyPath: string;
  keywords?: string[];
  textbook?: Textbook;
}

export interface LibrarySection {
  id: string;
  title: string;
  pages: LibraryPage[];
}

export interface SearchResult {
  sections: LibrarySection[];
  pageCount: number;
}
