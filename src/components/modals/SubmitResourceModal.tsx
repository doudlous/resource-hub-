import React, { useState } from 'react';
import { AcademicResource, UniversityCode, AcademicCategory, AcademicItemType } from '../../types';
import { UNIVERSITY_LIST, FACULTIES } from '../../data/mockData';
import { X, Upload, CheckCircle2, FileText } from 'lucide-react';

interface SubmitResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resource: AcademicResource) => void;
}

export const SubmitResourceModal: React.FC<SubmitResourceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [university, setUniversity] = useState<UniversityCode>('UoN');
  const [faculty, setFaculty] = useState<AcademicCategory>('Computer Science & IT');
  const [yearOfStudy, setYearOfStudy] = useState(2);
  const [semester, setSemester] = useState(1);
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [type, setType] = useState<AcademicItemType>('Past Exam Paper');
  const [contributor, setContributor] = useState('');
  const [summary, setSummary] = useState('');
  const [topicsInput, setTopicsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseCode.trim() || !courseTitle.trim()) return;

    setIsSubmitting(true);

    const keyTopics = topicsInput
      ? topicsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['General Examination Scope', 'Key Definitions', 'Formulas'];

    const newResource: AcademicResource = {
      id: `res-user-${Date.now()}`,
      title: title.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      courseTitle: courseTitle.trim(),
      university,
      faculty,
      yearOfStudy,
      semester,
      academicYear,
      type,
      fileFormat: 'PDF',
      fileSize: '1.9 MB',
      downloadsCount: 1,
      contributor: contributor.trim() || 'Comrade Contributor',
      verified: true,
      summary: summary.trim() || 'Verified past paper contributed by student community.',
      keyTopics,
      sampleQuestions: [
        'Question 1: Foundational theories and definitions based on approved university syllabus.',
        'Question 2: Analytical problem solving with complete marking scheme.'
      ]
    };

    setTimeout(() => {
      onSubmit(newResource);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Contribute an Academic Resource</h2>
            <div className="text-xs text-slate-500">Help fellow comrades access past papers & revision notes</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Resource Published to SomaHub!</h3>
            <p className="text-xs text-slate-600">
              Thank you for supporting fellow university students across Kenya. Your submission is now live!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Resource Title</label>
              <input
                type="text"
                required
                placeholder="e.g. CSC 211: Algorithms & Complexity Past Paper with Solutions"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSC 211"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Course Unit Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Structures"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Kenyan University</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value as UniversityCode)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {UNIVERSITY_LIST.filter((u) => u.code !== 'ALL').map((u) => (
                    <option key={u.code} value={u.code}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Discipline / Faculty</label>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value as AcademicCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {FACULTIES.filter((f) => f !== 'ALL').map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Year of Study</label>
                <select
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value={1}>Year 1</option>
                  <option value={2}>Year 2</option>
                  <option value={3}>Year 3</option>
                  <option value={4}>Year 4</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AcademicItemType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Past Exam Paper">Past Exam Paper</option>
                  <option value="Marking Scheme">Marking Scheme</option>
                  <option value="Lecture Revision Notes">Lecture Revision Notes</option>
                  <option value="Practical Lab Guide">Practical Lab Guide</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Contributor Name & Campus</label>
              <input
                type="text"
                placeholder="e.g. Dennis Mutua (TUK Main Campus)"
                value={contributor}
                onChange={(e) => setContributor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Key Examination Topics (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. AVL Trees, Dynamic Programming, Big O"
                value={topicsInput}
                onChange={(e) => setTopicsInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Summary / Advice</label>
              <textarea
                rows={2}
                placeholder="Brief advice on which questions repeat often or what to watch out for..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>{isSubmitting ? 'Uploading...' : 'Publish Resource'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
