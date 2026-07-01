import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Sparkles, Cpu, Target, BrainCircuit, 
  ArrowRight, Shield, Zap, CheckCircle2, Star,
  Mail, MessageSquare, Send, Sun, Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const features = [
    {
      icon: <Target className="w-6 h-6 text-gold" />,
      title: "ATS Score Analysis",
      description: "Our advanced algorithm dissects your resume structure, scoring your text parsing reliability, design alignments, and keyword optimization precisely."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-gold-accent" />,
      title: "Semantic Skill Gap Detection",
      description: "Identify key competencies and technical qualifications missing from your profile against target Job Descriptions using semantic RAG."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "Keyword Optimization",
      description: "Perform real-time matching of target industry terminology and verify density saturation to elevate your visibility."
    },
    {
      icon: <Cpu className="w-6 h-6 text-gold-accent" />,
      title: "AI Resume Rewriter",
      description: "Upgrade passive statements, quantify performance, and rewrite resume bullets to match standard industry expectations perfectly."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-gold" />,
      title: "Interview Question Generator",
      description: "Generate customized behavioral and technology questions tailored directly to your profile and target JD gaps with ideal answers."
    },
    {
      icon: <Star className="w-6 h-6 text-gold-accent" />,
      title: "Personalized Career Suggestions",
      description: "Obtain role-specific certifications list and targeted high-yield expansion projects to accelerate your growth trajectory."
    }
  ];

  const pricingPlans = [
    {
      name: "Standard Core",
      price: "$0",
      period: "forever",
      desc: "Perfect for entry-level candidates starting out.",
      features: [
        "PDF Parsing & Analysis",
        "Overall ATS Scoring Breakdowns",
        "Up to 3 scans per month",
        "Basic Bullet Point Suggestions"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "SaaS Professional",
      price: "$19",
      period: "month",
      desc: "Tailored for mid-senior level tech applicants.",
      features: [
        "Unlimited PDF Resume Uploads",
        "Full Semantic RAG Chunk Search",
        "Deep Section score alignments",
        "Interactive Interview Prep Questions",
        "AI Suggestion & Rewrite Studio",
        "Historical Reports Logs & Persistence"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Enterprise Global",
      price: "$49",
      period: "month",
      desc: "Perfect for career agencies and HR coordinators.",
      features: [
        "Everything in Professional",
        "Custom ATS weight matrices",
        "API integration endpoints",
        "Dedicated cloud database tables",
        "Priority live customer support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div id="landing-page" className={`min-h-screen ${isDark ? 'bg-brand-bg text-white' : 'bg-stone-50 text-stone-900'} transition-colors duration-300 relative overflow-hidden font-sans`}>
      
      {/* Premium Minimalist Background Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.07] pointer-events-none" />

      {/* Elegant Radial Dark Gold Gradient Glow */}
      <div className="absolute top-[-20%] left-[25%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-gold-dark/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navbar */}
      <nav className={`relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b ${isDark ? 'border-brand-border bg-brand-nav/80' : 'border-stone-200 bg-white/80'} backdrop-blur-md`}>
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <BrainCircuit className="w-7 h-7 text-gold" />
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-gold-accent to-gold bg-clip-text text-transparent">
            HireLens AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className={`transition-colors ${isDark ? 'text-brand-text-sec hover:text-gold' : 'text-stone-600 hover:text-stone-950'}`}>Features</a>
          <a href="#rag-pipeline" className={`transition-colors ${isDark ? 'text-brand-text-sec hover:text-gold' : 'text-stone-600 hover:text-stone-950'}`}>RAG Flow</a>
          <a href="#pricing" className={`transition-colors ${isDark ? 'text-brand-text-sec hover:text-gold' : 'text-stone-600 hover:text-stone-950'}`}>Pricing</a>
          <a href="#about" className={`transition-colors ${isDark ? 'text-brand-text-sec hover:text-gold' : 'text-stone-600 hover:text-stone-950'}`}>About</a>
          <a href="#contact" className={`transition-colors ${isDark ? 'text-brand-text-sec hover:text-gold' : 'text-stone-600 hover:text-stone-950'}`}>Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border cursor-pointer transition-all ${
              isDark ? 'border-brand-border bg-brand-input hover:bg-brand-border text-gold' : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 cursor-pointer shadow-lg shadow-gold/10"
            >
              Dashboard
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/auth" className={`text-sm font-medium transition-colors ${isDark ? 'text-brand-text-sec hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Sign In
              </Link>
              <button
                onClick={() => navigate('/auth')}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 cursor-pointer shadow-lg shadow-gold/10"
              >
                Analyze Resume
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-8 ${
            isDark ? 'border-gold/20 bg-gold/5 text-gold' : 'border-gold/30 bg-gold/10 text-gold-dark'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Google Gemini, LangChain & Retrieval-Augmented Generation
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-white">
            Land More Interviews with{" "}
            <span className="gold-gradient-text">
              HireLens AI
            </span>
          </h1>

          <p className={`text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
            Analyze your resume against any Job Description using AI-powered semantic matching, ATS scoring, skill-gap analysis, resume optimization, and personalized interview preparation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 cursor-pointer shadow-xl shadow-gold/15 flex items-center justify-center gap-2"
            >
              Analyze Resume <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#features"
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border transition-colors flex items-center justify-center ${
                isDark ? 'border-brand-border bg-brand-card hover:bg-brand-input text-brand-text' : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
              }`}
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Floating Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={`relative max-w-4xl mx-auto border rounded-2xl overflow-hidden shadow-2xl p-1 bg-brand-card/90 ${isDark ? 'border-brand-border' : 'border-stone-200'}`}
        >
          <div className={`flex items-center justify-between px-5 py-3.5 border-b rounded-t-xl ${isDark ? 'bg-brand-bg/80 border-brand-border' : 'bg-stone-100 border-stone-200'}`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className={`text-[10px] font-mono tracking-widest ${isDark ? 'text-brand-text-muted' : 'text-stone-500'}`}>COGNITIVE_MATCH_ENGINE_CORE</div>
            <div className="w-4" />
          </div>
          
          <div className={`p-8 rounded-b-xl flex flex-col md:flex-row gap-8 text-left ${isDark ? 'bg-brand-sec/40' : 'bg-white'}`}>
            {/* Score circle layout mockup */}
            <div className={`md:w-1/3 border p-6 rounded-2xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
              <div className="relative w-36 h-36 flex items-center justify-center mb-5">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="62" className={isDark ? 'stroke-brand-border' : 'stroke-stone-200'} strokeWidth="8" fill="transparent" />
                  <circle cx="72" cy="72" r="62" className="stroke-gold" strokeWidth="8" strokeDasharray="390" strokeDashoffset="45" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="text-center">
                  <span className={`text-3xl font-display font-extrabold ${isDark ? 'text-white' : 'text-stone-900'}`}>88%</span>
                  <p className="text-[9px] text-gold font-bold uppercase tracking-widest mt-0.5">ALIGNED</p>
                </div>
              </div>
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>Senior React Architect</h3>
              <p className="text-[11px] text-brand-text-muted font-sans mt-0.5">Enterprise Ready</p>
            </div>

            {/* Gap lists mockup */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-gold uppercase tracking-wider mb-4 font-display">Keyword Alignment Audit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`border p-3.5 rounded-xl flex justify-between items-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className={`text-xs font-mono font-medium ${isDark ? 'text-brand-text' : 'text-stone-800'}`}>React / NextJS</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">High (12x)</span>
                  </div>
                  <div className={`border p-3.5 rounded-xl flex justify-between items-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className={`text-xs font-mono font-medium ${isDark ? 'text-brand-text' : 'text-stone-800'}`}>Node.js / Express</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-gold/10 text-gold border border-gold/20">Medium (5x)</span>
                  </div>
                  <div className={`border p-3.5 rounded-xl flex justify-between items-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className={`text-xs font-mono font-medium ${isDark ? 'text-brand-text' : 'text-stone-800'}`}>TypeScript</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Missing</span>
                  </div>
                  <div className={`border p-3.5 rounded-xl flex justify-between items-center ${isDark ? 'bg-brand-card border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                    <span className={`text-xs font-mono font-medium ${isDark ? 'text-brand-text' : 'text-stone-800'}`}>AWS / Docker</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Missing</span>
                  </div>
                </div>
              </div>
              
              <div className={`mt-5 border-t pt-4 flex flex-col sm:flex-row gap-4 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                <div className={`flex-1 p-3.5 rounded-xl border ${isDark ? 'bg-brand-card/60 border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">Top Profile Strength</span>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>Excellent clean component architectures and responsive system workflows.</p>
                </div>
                <div className={`flex-1 p-3.5 rounded-xl border ${isDark ? 'bg-brand-card/60 border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                  <span className="text-[9px] font-bold text-gold uppercase tracking-wider block">Actionable AI Upgrade</span>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>Introduce CI/CD automation parameters and AWS deployment definitions.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`relative z-10 max-w-7xl mx-auto px-6 py-24 border-t ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4 text-white">
            Built for High-Trust Tech Portfolios
          </h2>
          <p className={`text-sm max-w-xl mx-auto ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
            No keyword stuffing hacks. HireLens AI runs standard-compliant vector matching to evaluate real capability overlap and semantic depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
                isDark ? 'bg-brand-card border-brand-border hover:bg-[#1b1b1b]' : 'bg-white border-stone-200 hover:shadow-stone-200/50'
              }`}
            >
              <div className={`p-3 rounded-xl w-fit border mb-5 ${isDark ? 'bg-brand-bg border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
                {feat.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2.5">{feat.title}</h3>
              <p className={`leading-relaxed text-xs md:text-sm ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RAG Pipeline Explainer Section */}
      <section id="rag-pipeline" className={`relative z-10 max-w-7xl mx-auto px-6 py-24 border-t ${isDark ? 'border-brand-border' : 'border-stone-200'} text-center`}>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4 text-white">
          Our Advanced RAG Pipeline
        </h2>
        <p className={`text-sm max-w-xl mx-auto mb-16 ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
          Secure, isolated processing. We map text to vectors locally, retrieve highly relevant context, and run semantic validation via Gemini models.
        </p>

        {/* Diagrams */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 items-center p-8 rounded-2xl relative border ${isDark ? 'bg-brand-card/40 border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200'}`}>
            <FileText className="w-8 h-8 text-gold mx-auto mb-3" />
            <span className="text-xs font-bold font-mono text-white block">1. Parser</span>
            <p className="text-[11px] text-brand-text-muted mt-1.5 font-sans">Extracts PDF plain-text dynamically with zero remote leak.</p>
          </div>
          
          <div className="text-brand-text-muted font-bold text-lg hidden lg:block">→</div>

          <div className={`p-5 rounded-xl border ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200'}`}>
            <BrainCircuit className="w-8 h-8 text-gold-accent mx-auto mb-3" />
            <span className="text-xs font-bold font-mono text-white block">2. Vector Index</span>
            <p className="text-[11px] text-brand-text-muted mt-1.5 font-sans">Chunks segments & generates high-dimensional embeddings.</p>
          </div>

          <div className="text-brand-text-muted font-bold text-lg hidden lg:block">→</div>

          <div className={`p-5 rounded-xl border ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200'}`}>
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
            <span className="text-xs font-bold font-mono text-white block">3. Synthesizer</span>
            <p className="text-[11px] text-brand-text-muted mt-1.5 font-sans">Matches target criteria via similarity matrices and grades.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`relative z-10 max-w-7xl mx-auto px-6 py-24 border-t ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4 text-white">
            Predictable SaaS Pricing
          </h2>
          <p className={`text-sm max-w-xl mx-auto ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
            Start scanning instantly with no credit card required. Upgrade to unlock full unlimited historical index logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`relative border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                plan.popular 
                  ? 'bg-brand-card border-gold/60 shadow-gold/5 shadow-2xl' 
                  : 'bg-brand-card/50 border-brand-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gold text-brand-bg font-sans text-[9px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border border-gold-accent">
                  Standard Choice
                </div>
              )}
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-brand-text-muted mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-display font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-brand-text-muted">/ {plan.period}</span>
                </div>
                <div className={`border-t pt-6 mb-8 ${isDark ? 'border-brand-border' : 'border-stone-100'}`}>
                  <ul className="space-y-3.5 text-left">
                    {plan.features.map((feat, index) => (
                      <li key={index} className="flex items-center gap-3 text-xs text-brand-text-sec font-sans">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => navigate('/auth')}
                className={`w-full py-3 rounded-xl font-sans text-xs font-bold transition-all duration-300 cursor-pointer ${
                  plan.popular 
                    ? 'bg-gold text-brand-bg hover:bg-gold-accent' 
                    : 'bg-brand-input border border-brand-border text-brand-text hover:bg-brand-border'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`relative z-10 max-w-5xl mx-auto px-6 py-24 border-t ${isDark ? 'border-brand-border' : 'border-stone-200'} text-center`}>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-6 text-white">
          About Our Platform
        </h2>
        <p className={`text-sm md:text-base leading-relaxed mb-8 max-w-3xl mx-auto ${isDark ? 'text-brand-text-sec' : 'text-stone-600'}`}>
          HireLens AI is an AI-powered resume intelligence platform that helps students and professionals optimize their resumes for Applicant Tracking Systems (ATS). Using Google Gemini, LangChain, vector embeddings, and Retrieval-Augmented Generation (RAG), the platform provides semantic resume analysis, skill-gap detection, keyword optimization, resume rewriting, and role-specific interview preparation.
        </p>
        <div className={`inline-flex gap-8 items-center justify-center p-6 border rounded-2xl ${isDark ? 'bg-brand-card/40 border-brand-border' : 'bg-stone-50 border-stone-200'}`}>
          <div className="text-center">
            <span className="text-2xl font-display font-bold text-white block">99.2%</span>
            <p className="text-[9px] text-brand-text-muted uppercase tracking-wider mt-0.5">Parsing Accuracy</p>
          </div>
          <div className={`w-px h-8 ${isDark ? 'bg-brand-border' : 'bg-stone-200'}`} />
          <div className="text-center">
            <span className="text-2xl font-display font-bold text-white block">Gemini 3.5</span>
            <p className="text-[9px] text-brand-text-muted uppercase tracking-wider mt-0.5">Validation Core</p>
          </div>
          <div className={`w-px h-8 ${isDark ? 'bg-brand-border' : 'bg-stone-200'}`} />
          <div className="text-center">
            <span className="text-2xl font-display font-bold text-white block">&lt; 3.0s</span>
            <p className="text-[9px] text-brand-text-muted uppercase tracking-wider mt-0.5">Verification speeds</p>
          </div>
        </div>
      </section>

      {/* Interactive Contact Section */}
      <section id="contact" className={`relative z-10 max-w-3xl mx-auto px-6 py-24 border-t ${isDark ? 'border-brand-border' : 'border-stone-200'}`}>
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4 text-white">
            Have Questions?
          </h2>
          <p className="text-xs text-brand-text-muted">
            Connect with our engineering support pipeline. We respond to all technical queries within 24 hours.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className={`border p-8 rounded-2xl flex flex-col gap-5 ${isDark ? 'bg-brand-card border-brand-border' : 'bg-white border-stone-200 shadow-xl shadow-stone-100'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider font-sans">Full Name</label>
              <input
                type="text"
                required
                placeholder="Ada Lovelace"
                value={contactForm.name}
                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                className={`px-4 py-3 rounded-xl border text-sm text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans ${
                  isDark ? 'border-brand-border bg-brand-input' : 'border-stone-200 bg-stone-50'
                }`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider font-sans">Email Address</label>
              <input
                type="email"
                required
                placeholder="ada@lovelace.org"
                value={contactForm.email}
                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                className={`px-4 py-3 rounded-xl border text-sm text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans ${
                  isDark ? 'border-brand-border bg-brand-input' : 'border-stone-200 bg-stone-50'
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-brand-text-muted uppercase tracking-wider font-sans">Your Message</label>
            <textarea
              required
              rows="4"
              placeholder="How does your RAG search handle project overlap similarity matrices?"
              value={contactForm.message}
              onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
              className={`px-4 py-3 rounded-xl border text-sm text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans resize-none ${
                isDark ? 'border-brand-border bg-brand-input' : 'border-stone-200 bg-stone-50'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 font-sans text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            {formSubmitted ? (
              <>Message Transmitted Successfully!</>
            ) : (
              <>Send Message <Send className="w-3.5 h-3.5" /></>
            )}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t bg-brand-bg py-12 ${isDark ? 'border-brand-border text-brand-text-muted' : 'border-stone-200 text-stone-500'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2.5">
              <BrainCircuit className="w-5 h-5 text-gold" />
              <span className="font-display font-bold text-sm tracking-tight text-white">
                HireLens AI
              </span>
            </div>
            <p className="text-[10px] text-brand-text-muted max-w-sm text-left">
              Built with React, Node.js, Express.js, MongoDB, Google Gemini, LangChain and ChromaDB.
            </p>
          </div>
          <p className="text-xs font-sans">
            &copy; 2026 HireLens AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-sans">
            <a href="#" className={`hover:text-white transition-colors`}>Privacy Policy</a>
            <a href="#" className={`hover:text-white transition-colors`}>Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

