import React, { useState } from 'react';
import { LearningRoadmap } from '../../types';
import { 
  GraduationCap, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  Lightbulb, 
  BookOpen,
  Compass
} from 'lucide-react';

interface LearningResourcesProps {
  roadmaps: LearningRoadmap[];
  globalSearchQuery: string;
}

export const LearningResources: React.FC<LearningResourcesProps> = ({
  roadmaps,
  globalSearchQuery,
}) => {
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const toggleModule = (roadmapId: string, moduleIndex: number) => {
    const key = `${roadmapId}-${moduleIndex}`;
    setCompletedModules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const domains = ['ALL', 'Software Engineering', 'Data & Artificial Intelligence', 'Personal Finance & Economics', 'Career & Professional Growth'];

  const filteredRoadmaps = roadmaps.filter((rm) => {
    if (selectedDomain !== 'ALL' && rm.domain !== selectedDomain) {
      return false;
    }
    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase();
      const matchTitle = rm.title.toLowerCase().includes(q);
      const matchDesc = rm.description.toLowerCase().includes(q);
      const matchDomain = rm.domain.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDomain) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Free Skill Pathways & Certifications
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Curated Student Learning Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Zero-cost, step-by-step curricula to master software engineering, data science, personal finance, and career readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Self-Paced · Zero Paywalls</span>
        </div>
      </div>

      {/* Domain Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {domains.map((dom) => {
          const isActive = selectedDomain === dom;
          return (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dom === 'ALL' ? 'All Skill Domains' : dom}
            </button>
          );
        })}
      </div>

      {/* Roadmaps List */}
      <div className="space-y-8">
        {filteredRoadmaps.map((roadmap) => {
          // Calculate completion percentage
          const totalModules = roadmap.modules.length;
          const completedCount = roadmap.modules.filter((_, idx) => completedModules[`${roadmap.id}-${idx}`]).length;
          const percent = Math.round((completedCount / totalModules) * 100);

          return (
            <div
              key={roadmap.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Header section of Roadmap */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-blue-700">{roadmap.domain}</span>
                      <span aria-hidden="true">·</span>
                      <span>{roadmap.level} Level</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{roadmap.duration}</span>
                      </span>
                      {roadmap.certificateOffered && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            <span>Free Certificate Included</span>
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {roadmap.title}
                    </h2>
                  </div>

                  {/* Progress Meter */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 min-w-[200px]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Your Progress</span>
                      <span className="font-mono font-bold text-blue-700 tabular-nums">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="text-right text-[11px] text-slate-400 mt-1 font-mono">
                      {completedCount} of {totalModules} modules finished
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-4">
                  {roadmap.description}
                </p>

                {/* Local Career Tip Callout */}
                <div className="bg-blue-50/70 border border-blue-200/60 rounded-lg p-3.5 text-xs text-blue-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-blue-900">Kenyan Student Career Edge: </strong>
                    <span className="leading-relaxed">{roadmap.kenyanRelevanceTip}</span>
                  </div>
                </div>
              </div>

              {/* Modules breakdown */}
              <div className="p-6 bg-slate-50/40">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Curriculum Modules & Verified Course Materials
                </div>

                <div className="space-y-2.5">
                  {roadmap.modules.map((mod, index) => {
                    const isDone = Boolean(completedModules[`${roadmap.id}-${index}`]);

                    return (
                      <div
                        key={index}
                        className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-4 ${
                          isDone
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleModule(roadmap.id, index)}
                            className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                            aria-label={isDone ? 'Mark module as incomplete' : 'Mark module as complete'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                {mod.title}
                              </h4>
                              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                {mod.freeStatus}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {mod.description}
                            </p>
                          </div>
                        </div>

                        <a
                          href={mod.link}
                          target={mod.link.startsWith('#') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          <span>Open Resource</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
