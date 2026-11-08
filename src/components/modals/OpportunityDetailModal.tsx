import React from 'react';
import { Opportunity } from '../../types';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{opportunity.organization}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-blue-700 font-semibold">{opportunity.type}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{opportunity.location}</span>
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {opportunity.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title="Bookmark opportunity"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Key Stipend / Remuneration Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-800 font-medium">Stipend & Compensation</div>
              <div className="text-base font-bold text-emerald-950 font-mono mt-0.5">
                {opportunity.stipendOrCoverage}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Application Deadline</div>
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{opportunity.deadline}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Role & Program Overview
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility Requirements */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Eligibility & Application Criteria
            </h3>
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {opportunity.eligibility.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kenyan Application Checklist Callout */}
          <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl space-y-2 text-xs text-blue-950">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Application Checklist for Kenyan University Students:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
              <li>Official introductory letter signed by your faculty dean or attachment coordinator.</li>
              <li>National Identification Card (Kitambulisho) and University Student ID.</li>
              <li>NITA tripartite attachment agreement forms (if applying for industrial attachment).</li>
              <li>Valid Student Personal Accident Cover (usually KES 500-1,000 from Jubilee, CIC, or Britam).</li>
              <li>Updated ATS-formatted student CV highlighting university projects.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Verified official posting · Direct link to portal
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <a
              href={opportunity.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
