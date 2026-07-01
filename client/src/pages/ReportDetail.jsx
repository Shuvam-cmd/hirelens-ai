import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  ArrowLeft, BrainCircuit, CheckCircle2, AlertTriangle, HelpCircle, 
  ChevronRight, Sparkles, Award, FileText, BadgeCheck, Activity,
  ChevronDown, MessageSquare
} from 'lucide-react';
import { getReportByIdApi } from '../services/api';
import { Toast } from '../components/Toast';

export const ReportDetail = ({ theme, toggleTheme }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('scores'); // scores | gaps | rewrites | coach
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportByIdApi(id);
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Failed to locate or load analysis report logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg text-white flex flex-col items-center justify-center p-8 text-center font-sans">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-brand-border" />
          <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Loading analytics matrix...</span>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-brand-bg text-white flex flex-col items-center justify-center p-8 text-center font-sans">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-lg font-display font-extrabold tracking-tight">Report Matrix Error</h3>
        <p className="text-xs text-brand-text-sec mt-1 max-w-sm">{error || "Report not found."}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 px-5 py-3 rounded-xl text-xs font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all cursor-pointer shadow-lg shadow-gold/5"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const { reportData } = report;
  const scores = reportData?.scores || {};
  const skillsAnalysis = reportData?.skillsAnalysis || {};
  const suggestions = reportData?.suggestions || {};
  const recommendations = reportData?.recommendations || {};
  const interviewQuestions = reportData?.interviewQuestions || [];

  // Prepare chart data for Recharts
  const sectionScoresData = [
    { name: 'Overall', score: scores.overall || 75 },
    { name: 'Skills', score: scores.skills || 75 },
    { name: 'Exp', score: scores.experience || 75 },
    { name: 'Projects', score: scores.projects || 75 },
    { name: 'Keywords', score: scores.keywords || 75 },
    { name: 'Format', score: scores.formatting || 75 }
  ];

  const toggleQuestion = (index) => {
    if (expandedQuestionIndex === index) {
      setExpandedQuestionIndex(null);
    } else {
      setExpandedQuestionIndex(index);
    }
  };

  const isDark = theme === 'dark';

  // Dynamic ATS Score Color logic: Green for Excellent, Gold for Average, Red for Poor
  const getScoreColor = (score) => {
    if (score >= 80) return '#22C55E'; // Excellent (Green)
    if (score >= 50) return '#F5C542'; // Average (Gold)
    return '#EF4444'; // Poor (Red)
  };

  const currentScoreColor = getScoreColor(scores.overall || 75);

  return (
    <div id="report-detail" className={`min-h-screen ${isDark ? 'bg-brand-bg text-white' : 'bg-stone-50 text-stone-900'} transition-colors duration-300 pb-16 font-sans relative`}>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.03] pointer-events-none" />

      {/* Header Banner Bar */}
      <header className={`relative z-10 max-w-7xl mx-auto px-6 py-6 border-b flex items-center justify-between ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isDark 
              ? 'border-brand-border bg-brand-input text-brand-text-sec hover:text-white hover:border-gold/30' 
              : 'border-stone-200 bg-white text-stone-600 hover:text-stone-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex items-center gap-2.5">
          <BrainCircuit className="w-6 h-6 text-gold" />
          <span className={`font-display font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            HireLens AI Analytics
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: OVERVIEW SCORE BOARD */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          <div className={`border rounded-3xl p-6 flex flex-col items-center text-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
            <span className="text-[10px] font-bold text-gold font-mono tracking-widest uppercase">ATS ALIGNMENT SCORE</span>
            
            {/* Circular Progress Indicator */}
            <div className="relative w-44 h-44 flex items-center justify-center my-6">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="76" stroke={isDark ? '#222222' : '#e5e7eb'} strokeWidth="10" fill="transparent" />
                <circle 
                  cx="88" 
                  cy="88" 
                  r="76" 
                  stroke={currentScoreColor} 
                  strokeWidth="10" 
                  strokeDasharray="477" 
                  strokeDashoffset={477 - (477 * (scores.overall || 75)) / 100} 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              <div className="text-center">
                <span className={`text-4xl font-display font-black tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {scores.overall || 75}%
                </span>
                <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest font-sans mt-0.5">ALIGNED</p>
              </div>
            </div>

            <h3 className={`font-display font-extrabold text-lg ${isDark ? 'text-white' : 'text-stone-900'}`}>{report.resumeName}</h3>
            <span className="text-[10px] text-brand-text-muted font-mono mt-1">Processed: {new Date(report.createdAt).toLocaleDateString()}</span>
            
            <div className={`border-t w-full pt-4 mt-6 flex justify-around ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
              <div>
                <span className="text-xs font-mono text-emerald-500 font-bold">{scores.skills || 75}%</span>
                <p className="text-[9px] text-brand-text-muted uppercase font-sans font-bold">Skills</p>
              </div>
              <div className={`w-px h-6 ${isDark ? 'bg-brand-border' : 'bg-stone-100'}`} />
              <div>
                <span className="text-xs font-mono text-emerald-500 font-bold">{scores.experience || 75}%</span>
                <p className="text-[9px] text-brand-text-muted uppercase font-sans font-bold">Experience</p>
              </div>
              <div className={`w-px h-6 ${isDark ? 'bg-brand-border' : 'bg-stone-100'}`} />
              <div>
                <span className="text-xs font-mono text-emerald-500 font-bold">{scores.keywords || 75}%</span>
                <p className="text-[9px] text-brand-text-muted uppercase font-sans font-bold">Keywords</p>
              </div>
            </div>
          </div>

          {/* Quick Strengths / Weaknesses summary */}
          <div className={`border rounded-3xl p-6 ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
            <h4 className={`font-display font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-800'}`}>
              <Activity className="w-4 h-4 text-gold" />
              Executive Alignment Summary
            </h4>
            <p className={`font-sans text-xs leading-relaxed italic ${isDark ? 'text-brand-text-sec' : 'text-stone-650'}`}>
              "{reportData.summary}"
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL TABS PANEL (2/3 GRID) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Nav Tab Controls */}
          <div className={`flex border p-1.5 rounded-2xl ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
            {['scores', 'gaps', 'rewrites', 'coach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center rounded-xl font-sans text-xs font-bold cursor-pointer capitalize transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-gold text-brand-bg shadow-lg font-extrabold' 
                    : isDark
                      ? 'text-brand-text-sec hover:text-white hover:bg-brand-input'
                      : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tab === 'scores' && 'Score Breakdown'}
                {tab === 'gaps' && 'Skill Gaps & RAG'}
                {tab === 'rewrites' && 'Suggestions & Rewrites'}
                {tab === 'coach' && 'Interview Coach'}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <div className={`border rounded-3xl p-8 min-h-[30rem] ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
            
            {/* SUB-TAB 1: SCORES BREAKDOWN */}
            {activeTab === 'scores' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className={`font-display font-extrabold text-lg flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-stone-950'}`}>
                    <BadgeCheck className="w-5 h-5 text-gold" />
                    Interactive Score Analysis
                  </h3>
                  <p className={`font-sans text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                    A comprehensive parsing analysis comparing standard scoring pillars. Strong engineering resumes require uniform balances across all sections.
                  </p>
                </div>

                {/* Recharts BarChart using custom palette */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectionScoresData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#222222' : '#e5e7eb'} />
                      <XAxis dataKey="name" stroke={isDark ? '#7a7a7a' : '#64748b'} fontSize={11} fontStyle="bold" />
                      <YAxis stroke={isDark ? '#7a7a7a' : '#64748b'} fontSize={11} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#161616' : '#ffffff', 
                          borderColor: isDark ? '#2a2a2a' : '#e5e7eb', 
                          borderRadius: '12px',
                          color: isDark ? '#ffffff' : '#000000'
                        }}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {sectionScoresData.map((entry, index) => {
                          const scoreColor = index === 0 ? '#F5C542' : '#22C55E';
                          return <Cell key={`cell-${index}`} fill={scoreColor} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Details list of strengths and weaknesses */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                  <div>
                    <span className="text-xs font-bold text-emerald-500 font-sans block uppercase tracking-wider mb-2.5">Pillar Strengths</span>
                    <ul className="space-y-2">
                      {reportData.strengths?.map((str, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-xs font-sans ${isDark ? 'text-brand-text-sec' : 'text-stone-650'}`}>
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          {str}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-500 font-sans block uppercase tracking-wider mb-2.5">Detected Gaps</span>
                    <ul className="space-y-2">
                      {reportData.weaknesses?.map((weak, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-xs font-sans ${isDark ? 'text-brand-text-sec' : 'text-stone-650'}`}>
                          <AlertTriangle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                          {weak}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: SKILLS GAP ANALYSIS */}
            {activeTab === 'gaps' && (
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className={`font-display font-extrabold text-lg flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-stone-950'}`}>
                    <Sparkles className="w-5 h-5 text-gold" />
                    Skills Alignment Matrix
                  </h3>
                  <p className={`font-sans text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                    Comparing technical criteria from the Job Description against the parsing fragments retrieved by our selective RAG similarity filter.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Matching skills block */}
                  <div className={`border p-5 rounded-2xl ${isDark ? 'bg-brand-input border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className="text-xs font-bold text-emerald-500 font-sans uppercase block tracking-wider mb-3">Detected matching skills</span>
                    <div className="flex flex-wrap gap-2">
                      {skillsAnalysis.detectedSkills?.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold font-sans">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing skills block */}
                  <div className={`border p-5 rounded-2xl ${isDark ? 'bg-brand-input border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className="text-xs font-bold text-rose-500 font-sans uppercase block tracking-wider mb-3">Missing required credentials</span>
                    <div className="flex flex-wrap gap-2">
                      {skillsAnalysis.missingSkills?.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-bold font-sans">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keyword Density List table */}
                <div className={`border-t pt-6 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                  <span className={`text-xs font-bold font-sans uppercase tracking-wider block mb-4 ${isDark ? 'text-white' : 'text-stone-850'}`}>Core Keywords Density Checker</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
                          <th className="py-2.5 font-bold text-brand-text-muted uppercase">Target Keyword</th>
                          <th className="py-2.5 font-bold text-brand-text-muted uppercase">Detected Count</th>
                          <th className="py-2.5 font-bold text-brand-text-muted uppercase text-right">Maturity Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {skillsAnalysis.keywordDensity?.map((density, idx) => (
                          <tr key={idx} className={`border-b hover:bg-gold/[0.02] transition-colors ${isDark ? 'border-brand-border/40' : 'border-stone-100'}`}>
                            <td className={`py-3 font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>{density.keyword}</td>
                            <td className="py-3 font-mono text-brand-text-muted font-bold">{density.count}x</td>
                            <td className="py-3 text-right">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                                density.density === 'High' 
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                  : density.density === 'Medium'
                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                    : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                              }`}>
                                {density.density}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 3: SUGGESTIONS & REWRITES */}
            {activeTab === 'rewrites' && (
              <div className="flex flex-col gap-8 font-sans">
                <div>
                  <h3 className={`font-display font-extrabold text-lg flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-stone-950'}`}>
                    <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                    Resume Bullet Point Upgrade Center
                  </h3>
                  <p className={`font-sans text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                    Improve active verbs and quantify outcomes. We've transformed weak phrasing into powerful, high-impact statements that capture recruiter attention.
                  </p>
                </div>

                {/* Side by side improvements */}
                <div className="flex flex-col gap-6">
                  {suggestions.bulletPointImprovements?.map((imp, idx) => (
                    <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-4 border p-5 rounded-2xl ${isDark ? 'bg-brand-input border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                      <div>
                        <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1.5">Original Phrasing</span>
                        <p className={`text-xs italic p-3 rounded-xl border ${isDark ? 'bg-brand-bg border-brand-border/60 text-brand-text-sec' : 'bg-white border-stone-150 text-stone-500'}`}>
                          "{imp.original}"
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1.5">AI Optimized Phrasing</span>
                        <p className={`text-xs p-3 rounded-xl border leading-relaxed font-bold ${isDark ? 'bg-gold/[0.03] border-gold/25 text-white' : 'bg-gold/[0.05] border-gold/30 text-stone-800'}`}>
                          "{imp.improved}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paragraph rewrites suggestions */}
                <div className={`border-t pt-6 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wider block mb-3.5 ${isDark ? 'text-white' : 'text-stone-850'}`}>SaaS Profile Summary Refactoring</span>
                  <div className="space-y-3">
                    {suggestions.rewrites?.map((rewrite, idx) => (
                      <p key={idx} className={`text-xs leading-relaxed p-4 border rounded-xl ${isDark ? 'bg-brand-bg border-brand-border text-brand-text-sec' : 'bg-stone-50 border-stone-150 text-stone-600'}`}>
                        {rewrite}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Certifications and Recommended Projects */}
                <div className={`border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                  <div>
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2 mb-3.5">
                      <Award className="w-4 h-4 text-gold" />
                      Recommended Certifications
                    </h4>
                    <ul className="space-y-2.5">
                      {recommendations.certifications?.map((cert, i) => (
                        <li key={i} className={`flex items-start gap-2 text-xs ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
                          <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2 mb-3.5">
                      <BrainCircuit className="w-4 h-4 text-gold" />
                      Portfolio Expansion Projects
                    </h4>
                    <ul className="space-y-2.5">
                      {recommendations.projects?.map((proj, i) => (
                        <li key={i} className={`flex items-start gap-2 text-xs ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
                          <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                          {proj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: INTERVIEW COACH */}
            {activeTab === 'coach' && (
              <div className="flex flex-col gap-8 font-sans">
                <div>
                  <h3 className={`font-display font-extrabold text-lg flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-stone-950'}`}>
                    <MessageSquare className="w-5 h-5 text-gold" />
                    Interactive Interview Preparations
                  </h3>
                  <p className={`font-sans text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                    Custom behavioral and technology questions generated dynamically based on matching resume gaps and target requirements. Click to reveal ideal responses.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {interviewQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestionIndex === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                          isExpanded 
                            ? isDark 
                              ? 'bg-gold/[0.02] border-gold/30 shadow-md' 
                              : 'bg-gold/[0.04] border-gold/45 shadow-sm'
                            : isDark
                              ? 'bg-brand-input border-brand-border hover:bg-brand-input/80'
                              : 'bg-stone-50 border-stone-200 hover:bg-stone-100/50'
                        }`}
                      >
                        {/* Accordion trigger line */}
                        <div 
                          onClick={() => toggleQuestion(idx)}
                          className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${
                              q.difficulty === 'Hard' 
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                                : q.difficulty === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            }`}>
                              {q.difficulty}
                            </span>
                            <span className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-stone-850'}`}>{q.question}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-brand-text-muted transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Accordion content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`border-t px-6 py-4 text-xs leading-relaxed ${
                                isDark ? 'border-brand-border bg-brand-bg/40 text-brand-text-sec' : 'border-stone-150 bg-white text-stone-600'
                              }`}
                            >
                              <strong className="text-emerald-500 block mb-1.5 font-bold">Ideal Context Response Formulation:</strong>
                              {q.idealResponse}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

