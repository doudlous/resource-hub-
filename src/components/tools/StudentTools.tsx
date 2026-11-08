import React, { useState, useMemo } from 'react';
import { CourseGradeItem, BudgetItem } from '../../types';
import { 
  Calculator, 
  Coins, 
  FileText, 
  Timer, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  Check, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const StudentTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gpa' | 'budget' | 'cv' | 'timer'>('gpa');

  // ==========================================
  // TOOL 1: KENYAN GPA & DEGREE CLASSIFIER
  // ==========================================
  const [gradingScale, setGradingScale] = useState<'4.0' | '5.0'>('4.0');
  const [courses, setCourses] = useState<CourseGradeItem[]>([
    { id: '1', unitCode: 'CSC 211', unitName: 'Data Structures & Algorithms', creditHours: 3, score: 76 },
    { id: '2', unitCode: 'CSC 212', unitName: 'Database Management Systems', creditHours: 3, score: 71 },
    { id: '3', unitCode: 'MAT 201', unitName: 'Calculus III for Engineers', creditHours: 3, score: 64 },
    { id: '4', unitCode: 'EEE 210', unitName: 'Analog Electronics I', creditHours: 3, score: 68 },
    { id: '5', unitCode: 'CCS 010', unitName: 'Communication & Study Skills', creditHours: 2, score: 82 },
  ]);

  const addCourse = () => {
    const newId = Date.now().toString();
    setCourses((prev) => [
      ...prev,
      { id: newId, unitCode: `UNT ${prev.length + 1}01`, unitName: 'New Course Unit', creditHours: 3, score: 70 },
    ]);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseGradeItem, value: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Kenyan Grade Points converter based on standard Kenya University system:
  // 70 - 100%: A (4.0 on 4-scale, 5.0 on 5-scale)
  // 60 - 69%: B (3.0 on 4-scale, 4.0 on 5-scale)
  // 50 - 59%: C (2.0 on 4-scale, 3.0 on 5-scale)
  // 40 - 49%: D (1.0 on 4-scale, 2.0 on 5-scale)
  // < 40%: E (0.0 Fail)
  const calculateCourseGradePoint = (score: number, scale: '4.0' | '5.0') => {
    if (score >= 70) return scale === '4.0' ? 4.0 : 5.0;
    if (score >= 60) return scale === '4.0' ? 3.0 : 4.0;
    if (score >= 50) return scale === '4.0' ? 2.0 : 3.0;
    if (score >= 40) return scale === '4.0' ? 1.0 : 2.0;
    return 0.0;
  };

  const gpaStats = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;
    let totalWeightedPercentage = 0;

    courses.forEach((c) => {
      const credits = Number(c.creditHours) || 0;
      const score = Number(c.score) || 0;
      const gp = calculateCourseGradePoint(score, gradingScale);

      totalCredits += credits;
      totalPoints += credits * gp;
      totalWeightedPercentage += credits * score;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    const averageScore = totalCredits > 0 ? Math.round(totalWeightedPercentage / totalCredits) : 0;

    let classification = 'Pass';
    let classColor = 'text-slate-700';

    if (averageScore >= 70) {
      classification = 'First Class Honours';
      classColor = 'text-blue-700';
    } else if (averageScore >= 60) {
      classification = 'Second Class Honours (Upper Division)';
      classColor = 'text-emerald-700';
    } else if (averageScore >= 50) {
      classification = 'Second Class Honours (Lower Division)';
      classColor = 'text-amber-700';
    } else if (averageScore >= 40) {
      classification = 'Pass';
      classColor = 'text-slate-600';
    } else {
      classification = 'Fail / Retake Required';
      classColor = 'text-rose-700';
    }

    return { gpa, averageScore, totalCredits, classification, classColor };
  }, [courses, gradingScale]);

  // ==========================================
  // TOOL 2: HELB & CAMPUS MONTHLY BUDGET IN KES
  // ==========================================
  const [monthlyInflow, setMonthlyInflow] = useState<number>(18500);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 'b1', category: 'Hostel / Bedsitter Rent (Off-Campus)', allocatedKES: 7000, notes: 'Including water & electricity' },
    { id: 'b2', category: 'Food & Groceries (Cooking & Mess)', allocatedKES: 5500, notes: 'Approx KES 180 / day' },
    { id: 'b3', category: 'Safaricom Bundles & Campus Wi-Fi', allocatedKES: 1500, notes: 'Tunukiwa or weekly monthly bundle' },
    { id: 'b4', category: 'Printing, Stationery & Photocopying', allocatedKES: 800, notes: 'Past papers & assignment printing' },
    { id: 'b5', category: 'Transport (Matatu fare to campus)', allocatedKES: 1500, notes: 'Daily commuter budget' },
    { id: 'b6', category: 'Emergency Fund / Savings in MMF', allocatedKES: 1200, notes: 'CMA-regulated Money Market Fund' },
  ]);

  const totalBudgetOutflow = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + (Number(curr.allocatedKES) || 0), 0);
  }, [budgetItems]);

  const netBalance = monthlyInflow - totalBudgetOutflow;

  const updateBudgetItem = (id: string, amount: number) => {
    setBudgetItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, allocatedKES: amount } : item))
    );
  };

  // ==========================================
  // TOOL 3: ATTACHMENT CV BUILDER (NITA FORMAT)
  // ==========================================
  const [cvData, setCvData] = useState({
    fullName: 'Brian Kipchirchir Koech',
    email: 'brian.koech@students.uonbi.ac.ke',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    linkedin: 'linkedin.com/in/briankoech',
    university: 'University of Nairobi (UoN)',
    faculty: 'Faculty of Science & Technology',
    degree: 'Bachelor of Science in Computer Science',
    regNumber: 'P15/142981/2023',
    currentYear: 'Year 3, Semester 1',
    gpaTarget: 'First Class Honours (GPA 3.8 / 4.0)',
    careerObjective: 'Driven 3rd year Computer Science student seeking a 3-month NITA-authorized industrial attachment in software engineering. Skilled in TypeScript, React, and Python with hands-on experience integrating Kenyan payment APIs.',
    technicalSkills: 'JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, Git, Safaricom Daraja API',
    coursework: 'Data Structures & Algorithms, Database Systems, Object-Oriented Analysis, Computer Networks, Software Engineering Principles',
    projectTitle: 'KibandaPay - USSD & M-Pesa Merchant Tool',
    projectDesc: 'Developed a lightweight mobile inventory and M-Pesa reconciliation tool for local campus food vendors, reducing daily closing book calculation time by 80%.',
    referee1: 'Dr. Elijah Omwenga, Senior Lecturer, School of Computing & Informatics, UoN. Email: e.omwenga@uonbi.ac.ke',
    referee2: 'Prof. Peter Waiganjo, Chairman of Department, Computer Science, UoN. Email: pwaiganjo@uonbi.ac.ke',
  });

  const [copiedCv, setCopiedCv] = useState(false);

  const handleCopyCv = () => {
    const cvText = `${cvData.fullName.toUpperCase()}
Email: ${cvData.email} | Phone: ${cvData.phone} | Location: ${cvData.location}
LinkedIn: ${cvData.linkedin}

CAREER OBJECTIVE
${cvData.careerObjective}

ACADEMIC BACKGROUND
${cvData.university} - ${cvData.faculty}
${cvData.degree} (Reg: ${cvData.regNumber})
Status: ${cvData.currentYear} | Academic Standing: ${cvData.gpaTarget}

RELEVANT UNIVERSITY COURSEWORK
${cvData.coursework}

CORE TECHNICAL SKILLS
${cvData.technicalSkills}

KEY ACADEMIC & PRACTICAL PROJECTS
* ${cvData.projectTitle}:
  ${cvData.projectDesc}

ACADEMIC REFEREES
1. ${cvData.referee1}
2. ${cvData.referee2}`;

    navigator.clipboard.writeText(cvText);
    setCopiedCv(true);
    setTimeout(() => setCopiedCv(false), 2500);
  };

  // ==========================================
  // TOOL 4: STUDY TIMER & EXAM SIMULATOR
  // ==========================================
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'pomodoro' | 'shortBreak' | 'examBlock'>('pomodoro');
  const [studyNotes, setStudyNotes] = useState('Key formulas to memorize: AVL tree rotations, Dijkstra algorithm edge relaxation condition...');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const selectTimerMode = (mode: 'pomodoro' | 'shortBreak' | 'examBlock') => {
    setIsRunning(false);
    setSessionType(mode);
    if (mode === 'pomodoro') setTimerSeconds(25 * 60);
    if (mode === 'shortBreak') setTimerSeconds(5 * 60);
    if (mode === 'examBlock') setTimerSeconds(60 * 60); // 1-hour exam paper simulation
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-700 tracking-wide uppercase mb-1">
            Student Toolkit & Utilities
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Kenyan University Practical Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Built specifically for Kenyan university grading systems, HELB budgeting in KES, and NITA attachment CV formatting.
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('gpa')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'gpa'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>GPA & Degree Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'budget'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>HELB & Upkeep Budget (KES)</span>
        </button>

        <button
          onClick={() => setActiveTab('cv')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'cv'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Attachment CV Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('timer')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'timer'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>Exam Prep Simulator</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: GPA & DEGREE CLASSIFICATION CALCULATOR */}
      {/* ========================================================= */}
      {activeTab === 'gpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Table */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Course Units & Marks</h2>
                <div className="text-xs text-slate-500">Calculate cumulative GPA and honors classification</div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Grading Scheme:</span>
                <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setGradingScale('4.0')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      gradingScale === '4.0' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    4.0 Scale (Standard)
                  </button>
                  <button
                    onClick={() => setGradingScale('5.0')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      gradingScale === '5.0' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    5.0 Scale
                  </button>
                </div>
              </div>
            </div>

            {/* Course Units Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Unit Code</th>
                    <th className="py-2.5 px-3">Course Unit Title</th>
                    <th className="py-2.5 px-3 w-20 text-center">Units</th>
                    <th className="py-2.5 px-3 w-24 text-center">Score (%)</th>
                    <th className="py-2.5 px-3 w-20 text-center">Grade Point</th>
                    <th className="py-2.5 px-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {courses.map((course) => {
                    const gp = calculateCourseGradePoint(course.score, gradingScale);

                    return (
                      <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={course.unitCode}
                            onChange={(e) => updateCourse(course.id, 'unitCode', e.target.value)}
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 font-mono font-bold"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={course.unitName}
                            onChange={(e) => updateCourse(course.id, 'unitName', e.target.value)}
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-900"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="number"
                            min="1"
                            max="6"
                            value={course.creditHours}
                            onChange={(e) => updateCourse(course.id, 'creditHours', Number(e.target.value))}
                            className="w-14 text-center px-1.5 py-1 bg-white border border-slate-300 rounded text-slate-900 font-mono"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={course.score}
                            onChange={(e) => updateCourse(course.id, 'score', Number(e.target.value))}
                            className="w-16 text-center px-1.5 py-1 bg-white border border-slate-300 rounded text-slate-900 font-mono font-bold"
                          />
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-semibold text-blue-700">
                          {gp.toFixed(1)}
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Remove unit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={addCourse}
                className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Course Unit</span>
              </button>

              <div className="text-xs text-slate-500 font-mono">
                Total Semester Units: <strong className="text-slate-800">{gpaStats.totalCredits}</strong>
              </div>
            </div>
          </div>

          {/* Right: Results Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                Calculated Semester Performance
              </div>

              <div className="text-4xl font-extrabold text-blue-700 font-mono tabular-nums mb-1">
                {gpaStats.gpa} <span className="text-base font-normal text-slate-400">/ {gradingScale}</span>
              </div>

              <div className="text-xs text-slate-500 mb-4 font-mono">
                Weighted Mean Score: <strong className="text-slate-800 font-bold">{gpaStats.averageScore}%</strong>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Degree Honours Standing:</div>
                <div className={`text-base font-bold ${gpaStats.classColor}`}>
                  {gpaStats.classification}
                </div>
              </div>
            </div>

            {/* Kenyan University Grading Guide */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Kenyan Universities Classification Rubric</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>70% - 100% (Grade A)</span>
                <span className="font-semibold text-blue-700">First Class Honours</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>60% - 69% (Grade B)</span>
                <span className="font-semibold text-emerald-700">Second Class (Upper)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>50% - 59% (Grade C)</span>
                <span className="font-semibold text-amber-700">Second Class (Lower)</span>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span>40% - 49% (Grade D)</span>
                <span className="font-semibold text-slate-600">Pass</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: HELB & CAMPUS MONTHLY BUDGET IN KES */}
      {/* ========================================================= */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Campus Monthly Spending & Upkeep</h2>
                <div className="text-xs text-slate-500">Manage monthly HELB allocation and student expenses in KES</div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-500 whitespace-nowrap">Monthly Income / HELB:</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">KES</span>
                  <input
                    type="number"
                    value={monthlyInflow}
                    onChange={(e) => setMonthlyInflow(Number(e.target.value))}
                    className="w-32 pl-11 pr-2 py-1.5 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Budget rows */}
            <div className="space-y-3">
              {budgetItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900">{item.category}</div>
                    <div className="text-[11px] text-slate-500">{item.notes}</div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-mono text-slate-500">KES</span>
                    <input
                      type="number"
                      step="100"
                      value={item.allocatedKES}
                      onChange={(e) => updateBudgetItem(item.id, Number(e.target.value))}
                      className="w-28 px-2 py-1 text-xs font-mono font-bold bg-white border border-slate-300 rounded text-slate-900 text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Smart thrift advice */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-lg text-xs text-emerald-950 space-y-1.5">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Kenyan Student Financial Survival Tips:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-emerald-900">
                <li>Hostel groceries: Buying dry maize, beans, rice, and cooking oil in bulk from local open markets (Gikomba, Muthurwa, Marikiti) saves up to 45% compared to daily estate kiosks.</li>
                <li>Data bundles: Take advantage of Safaricom Tunukiwa night shift bundles or campus eduroam Wi-Fi rather than daytime hourly browsing.</li>
                <li>Money Market Funds: Put surplus semester upkeep into a regulated MMF (CIC, Sanlam, Stanbic) to earn ~11-13% annual interest instead of regular zero-interest bank accounts.</li>
              </ul>
            </div>
          </div>

          {/* Right: Net Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Monthly Cashflow Summary
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Total Upkeep / Inflow:</span>
                  <span className="font-mono font-bold text-slate-900">KES {monthlyInflow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Total Planned Outflows:</span>
                  <span className="font-mono font-bold text-slate-900">KES {totalBudgetOutflow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-900">Net Balance:</span>
                  <span className={`font-mono font-bold ${netBalance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    KES {netBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-lg text-xs font-medium ${netBalance >= 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {netBalance >= 0 ? (
                  <span>Great job! You have a surplus of KES {netBalance.toLocaleString()} to allocate toward an emergency buffer.</span>
                ) : (
                  <span>Warning: You are currently spending KES {Math.abs(netBalance).toLocaleString()} above your monthly budget! Consider cutting non-essential expenses.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ATTACHMENT CV BUILDER */}
      {/* ========================================================= */}
      {activeTab === 'cv' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form input */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">NITA Attachment & Internship Resume</h2>
              <div className="text-xs text-slate-500">Fill in your university credentials for instant East African employer compliance</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Student Name</label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number (+254)</label>
                <input
                  type="text"
                  value={cvData.phone}
                  onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">University Email</label>
                <input
                  type="email"
                  value={cvData.email}
                  onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  value={cvData.location}
                  onChange={(e) => setCvData({ ...cvData, location: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">University & Faculty</label>
                <input
                  type="text"
                  value={cvData.university}
                  onChange={(e) => setCvData({ ...cvData, university: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Degree Program</label>
                <input
                  type="text"
                  value={cvData.degree}
                  onChange={(e) => setCvData({ ...cvData, degree: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Registration Number</label>
                <input
                  type="text"
                  value={cvData.regNumber}
                  onChange={(e) => setCvData({ ...cvData, regNumber: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Career / Attachment Objective</label>
                <textarea
                  rows={3}
                  value={cvData.careerObjective}
                  onChange={(e) => setCvData({ ...cvData, careerObjective: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Technical Skills & Tools</label>
                <input
                  type="text"
                  value={cvData.technicalSkills}
                  onChange={(e) => setCvData({ ...cvData, technicalSkills: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Coursework Highlights</label>
                <input
                  type="text"
                  value={cvData.coursework}
                  onChange={(e) => setCvData({ ...cvData, coursework: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Clean Printable Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs font-sans text-xs text-slate-800 space-y-4 leading-relaxed">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="font-mono text-slate-400 text-[11px] uppercase tracking-wider">
                  Live ATS-Friendly Document Preview
                </div>
                <button
                  onClick={handleCopyCv}
                  className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  {copiedCv ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{copiedCv ? 'Copied to Clipboard' : 'Copy Text CV'}</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">{cvData.fullName}</h3>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {cvData.email} · {cvData.phone} · {cvData.location}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-900">Career Objective</h4>
                  <p className="mt-0.5 text-slate-600">{cvData.careerObjective}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-900">Education & Academic Status</h4>
                  <div className="font-semibold text-slate-900 mt-0.5">{cvData.university}</div>
                  <div className="text-slate-600">{cvData.degree} (Reg: {cvData.regNumber})</div>
                  <div className="text-slate-500 italic text-[11px]">{cvData.currentYear} · {cvData.gpaTarget}</div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-900">Technical Competencies</h4>
                  <p className="mt-0.5 text-slate-600">{cvData.technicalSkills}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-900">Academic Project Showcase</h4>
                  <div className="font-semibold text-slate-900 mt-0.5">{cvData.projectTitle}</div>
                  <p className="text-slate-600 text-[11px]">{cvData.projectDesc}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-blue-900">Academic Referees</h4>
                  <div className="text-[11px] text-slate-600 space-y-1 mt-0.5">
                    <div>1. {cvData.referee1}</div>
                    <div>2. {cvData.referee2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: EXAM PREP SIMULATOR */}
      {/* ========================================================= */}
      {activeTab === 'timer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => selectTimerMode('pomodoro')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  sessionType === 'pomodoro' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                25m Focus Block
              </button>
              <button
                onClick={() => selectTimerMode('shortBreak')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  sessionType === 'shortBreak' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                5m Quick Break
              </button>
              <button
                onClick={() => selectTimerMode('examBlock')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  sessionType === 'examBlock' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                60m Exam Simulation
              </button>
            </div>

            <div className="text-6xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
              {formatTimer(timerSeconds)}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold text-white shadow-sm transition-colors flex items-center gap-2 ${
                  isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Pause Timer' : 'Start Focus Session'}</span>
              </button>

              <button
                onClick={() => selectTimerMode(sessionType)}
                className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Session Revision Scratchpad</h3>
            <p className="text-xs text-slate-500">
              Jot down quick formulas, tricky definitions, and question outlines as you work through timed past papers.
            </p>

            <textarea
              rows={8}
              value={studyNotes}
              onChange={(e) => setStudyNotes(e.target.value)}
              placeholder="Write your study notes here..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
