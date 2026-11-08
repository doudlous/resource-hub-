import React, { useState } from 'react';
import { AcademicResource, Opportunity } from '../../types';
import { Bookmark, FileText, Briefcase, Trash2, Eye, ArrowUpRight } from 'lucide-react';

interface SavedItemsViewProps {
  savedResourceIds: string[];
  academicResources: AcademicResource[];
  opportunities: Opportunity[];
  toggleSaveResource: (id: string) => void;
  onSelectResource: (res: AcademicResource) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const SavedItemsView: React.FC<SavedItemsViewProps> = ({
  savedResourceIds,
  academicResources,
  opportunities,
  toggleSaveResource,
  onSelectResource,
  onSelectOpportunity,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'papers' | 'opportunities'>('all');

  const savedPapers = academicResources.filter((r) => savedResourceIds.includes(r.id));
  const savedOpps = opportunities.filter((o) => savedResourceIds.includes(o.id));

  const totalSavedCount = savedPapers.length + savedOpps.length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Personal Study Locker
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Saved Resources & Pinned Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Fast offline access to your bookmarked past papers and priority application deadlines.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({totalSavedCount})
          </button>
          <button
            onClick={() => setFilterType('papers')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'papers' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Papers ({savedPapers.length})
          </button>
          <button
            onClick={() => setFilterType('opportunities')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'opportunities' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Opportunities ({savedOpps.length})
          </button>
        </div>
      </div>

      {totalSavedCount === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">Your saved locker is empty</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Click the bookmark icon on any past exam paper, scholarship, or internship to pin it here for rapid access.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Papers */}
          {(filterType === 'all' || filterType === 'papers') && savedPapers.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Saved Academic Papers ({savedPapers.length})
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedPapers.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-1.5">
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-bold text-blue-900">{res.university}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono font-bold text-slate-800">{res.courseCode}</span>
                        </div>

                        <button
                          onClick={() => toggleSaveResource(res.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-1">
                        {res.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {res.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{res.type} · {res.fileSize}</span>
                      <button
                        onClick={() => onSelectResource(res)}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Document</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opportunities */}
          {(filterType === 'all' || filterType === 'opportunities') && savedOpps.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Saved Opportunities & Applications ({savedOpps.length})
              </div>

              <div className="space-y-3">
                {savedOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-bold text-slate-900">{opp.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-700 font-semibold">{opp.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{opp.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {opp.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="text-emerald-700 font-semibold">{opp.stipendOrCoverage}</span>
                        <span className="text-amber-700 font-medium">Closes {opp.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleSaveResource(opp.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectOpportunity(opp)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
