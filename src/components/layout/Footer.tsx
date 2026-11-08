import React from 'react';
import { SectionType } from '../../types';

interface FooterProps {
  setActiveSection: (sec: SectionType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                S
              </span>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">SomaHub Kenya</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              The centralized academic, opportunity, and career vault for Kenyan university and TVET students.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Academic Vault</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('academic')}
                  className="hover:text-blue-700 transition-colors"
                >
                  Past Examination Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('academic')}
                  className="hover:text-blue-700 transition-colors"
                >
                  Lecture Revision Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('academic')}
                  className="hover:text-blue-700 transition-colors"
                >
                  Marking Schemes & Rubrics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Career & Tools</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('opportunities')}
                  className="hover:text-blue-700 transition-colors"
                >
                  NITA Attachment Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('tools')}
                  className="hover:text-blue-700 transition-colors"
                >
                  Kenyan GPA Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('tools')}
                  className="hover:text-blue-700 transition-colors"
                >
                  Attachment CV Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('tools')}
                  className="hover:text-blue-700 transition-colors"
                >
                  HELB Semester Budget (KES)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Partner Campuses</h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-2">
              UoN · JKUAT · KU · Strathmore · Moi · Egerton · TUK · USIU-Africa
            </p>
            <div className="text-[11px] text-blue-700 font-medium">
              Free & Open Access for All Comrades
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} SomaHub Kenya. Developed for university and college students nationwide.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified Educational Resources</span>
            <span aria-hidden="true">·</span>
            <span>Made for East African Comrades</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
