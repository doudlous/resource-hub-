import React, { useState, useMemo } from 'react';
import { AcademicResource, UniversityCode, AcademicCategory, AcademicItemType } from '../../types';
import { UNIVERSITY_LIST, FACULTIES } from '../../data/mockData';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Eye, 
  Bookmark, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AcademicResourcesProps {
  resources: AcademicResource[];
  savedResourceIds: string[];
  toggleSaveResource: (id: string) => void;
  onSelectResource: (res: AcademicResource) => void;
  globalSearchQuery: string;
}

export const AcademicResources: React.FC<AcademicResourcesProps> = ({
  resources,
  savedResourceIds,
  toggleSaveResource,
  onSelectResource,
  globalSearchQuery,
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityCode>('ALL');
  const [selectedFaculty, setSelectedFaculty] = useState<AcademicCategory>('ALL');
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<AcademicItemType | 'ALL'>('ALL');
  const [localSearch, setLocalSearch] = useState('');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const activeSearch = globalSearchQuery || localSearch;

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // University filter
      if (selectedUniversity !== 'ALL' && item.university !== selectedUniversity) {
        return false;
      }
      // Faculty filter
      if (selectedFaculty !== 'ALL' && item.faculty !== selectedFaculty) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'ALL' && item.yearOfStudy !== selectedYear) {
        return false;
      }
      // Type filter
      if (selectedType !== 'ALL' && item.type !== selectedType) {
        return false;
      }
      // Search term
      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCode = item.courseCode.toLowerCase().includes(query);
        const matchesCourse = item.courseTitle.toLowerCase().includes(query);
        const matchesUni = item.university.toLowerCase().includes(query);
        const matchesTopics = item.keyTopics.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCode && !matchesCourse && !matchesUni && !matchesTopics) {
          return false;
        }
      }
      return true;
    });
  }, [resources, selectedUniversity, selectedFaculty, selectedYear, selectedType, activeSearch]);

  const handleDownload = (e: React.MouseEvent, res: AcademicResource) => {
    e.stopPropagation();
    setDownloadSuccessId(res.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);

    // Create a mock downloadable text blob representing the exam paper syllabus
    const blobContent = `==========================================================
${res.university.toUpperCase()} UNIVERSITY - FACULTY OF ${res.faculty.toUpperCase()}
COURSE: ${res.courseCode} - ${res.courseTitle.toUpperCase()}
ACADEMIC YEAR: ${res.academicYear} | YEAR ${res.yearOfStudy} SEMESTER ${res.semester}
DOCUMENT TYPE: ${res.type.toUpperCase()}
==========================================================

SUMMARY & SCOPE:
${res.summary}

KEY EXAM TOPICS:
${res.keyTopics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

SAMPLE EXAMINATION QUESTIONS & RUBRICS:
${res.sampleQuestions ? res.sampleQuestions.map((q, i) => `[Q${i + 1}] ${q}`).join('\n\n') : 'Complete examination questions and verified marking schemes available in the interactive reader.'}

Contributed and verified via SomaHub Kenyan University Student Network.
Contributor: ${res.contributor}
==========================================================`;

    const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.university}_${res.courseCode.replace(/\s+/g, '_')}_${res.academicYear.replace('/', '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Academic Vault & Past Papers
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Verified University Past Papers & Lecture Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Peer-reviewed exam revisions, marking rubrics, and high-yield lecture summaries across Kenyan universities.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>
            Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredResources.length}</strong> of{' '}
            <span className="font-mono tabular-nums">{resources.length}</span> papers
          </span>
        </div>
      </div>

      {/* Filter Matrix Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* Search & University Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course code (e.g. CSC 211, EEE 2102), unit title, or topic..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="md:col-span-5">
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value as UniversityCode)}
              aria-label="Filter by university"
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            >
              {UNIVERSITY_LIST.map((uni) => (
                <option key={uni.code} value={uni.code}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-Filter Selectors: Faculty, Year, Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Faculty / Discipline</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value as AcademicCategory)}
              aria-label="Filter by faculty or discipline"
              className="w-full py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FACULTIES.map((fac) => (
                <option key={fac} value={fac}>
                  {fac === 'ALL' ? 'All Disciplines' : fac}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Year of Study</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              aria-label="Filter by year of study"
              className="w-full py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Years (Year 1 to 4+)</option>
              <option value="1">Year 1 (Freshman)</option>
              <option value="2">Year 2 (Sophomore)</option>
              <option value="3">Year 3 (Junior)</option>
              <option value="4">Year 4 & Final Year</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Material Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AcademicItemType | 'ALL')}
              aria-label="Filter by material type"
              className="w-full py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Resource Types</option>
              <option value="Past Exam Paper">Past Exam Paper</option>
              <option value="Marking Scheme">Marking Scheme</option>
              <option value="Lecture Revision Notes">Lecture Revision Notes</option>
              <option value="Practical Lab Guide">Practical Lab Guide</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Reset if filters active */}
        {(selectedUniversity !== 'ALL' || selectedFaculty !== 'ALL' || selectedYear !== 'ALL' || selectedType !== 'ALL' || activeSearch) && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Filters currently applied</span>
            <button
              onClick={() => {
                setSelectedUniversity('ALL');
                setSelectedFaculty('ALL');
                setSelectedYear('ALL');
                setSelectedType('ALL');
                setLocalSearch('');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessId && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Document revision pack downloaded successfully! Included past questions & verified rubrics.</span>
          </div>
          <span className="font-mono text-emerald-700">Ready for offline study</span>
        </div>
      )}

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center max-w-lg mx-auto">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No academic papers match your filters</h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Try broadening your search term or reset university and faculty filters to view all verified papers.
          </p>
          <button
            onClick={() => {
              setSelectedUniversity('ALL');
              setSelectedFaculty('ALL');
              setSelectedYear('ALL');
              setSelectedType('ALL');
              setLocalSearch('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => {
            const isSaved = savedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                onClick={() => onSelectResource(res)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Metadata Line (Strictly clean text with separators, ZERO static pills) */}
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-blue-900">{res.university}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono font-semibold text-slate-800">{res.courseCode}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>Year {res.yearOfStudy} Sem {res.semester}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveResource(res.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save paper'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    {res.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {res.summary}
                  </p>

                  {/* Key Topics List */}
                  <div className="text-xs text-slate-500 mb-4">
                    <span className="font-medium text-slate-700">Exam Scope: </span>
                    <span>{res.keyTopics.join(' · ')}</span>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700 font-medium">{res.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{res.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{res.downloadsCount.toLocaleString()} downloads</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResource(res);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={(e) => handleDownload(e, res)}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Get PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
