import React, { useState, useMemo } from 'react';
import { Opportunity, OpportunityType } from '../../types';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  ArrowUpRight, 
  Bookmark, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

interface OpportunitiesBoardProps {
  opportunities: Opportunity[];
  savedResourceIds: string[];
  toggleSaveResource: (id: string) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
  globalSearchQuery: string;
}

export const OpportunitiesBoard: React.FC<OpportunitiesBoardProps> = ({
  opportunities,
  savedResourceIds,
  toggleSaveResource,
  onSelectOpportunity,
  globalSearchQuery,
}) => {
  const [selectedType, setSelectedType] = useState<OpportunityType | 'ALL'>('ALL');
  const [onlyPaid, setOnlyPaid] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = globalSearchQuery || localSearch;

  const opportunityTypes: (OpportunityType | 'ALL')[] = [
    'ALL',
    'Scholarship',
    'Industrial Attachment',
    'Internship',
    'Graduate Trainee',
    'Hackathon',
    'Bursary',
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      if (selectedType !== 'ALL' && item.type !== selectedType) {
        return false;
      }
      if (onlyPaid && !item.isPaidOrFunded) {
        return false;
      }
      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesOrg = item.organization.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTarget = item.targetStudents.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrg && !matchesLoc && !matchesDesc && !matchesTarget) {
          return false;
        }
      }
      return true;
    });
  }, [opportunities, selectedType, onlyPaid, activeSearch]);

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Career & Funding Launchpad
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Kenyan Student Opportunities Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Curated corporate internships, NITA-approved industrial attachments, competitive scholarships, and student hackathons.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span>
            <strong className="text-slate-900 font-mono tabular-nums">{filteredOpportunities.length}</strong> opportunities open
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company (Safaricom, KenGen, KCB), role, or keyword..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none bg-slate-50 px-3 py-2 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={onlyPaid}
              onChange={(e) => setOnlyPaid(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span>Paid / Funded Only</span>
          </label>
        </div>

        {/* Interactive Segmented Filter Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {opportunityTypes.map((type) => {
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {type === 'ALL' ? 'All Opportunities' : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center max-w-lg mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No opportunities match criteria</h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Try adjusting your search terms or unchecking the paid-only filter.
          </p>
          <button
            onClick={() => {
              setSelectedType('ALL');
              setOnlyPaid(false);
              setLocalSearch('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => {
            const isSaved = savedResourceIds.includes(opp.id);

            return (
              <div
                key={opp.id}
                onClick={() => onSelectOpportunity(opp)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Metadata Row (Strictly unboxed text with separators, ZERO static pills) */}
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{opp.organization}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-blue-700 font-semibold">{opp.type}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{opp.location}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveResource(opp.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {opp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {opp.description}
                  </p>

                  {/* Eligibility Highlights */}
                  <div className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Eligibility & Audience: </span>
                    <span>{opp.targetStudents}</span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-emerald-700 flex items-center gap-1">
                      <span>{opp.stipendOrCoverage}</span>
                    </div>
                    <div className="text-amber-800 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Closes {opp.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOpportunity(opp);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap"
                    >
                      <span>View Requirements & Apply</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
