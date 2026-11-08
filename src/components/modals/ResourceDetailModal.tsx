import React, { useState } from 'react';
import { AcademicResource } from '../../types';
import { 
  X, 
  Download, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Calendar, 
  User, 
  Bookmark, 
  BookOpen,
  HelpCircle
} from 'lucide-react';

interface ResourceDetailModalProps {
  resource: AcademicResource | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!resource) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    const blobContent = `==========================================================
${resource.university.toUpperCase()} UNIVERSITY - FACULTY OF ${resource.faculty.toUpperCase()}
COURSE: ${resource.courseCode} - ${resource.courseTitle.toUpperCase()}
ACADEMIC YEAR: ${resource.academicYear} | YEAR ${resource.yearOfStudy} SEMESTER ${resource.semester}
DOCUMENT TYPE: ${resource.type.toUpperCase()}
==========================================================

SUMMARY & SCOPE:
${resource.summary}

KEY EXAM TOPICS:
${resource.keyTopics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

SAMPLE EXAMINATION QUESTIONS & RUBRICS:
${resource.sampleQuestions ? resource.sampleQuestions.map((q, i) => `[Q${i + 1}] ${q}`).join('\n\n') : 'Complete examination questions and verified marking schemes available.'}

Contributed and verified via SomaHub Kenyan University Student Network.
Contributor: ${resource.contributor}
==========================================================`;

    const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.university}_${resource.courseCode.replace(/\s+/g, '_')}_${resource.academicYear.replace('/', '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-bold text-blue-900">{resource.university}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono font-bold text-slate-800">{resource.courseCode}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Year {resource.yearOfStudy} Semester {resource.semester}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 font-medium">Verified Paper</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {resource.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title="Bookmark"
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
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full past paper & marking scheme downloaded. Ready for offline revision.</span>
            </div>
          )}

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Syllabus Summary & Purpose
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {resource.summary}
            </p>
          </div>

          {/* Exam Scope / Key Topics */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Key Exam Tested Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {resource.keyTopics.map((topic, idx) => (
                <div key={idx} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium">
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Sample Examination Questions */}
          {resource.sampleQuestions && resource.sampleQuestions.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Sample Exam Questions & Marking Structure</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-slate-700">
                {resource.sampleQuestions.map((q, i) => (
                  <div key={i} className="p-2.5 bg-white rounded border border-slate-200/80 leading-relaxed">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification & Contributor Info */}
          <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Contributed by: <strong className="text-slate-900">{resource.contributor}</strong></span>
            </div>
            <span className="font-mono text-slate-500 tabular-nums">{resource.downloadsCount.toLocaleString()} Comrades Revised</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Format: {resource.fileFormat} · Size: {resource.fileSize}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Revision File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
