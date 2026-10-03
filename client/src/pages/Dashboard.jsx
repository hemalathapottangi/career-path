import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Target, TrendingUp, BookOpen, Star,
  Trash2, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { careerAPI, profileAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { safeGet, safeSet, KEYS } from '../utils/storage.js';
import Loader, { ButtonSpinner } from '../components/Loader.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { SkillStatusRow } from '../components/SkillBadge.jsx';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const SKILL_LABELS = {
  programming: 'Programming', data_structures: 'Data Structures', git: 'Git', problem_solving: 'Problem Solving',
  database_basics: 'Database Basics', html: 'HTML', css: 'CSS', javascript: 'JavaScript', react: 'React',
  github: 'GitHub', excel: 'Excel', sql: 'SQL', python: 'Python', statistics: 'Statistics',
  data_visualization: 'Data Visualization', machine_learning: 'Machine Learning', ui_design: 'UI Design',
  ux_principles: 'UX Principles', figma: 'Figma', wireframing: 'Wireframing', user_research: 'User Research',
  networking: 'Networking', linux: 'Linux', cybersecurity_fundamentals: 'Cybersecurity Fundamentals',
  security_tools: 'Security Tools', cloud_fundamentals: 'Cloud Fundamentals', cloud_platforms: 'Cloud Platforms',
  cicd: 'CI/CD Pipelines', docker: 'Docker',
};

export default function Dashboard() {
  const { user, refreshUser } = useAuth();

  const [career,   setCareer]   = useState(null);
  const [progress, setProgress] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [resetting, setResetting] = useState(false);

  const selectedId = user?.selectedCareer || safeGet(KEYS.SELECTED_CAREER);

  const loadCareer = useCallback(async () => {
    if (!selectedId) { setLoading(false); return; }
    try {
      const [carRes, progRes] = await Promise.all([
        careerAPI.getById(selectedId),
        profileAPI.getProgress(selectedId),
      ]);
      setCareer(carRes.data.data);
      const prog = progRes.data.data.progress || {};
      setProgress(prog);
      // Merge with localStorage
      const stored = safeGet(KEYS.PROGRESS) || {};
      const merged = { ...stored, [selectedId]: { ...(stored[selectedId] || {}), ...prog } };
      safeSet(KEYS.PROGRESS, merged);
    } catch {
      // Fallback to localStorage
      const stored = safeGet(KEYS.PROGRESS) || {};
      setProgress(stored[selectedId] || {});
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => { loadCareer(); }, [loadCareer]);

  const handleStatusChange = async (skillId, status) => {
    // Optimistic update
    setProgress((prev) => ({ ...prev, [skillId]: status }));
    const stored = safeGet(KEYS.PROGRESS) || {};
    safeSet(KEYS.PROGRESS, { ...stored, [selectedId]: { ...(stored[selectedId] || {}), [skillId]: status } });
    try {
      await profileAPI.updateSkillProgress({ careerId: selectedId, skillId, status });
    } catch { /* progress saved in localStorage anyway */ }
  };

  const handleReset = async () => {
    if (!window.confirm('This will clear all your progress and selected career. Are you sure?')) return;
    setResetting(true);
    try {
      await profileAPI.reset();
      await refreshUser();
      safeSet(KEYS.PROGRESS, {});
      safeSet(KEYS.SELECTED_CAREER, '');
      safeSet(KEYS.RESULTS, null);
      setCareer(null);
      setProgress({});
    } catch { /* ignore */ } finally { setResetting(false); }
  };

  // Progress calculations — FR6: (completed / total) × 100
  const requiredSkills   = career?.requiredSkills || [];
  const completed        = requiredSkills.filter((s) => progress[s] === 'Completed').length;
  const inProgress       = requiredSkills.filter((s) => progress[s] === 'In Progress').length;
  const notStarted       = requiredSkills.filter((s) => !progress[s] || progress[s] === 'Not Started').length;
  const overallPct       = requiredSkills.length > 0 ? Math.round((completed / requiredSkills.length) * 100) : 0;
  const nextSkill        = requiredSkills.find((s) => !progress[s] || progress[s] === 'Not Started');
  const currentStep      = career?.roadmap?.find((r) => r.step === completed + 1);

  if (loading) return <Loader message="Loading your dashboard…" />;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary-600" />
          <h1 className="section-heading">My Dashboard</h1>
        </div>
        {career && (
          <button onClick={handleReset} disabled={resetting} className="btn-ghost text-sm text-red-500 hover:bg-red-50">
            {resetting ? <ButtonSpinner /> : <Trash2 className="w-4 h-4" />}
            Reset all data
          </button>
        )}
      </div>

      {/* Greeting */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl p-6 mb-6">
        <p className="text-primary-100 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold mt-1">{user?.name} 👋</h2>
        {career && <p className="text-primary-100 mt-1 text-sm">Working towards: <strong className="text-white">{career.title}</strong></p>}
      </div>

      {!career ? (
        /* No target career */
        <div className="card p-10 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No target career selected</h2>
          <p className="text-gray-500 mb-6">
            Run the Career Assessment or browse the Explorer to find a career and set it as your target.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/assessment" className="btn-primary">Start Assessment</Link>
            <Link to="/explore"    className="btn-secondary">Explore Careers</Link>
          </div>
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Overall Progress', value: `${overallPct}%`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-primary-600', bg: 'bg-primary-50' },
              { label: 'Skills Completed', value: completed,         icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-600',   bg: 'bg-green-50'   },
              { label: 'In Progress',      value: inProgress,        icon: <Clock        className="w-5 h-5" />, color: 'text-yellow-600',  bg: 'bg-yellow-50'  },
              { label: 'Skills Remaining', value: notStarted,        icon: <BookOpen     className="w-5 h-5" />, color: 'text-gray-600',    bg: 'bg-gray-50'    },
            ].map((s) => (
              <div key={s.label} className={`card p-4 flex items-start gap-3 ${s.bg}`}>
                <div className={`${s.color} mt-0.5`}>{s.icon}</div>
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar + chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <div className="card p-5 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Learning Progress — {career.title}</h3>
              <ProgressBar value={overallPct} label="Overall" size="lg" />
              <p className="text-xs text-gray-500 mt-3">
                {completed} of {requiredSkills.length} required skills completed
              </p>
              {currentStep && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
                  <p className="text-xs text-primary-600 font-medium">Current Roadmap Step</p>
                  <p className="text-sm font-bold text-primary-900 mt-0.5">{currentStep.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{currentStep.description}</p>
                </div>
              )}
            </div>

            {/* Donut via Recharts */}
            <div className="card p-5 flex flex-col items-center">
              <h3 className="font-semibold text-gray-900 mb-2 self-start">Skill Breakdown</h3>
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart
                  innerRadius="50%" outerRadius="90%"
                  data={[
                    { name: 'Completed',   value: completed,  fill: '#22c55e' },
                    { name: 'In Progress', value: inProgress, fill: '#facc15' },
                    { name: 'Remaining',   value: notStarted, fill: '#e5e7eb' },
                  ]}
                  startAngle={90} endAngle={-270}
                >
                  <RadialBar dataKey="value" cornerRadius={4} />
                  <Tooltip formatter={(v, n) => [v, n]} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="flex gap-3 text-xs mt-1">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />Done</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />In Progress</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" />Remaining</span>
              </div>
            </div>
          </div>

          {/* Next skill recommendation */}
          {nextSkill && (
            <div className="card p-5 mb-6 border-l-4 border-primary-500">
              <p className="text-xs text-primary-600 font-semibold mb-1">RECOMMENDED NEXT SKILL</p>
              <p className="font-bold text-gray-900 text-lg">{SKILL_LABELS[nextSkill] || nextSkill}</p>
              <p className="text-sm text-gray-500 mt-1">
                Visit the <Link to={`/careers/${selectedId}`} className="text-primary-600 hover:underline">career details page</Link> for resources and projects.
              </p>
            </div>
          )}

          {/* Skill progress tracker */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Skill Progress Tracker</h3>
              <Link to={`/careers/${selectedId}`} className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> View full details
              </Link>
            </div>
            {requiredSkills.map((s) => (
              <SkillStatusRow
                key={s}
                skillId={s}
                label={SKILL_LABELS[s] || s}
                status={progress[s] || 'Not Started'}
                onChange={handleStatusChange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
