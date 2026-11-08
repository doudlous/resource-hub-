import React from 'react';
import { SectionType, AcademicResource, Opportunity } from '../../types';
import { IMAGES } from '../../assets/images';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Calculator, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  FileText, 
  Building2,
  Calendar
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveSection: (sec: SectionType) => void;
  academicResources: AcademicResource[];
  opportunities: Opportunity[];
  savedResourceIds: string[];
  toggleSaveResource: (id: string) => void;
  onSelectResource: (res: AcademicResource) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  setActiveSection,
  academicResources,
  opportunities,
  savedResourceIds,
  toggleSaveResource,
  onSelectResource,
  onSelectOpportunity,
}) => {
  const featuredOpportunities = opportunities.filter((o) => o.featured || o.type === 'Scholarship').slice(0, 3);
  const recentPapers = academicResources.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero Spotlight Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
          {/* Left Column: Mission, Value proposition & direct triggers */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/70">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-3 tracking-wide uppercase">
                <span>The National Student Ecosystem</span>
                <span aria-hidden="true">·</span>
                <span>Kenyan Universities & TVETs</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 text-balance">
                Accelerate your university journey, from Year 1 to your dream career.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                Direct access to verified past examination papers, NITA attachment placements, 
                high-value scholarships, student finance tools, and hands-on developer roadmaps tailored for Kenyan campuses.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveSection('academic')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Past Papers</span>
              </button>

              <button
                onClick={() => setActiveSection('opportunities')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Opportunities</span>
              </button>

              <button
                onClick={() => setActiveSection('tools')}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>GPA & Budget Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-fidelity Campus Photo */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
            <img
              src={IMAGES.heroStudentBanner}
              alt="Kenyan university students collaborating on campus"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/60 flex items-center justify-between">
              <span>UoN · JKUAT · KU · Strathmore · Moi</span>
              <span className="font-mono text-emerald-400">100% Free Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Stats Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Verified Past Papers</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">1,480+</div>
          <div className="text-xs text-blue-700 mt-1 font-medium">9 Kenyan Universities</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Scholarships & Grants</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">KES 140M+</div>
          <div className="text-xs text-emerald-700 mt-1 font-medium">Undergrad & Attachment funding</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Free Tech & Career Tracks</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">42 Tracks</div>
          <div className="text-xs text-blue-700 mt-1 font-medium">Zero-cost certifications</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Active Comrades Reached</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">18,500+</div>
          <div className="text-xs text-indigo-700 mt-1 font-medium">Peer peer student network</div>
        </div>
      </div>

      {/* Quick Launchpad Buttons */}
      <div className="bg-blue-50/60 rounded-xl p-5 border border-blue-100">
        <div className="text-xs font-semibold uppercase text-blue-900 tracking-wider mb-3">
          Instant Student Utilities
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                GPA Calculator
              </div>
              <div className="text-xs text-slate-500">5.0 & 4.0 Kenyan grading</div>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('tools')}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Attachment CV Builder
              </div>
              <div className="text-xs text-slate-500">NITA-compliant layout</div>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('tools')}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                HELB Budget Planner
              </div>
              <div className="text-xs text-slate-500">Semester upkeep in KES</div>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('community')}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Campus Tech Events
              </div>
              <div className="text-xs text-slate-500">GDSC, iHub & hackathons</div>
            </div>
          </button>
        </div>
      </div>

      {/* Two-Column Section: Featured Opportunities & High-Yield Past Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Urgent Opportunities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Featured Student Opportunities</h2>
              <div className="text-xs text-slate-500">Scholarships, industrial attachments & internships</div>
            </div>
            <button
              onClick={() => setActiveSection('opportunities')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>View all ({opportunities.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {featuredOpportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => onSelectOpportunity(opp)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-medium text-slate-900">{opp.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-700 font-semibold">{opp.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{opp.location}</span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {opp.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveResource(opp.id);
                    }}
                    className={`p-2 rounded-lg transition-colors shrink-0 ${
                      savedResourceIds.includes(opp.id)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Save opportunity"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="text-emerald-700 font-semibold">{opp.stipendOrCoverage}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-700 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Closes {opp.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Verified Past Examination Papers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">High-Yield Past Papers</h2>
              <div className="text-xs text-slate-500">With complete marking schemes</div>
            </div>
            <button
              onClick={() => setActiveSection('academic')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>Explore papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPapers.map((res) => (
              <div
                key={res.id}
                onClick={() => onSelectResource(res)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-blue-900">{res.university}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-700 font-medium">{res.courseCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>Year {res.yearOfStudy} Sem {res.semester}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {res.title}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveResource(res.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      savedResourceIds.includes(res.id)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2.5 mt-2.5 border-t border-slate-100">
                  <span className="text-slate-600">{res.type} · {res.fileFormat}</span>
                  <span className="font-mono tabular-nums">{res.downloadsCount.toLocaleString()} downloads</span>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Bulletin Announcement Box */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-xl p-5 border border-blue-950 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" />
              <span>Kenyan Student Bulletin</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1.5">
              KUCCPS & HELB 2026/2027 Portal Update
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              First-time undergraduate applicants and continuing students can now check loan allocation batch status and submit appeals on the Higher Education Portal (hef.co.ke).
            </p>
            <a
              href="https://www.hef.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
            >
              <span>Visit Official HEF Portal</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
