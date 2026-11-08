import React from 'react';
import { SectionType } from '../../types';
import { Bookmark, Menu, X, PlusCircle, Search } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionType;
  setActiveSection: (sec: SectionType) => void;
  savedCount: number;
  onOpenSubmitModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  savedCount,
  onOpenSubmitModal,
  searchQuery,
  setSearchQuery,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems: { id: SectionType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'academic', label: 'Academics' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'learning', label: 'Learning' },
    { id: 'tools', label: 'Student Tools' },
    { id: 'community', label: 'Events & Q&A' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand wordmark (single element, clean typography) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('overview');
              }}
              className="text-xl font-extrabold tracking-tight text-blue-900 whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                S
              </span>
              <span>SomaHub</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean hover underlines) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (with Saved Resources shortcut) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveSection('saved')}
              className={`p-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSection === 'saved'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Saved items"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-mono tabular-nums">({savedCount})</span>
            </button>

            <button
              onClick={onOpenSubmitModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Quick Search Bar & Context sub-strip */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past papers, scholarships, roadmaps, university codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 w-full sm:w-auto justify-between sm:justify-end">
            <span className="truncate">Kenyan Universities Portal</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>UoN · JKUAT · KU · Strathmore · Moi</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-blue-700 font-medium">Free & Verified</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
