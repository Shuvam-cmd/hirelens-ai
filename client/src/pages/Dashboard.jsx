import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Upload, BrainCircuit, Trash2, Calendar, 
  CheckCircle, History, User as UserIcon, LogOut, Sun, Moon,
  FileCheck, FileUp, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { analyzeResumeApi, getHistoryApi, deleteReportApi } from '../services/api';
import { Toast } from '../components/Toast';

export const Dashboard = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [viewTab, setViewTab] = useState('analyze'); // analyze | history | profile

  const fileInputRef = useRef(null);

  const loadingMessages = [
    "Establishing secure context channel with Google Gemini matrix...",
    "Executing PDF parsing algorithms to extract plain-text vectors...",
    "Chunking resume into semantic document clusters...",
    "Invoking 'gemini-embedding-2-preview' to generate high-dimensional vectors...",
    "Running Cosine Similarity matrix on your resume chunks against target Job Description...",
    "Selective RAG retrieval complete! Compiling top matching contexts...",
    "Feeding localized semantic context to 'gemini-3.5-flash' intelligence engine...",
    "Running formatting and ATS keyword density checks...",
    "Structuring certified JSON reports, suggestions, rewrite charts, and interview coach deck..."
  ];

  // Rotate loading messages while analyzing
  useEffect(() => {
    let interval;
    if (analyzing) {
      interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 3500);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  // Load history
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistoryApi();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      setToast({ message: 'Only PDF documents are supported for ATS scanning.', type: 'error' });
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setToast({ message: 'Document size exceeds maximum 5MB limit.', type: 'error' });
      return;
    }
    setFile(selectedFile);
    setToast({ message: `Successfully attached ${selectedFile.name}`, type: 'success' });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setToast({ message: 'Please upload your PDF resume first.', type: 'error' });
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      setToast({ message: 'Please provide a valid Job Description of at least 20 characters.', type: 'error' });
      return;
    }

    setAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const result = await analyzeResumeApi(formData);
      setToast({ message: 'ATS matrix scan complete! Loaded analytical score charts.', type: 'success' });
      
      // Navigate to report details page with reportId in query parameters
      setTimeout(() => {
        navigate(`/report/${result.reportId}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setToast({ message: err.response?.data?.error || 'Analysis process was interrupted. Check your backend.', type: 'error' });
      setAnalyzing(false);
    }
  };

  const handleDeleteHistory = (id, e) => {
    e.stopPropagation(); // Avoid triggering card click
    setDeleteTargetId(id);
  };

  const confirmDeleteHistory = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteReportApi(deleteTargetId);
      setToast({ message: 'Report removed from database logs.', type: 'success' });
      setDeleteTargetId(null);
      loadHistory();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to delete report.', type: 'error' });
      setDeleteTargetId(null);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div id="dashboard" className={`min-h-screen flex ${isDark ? 'bg-brand-bg text-white' : 'bg-stone-50 text-stone-900'} transition-colors duration-300 font-sans`}>
      
      {/* Sidebar navigation */}
      <aside className={`w-64 border-r flex flex-col justify-between p-6 shrink-0 ${isDark ? 'border-brand-border bg-brand-card' : 'border-stone-200 bg-white'}`}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <BrainCircuit className="w-6.5 h-6.5 text-gold" />
            <span className={`font-display font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
              HireLens AI
            </span>
          </div>

          <div className="flex flex-col gap-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
            <span className="px-3 mb-1.5">MAIN MATRIX</span>
            
            <button
              onClick={() => setViewTab('analyze')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-300 text-xs font-bold border ${
                viewTab === 'analyze' 
                  ? 'bg-gold text-brand-bg border-gold shadow-md font-extrabold' 
                  : isDark 
                    ? 'text-brand-text-sec border-transparent hover:text-white hover:bg-brand-input'
                    : 'text-stone-600 border-transparent hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Upload className="w-4 h-4 shrink-0" />
              SaaS Analyzer
            </button>

            <button
              onClick={() => setViewTab('history')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-300 text-xs font-bold border ${
                viewTab === 'history' 
                  ? 'bg-gold text-brand-bg border-gold shadow-md font-extrabold' 
                  : isDark 
                    ? 'text-brand-text-sec border-transparent hover:text-white hover:bg-brand-input'
                    : 'text-stone-600 border-transparent hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <History className="w-4 h-4 shrink-0" />
              Previous Scans ({history.length})
            </button>

            <button
              onClick={() => setViewTab('profile')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-300 text-xs font-bold border ${
                viewTab === 'profile' 
                  ? 'bg-gold text-brand-bg border-gold shadow-md font-extrabold' 
                  : isDark 
                    ? 'text-brand-text-sec border-transparent hover:text-white hover:bg-brand-input'
                    : 'text-stone-600 border-transparent hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <UserIcon className="w-4 h-4 shrink-0" />
              Candidate Profile
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`flex items-center justify-between border-t pt-4 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider font-sans">Toggle Theme</span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl cursor-pointer transition-colors ${isDark ? 'bg-brand-input text-gold hover:text-white' : 'bg-stone-100 text-stone-600 hover:text-stone-900'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer ${
              isDark 
                ? 'text-brand-text-muted hover:text-rose-400 hover:bg-rose-500/5' 
                : 'text-stone-500 hover:text-rose-600 hover:bg-rose-50'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            De-Authorize
          </button>
        </div>
      </aside>

      {/* Main content hub */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <header className={`flex items-center justify-between border-b pb-6 mb-8 ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
          <div>
            <h1 className={`font-display font-extrabold text-2xl tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
              {viewTab === 'analyze' && 'Resume RAG Analyzer'}
              {viewTab === 'history' && 'ATS Historical Reports Log'}
              {viewTab === 'profile' && 'Candidate Profile Settings'}
            </h1>
            <p className={`font-sans text-xs mt-1 ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
              Active User: <span className={`${isDark ? 'text-white' : 'text-stone-800'} font-bold`}>{user?.name} ({user?.email})</span>
            </p>
          </div>
          <div className={`flex items-center gap-2 font-mono text-[10px] px-3.5 py-1.5 rounded-lg border uppercase tracking-wider font-bold ${
            isDark 
              ? 'text-brand-text-muted bg-brand-input border-brand-border' 
              : 'text-stone-500 bg-white border-stone-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            AGENT CORE ONLINE
          </div>
        </header>

        {/* LOADING SCREEN */}
        {analyzing && (
          <div className="absolute inset-0 z-50 bg-brand-bg/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="relative w-24 h-24 mb-8">
              {/* Circular spinning beam loading */}
              <div className="absolute inset-0 rounded-full border-4 border-brand-border" />
              <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="w-8 h-8 text-gold animate-pulse" />
              </div>
            </div>
            
            <h2 className="font-display font-extrabold text-xl text-white tracking-tight mb-2 animate-pulse">
              Parsing & Running RAG Matrix Match
            </h2>
            
            <p className="font-mono text-xs text-gold max-w-lg mx-auto bg-brand-card border border-brand-border px-6 py-4 rounded-xl tracking-wide min-h-[4rem] flex items-center justify-center leading-relaxed">
              {loadingMessages[loadingMessageIndex]}
            </p>

            <div className="mt-8 flex gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* TAB 1: ANALYZE */}
        {viewTab === 'analyze' && (
          <form onSubmit={handleAnalyze} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT COLUMN: RESUME UPLOAD */}
            <div className="flex flex-col gap-6">
              <div className={`border p-6 rounded-2xl ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
                <h3 className={`font-display font-extrabold text-base mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  <FileText className="w-5 h-5 text-gold" />
                  1. Upload Resume PDF
                </h3>
                <p className={`font-sans text-xs mb-5 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                  Provide your resume in plain-text PDF format. Our RAG engine extracts data, segments it into indexable chunks, and maps embeddings.
                </p>

                {/* Drag zone */}
                <div
                  id="drop-zone"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[12rem] ${
                    dragActive 
                      ? 'border-gold bg-gold/5' 
                      : file 
                        ? 'border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10' 
                        : isDark 
                          ? 'border-brand-border bg-brand-input hover:border-gold hover:bg-gold/5'
                          : 'border-stone-200 bg-stone-50 hover:border-gold hover:bg-gold/5'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                  />

                  {file ? (
                    <>
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4 text-emerald-400">
                        <FileCheck className="w-8 h-8" />
                      </div>
                      <span className={`text-sm font-bold max-w-[200px] truncate ${isDark ? 'text-white' : 'text-stone-800'}`}>{file.name}</span>
                      <span className="text-xs text-stone-500 font-mono mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB • READY</span>
                    </>
                  ) : (
                    <>
                      <div className={`p-3 rounded-xl mb-4 border ${isDark ? 'bg-brand-bg border-brand-border text-brand-text-muted' : 'bg-stone-200/50 border-stone-300 text-stone-500'}`}>
                        <FileUp className="w-8 h-8" />
                      </div>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-stone-700'}`}>Drag & Drop Resume PDF</span>
                      <span className="text-[10px] text-stone-500 mt-1 font-mono">PDF ONLY • MAX 5MB</span>
                    </>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className={`border p-5 rounded-2xl flex items-start gap-3 ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
                <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="font-sans">
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-stone-800'}`}>Why are only PDFs supported?</h4>
                  <p className={`text-[10px] mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                    Recruiter tracking algorithms (ATS) parse PDF structures as a standard format to guarantee consistent layouts across all screening devices.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: JOB DESCRIPTION */}
            <div className={`border p-6 rounded-2xl flex flex-col gap-4 ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
              <h3 className={`font-display font-extrabold text-base flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                2. Paste Target Job Description
              </h3>
              <p className={`font-sans text-xs leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                Provide the full qualifications checklist and job parameters. We'll run the semantic vector indexer to pinpoint any missing credentials.
              </p>

              <textarea
                required
                rows="8"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste qualifications, technologies, required experiences, responsibilities, and key deliverables..."
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-gold transition-colors font-sans resize-none ${
                  isDark ? 'border-brand-border bg-brand-input text-white placeholder:text-brand-text-muted' : 'border-stone-200 bg-stone-50 text-stone-850 placeholder:text-stone-400'
                }`}
              />

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 font-sans text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/5"
              >
                Execute Matrix Scan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: HISTORY */}
        {viewTab === 'history' && (
          <div className="flex flex-col gap-6">
            {history.length === 0 ? (
              <div className={`border p-12 rounded-2xl text-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
                <History className="w-12 h-12 text-brand-text-muted mx-auto mb-4" />
                <h3 className={`font-display font-extrabold text-base ${isDark ? 'text-white' : 'text-stone-800'}`}>No Historical Scan Logs</h3>
                <p className={`font-sans text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>
                  You haven't uploaded any resumes for analysis yet. Open the SaaS Analyzer tab to initiate your first RAG run!
                </p>
                <button
                  onClick={() => setViewTab('analyze')}
                  className="mt-6 px-4 py-2.5 rounded-xl font-sans text-xs font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all cursor-pointer shadow-lg"
                >
                  Analyze Resume
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {history.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => navigate(`/report/${report.id}`)}
                    className={`border p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[10rem] ${
                      isDark ? 'bg-brand-card border-brand-border hover:border-gold/30' : 'bg-white border-stone-200 hover:border-gold/30 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl border ${isDark ? 'bg-brand-input border-brand-border text-gold' : 'bg-gold/10 border-gold/20 text-stone-900'}`}>
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold truncate max-w-[200px] ${isDark ? 'text-white' : 'text-stone-900'}`} title={report.resumeName}>
                            {report.resumeName}
                          </h4>
                          <span className={`flex items-center gap-1 text-[10px] font-mono mt-1 ${isDark ? 'text-brand-text-muted' : 'text-stone-500'}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl font-display font-extrabold block ${isDark ? 'text-white' : 'text-stone-900'}`}>
                          {report.atsScore}%
                        </span>
                        <p className="text-[9px] text-gold font-sans font-extrabold tracking-wider uppercase">ATS SCORE</p>
                      </div>
                    </div>

                    <div className={`border-t pt-4 flex items-center justify-between ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                      <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider">Scanned Successfully</span>
                      <button
                        onClick={(e) => handleDeleteHistory(report.id, e)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? 'text-brand-text-muted hover:text-rose-400 hover:bg-rose-500/10' : 'text-stone-400 hover:text-rose-600 hover:bg-rose-50'}`}
                        title="Delete Report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {viewTab === 'profile' && (
          <div className={`max-w-2xl border p-8 rounded-2xl ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-sm'}`}>
            <h3 className={`font-display font-extrabold text-lg mb-6 flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
              <UserIcon className="w-5 h-5 text-gold" />
              Candidate Profile Information
            </h3>

            <div className="flex flex-col gap-5 font-sans">
              <div className={`grid grid-cols-2 gap-6 pb-5 border-b ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                <div>
                  <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider block">Full Name</span>
                  <span className={`text-sm font-bold block mt-1.5 ${isDark ? 'text-white' : 'text-stone-800'}`}>{user?.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider block">Email Address</span>
                  <span className={`text-sm font-bold block mt-1.5 ${isDark ? 'text-white' : 'text-stone-800'}`}>{user?.email}</span>
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-6 pb-5 border-b ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                <div>
                  <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider block">Authorized Session</span>
                  <span className="text-xs font-mono text-emerald-500 block mt-1.5 font-bold">ACTIVE JWT SESSION (7 DAYS)</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider block">Profile Joined</span>
                  <span className={`text-sm font-semibold block mt-1.5 ${isDark ? 'text-brand-text-sec' : 'text-stone-700'}`}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <div className={`flex-1 p-4 rounded-xl text-center border ${isDark ? 'bg-brand-bg border-brand-border' : 'bg-stone-50 border-stone-100'}`}>
                  <span className="text-2xl font-display font-extrabold text-gold block">{history.length}</span>
                  <span className="text-[9px] text-brand-text-muted font-bold block uppercase tracking-wider mt-0.5">Scans Performed</span>
                </div>
                <div className={`flex-1 p-4 rounded-xl text-center border ${isDark ? 'bg-brand-bg border-brand-border' : 'bg-stone-50 border-stone-100'}`}>
                  <span className="text-2xl font-display font-extrabold text-emerald-500 block">Pro</span>
                  <span className="text-[9px] text-brand-text-muted font-bold block uppercase tracking-wider mt-0.5">Service Tier</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Custom Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-all ${
            isDark ? 'bg-brand-card border-brand-border text-white' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-rose-500/10 text-rose-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base">Delete Scan Report</h3>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-brand-text-sec' : 'text-stone-500'}`}>This action cannot be undone.</p>
              </div>
            </div>
            
            <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
              Are you sure you want to permanently delete this resume analysis report from your history logs?
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTargetId(null)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isDark ? 'bg-brand-input text-brand-text-sec hover:bg-brand-border hover:text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteHistory}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastNotification toast={toast} onClose={() => setToast(null)} />

    </div>
  );
};

// Helper inside file for fast clean references
const ToastNotification = ({ toast, onClose }) => {
  if (!toast) return null;
  return <Toast message={toast.message} type={toast.type} onClose={onClose} />;
};

