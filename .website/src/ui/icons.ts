import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileText,
  Github,
  Home,
  Menu,
  Moon,
  Search,
  Sun,
  X,
  createIcons,
} from 'lucide';

const iconSet = {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileText,
  Github,
  Home,
  Menu,
  Moon,
  Search,
  Sun,
  X,
};

export function refreshIcons(root: HTMLElement | Document = document): void {
  createIcons({ icons: iconSet, root });
}
