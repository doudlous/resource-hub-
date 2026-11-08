import React from 'react';
import { SectionType } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Compass, 
  Wrench, 
  Users2, 
  Bookmark, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeSection: SectionType;
  setActiveSection: (sec: SectionType) => void;
  academicCount: number;
  opportunitiesCount: number;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  academicCount,
  opportunitiesCount,
  savedCount,
}) => {
  const mainNavItems = [
    {
      id: 'overview' as SectionType,
      label: 'Hub Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'academic' as SectionType,
      label: 'Past Papers & Notes',
      icon: BookOpen,
      badge: academicCount,
    },
    {
      id: 'opportunities' as SectionType,
      label: 'Opportunities Board',
      icon: Briefcase,
      badge: opportunitiesCount,
    },
    {
      id: 'learning' as SectionType,
      label: 'Free Learning Tracks',
      icon: Compass,
      badge: null,
    },
    {
      id: 'tools' as SectionType,
      label: 'Student Tools (GPA/CV)',
      icon: Wrench,
      badge: null,
    },
    {
      id: 'community' as SectionType,
      label: 'Events & Comrade Q&A',
      icon: Users2,
      badge: null,
    },
    {
      id: 'saved' as SectionType,
      label: 'My Saved Locker',
      icon: Bookmark,
      badge: savedCount,
    },
  ];

  const quickLinks = [
    { label: 'Higher Education (HEF)', url: 'https://www.hef.co.ke' },
    { label: 'KUCCPS Student Portal', url: 'https://students.kuccps.net' },
    { label: 'HELB Loans Portal', url: 'https://www.helb.co.ke' },
    { label: 'NITA Industrial Training', url: 'https://www.nita.go.ke' },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 hidden lg:flex flex-col justify-between min-h-[calc(100vh-64px)] p-4">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Navigation
          </div>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== null && item.badge > 0 && (
                  <span
                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Kenyan Portals Direct Links */}
        <div className="space-y-1 pt-4 border-t border-slate-100">
          <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>National Portals</span>
          </div>

          <div className="space-y-1">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                <span className="truncate">{link.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Comrade Info Box */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100/80 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-blue-900 flex items-center gap-1.5">
          <span>SomaHub Kenya</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Open student initiative connecting 18k+ comrades in Nairobi, Juja, Eldoret, Kisumu & beyond.
        </p>
      </div>
    </aside>
  );
};
