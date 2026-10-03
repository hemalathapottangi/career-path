import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Circle, BookOpen, Target,
  ExternalLink, Folder, Map, Star, AlertCircle
} from 'lucide-react';
import { careerAPI, profileAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { safeGet, safeSet, KEYS } from '../utils/storage.js';
import Loader, { ButtonSpinner } from '../components/Loader.jsx';
import SkillBadge from '../components/SkillBadge.jsx';

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

const RESOURCE_COLORS = { Tutorial: 'bg-blue-100 text-blue-700', Documentation: 'bg-green-100 text-green-700', Practice: 'bg-purple-100 text-purple-700' };

export default function CareerDetail() {
  const { id }           = useParams();
  const { isAuthenticated, refreshUser } = useAuth();
  const navigate         = useNavigate();

  const [career,  setCareer]  = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setting, setSetting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const selectedCareer = safeGet(KEYS.SELECTED_CAREER);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [careerRes] = await Promise.all([careerAPI.getById(id)]);
        setCareer(careerRes.data.data);

        if (isAuthenticated) {
          const gapRes = await careerAPI.getSkillGap(id);
          setSkillGap(gapRes.data.data);
        } else {
          // Client-side gap using localStorage profile
          const profile = safeGet(KEYS.PROFILE);
          if (profile?.skills && careerRes.data.data) {
            const userSet    = new Set(profile.skills);
            const required   = careerRes.data.data.requiredSkills || [];
            const alreadyHave = required.filter((s) => userSet.has(s));
            const needToLearn = required.filter((s) => !userSet.has(s));
            setSkillGap({ alreadyHave, needToLearn, recommendedNext: needToLearn, matchCount: alreadyHave.length, gapCount: needToLearn.length, totalRequired: required.length });
          }
        }
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id, isAuthenticated]);

  const handleSetTarget = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setSetting(true);
    try {
      await profileAPI.setSelectedCareer(id);
      safeSet(KEYS.SELECTED_CAREER, id);
      await refreshUser();
    } catch { /* ignore */ } finally { setSetting(false); }
  };

  if (loading) return <Loader message="Loading career details…" />;
  if (!career) return (
    <div className="page-container text-center">
      <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
      <p className="text-gray-600">Career not found.</p>
      <Link to="/explore" className="btn-primary mt-4 inline-flex">Back to Explorer</Link>
    </div>
  );

  const TABS = [
    { id: 'overview',  label: 'Overview' },
    { id: 'skills',    label: 'Skill Gap' },
    { id: 'roadmap',   label: 'Roadmap' },
    { id: 'resources', label: 'Resources' },
    { id: 'projects',  label: 'Projects' },
  ];

  return (
    <div className="page-container">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="btn-ghost text-sm mb-6 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge bg-primary-100 text-primary-800">{career.category}</span>
              <span className="badge bg-gray-100 text-gray-700">{career.difficulty}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{career.title}</h1>
            <p className="text-gray-600">{career.shortDescription}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {selectedCareer === id ? (
              <span className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                <Star className="w-4 h-4 fill-current" /> Target Career
              </span>
            ) : (
              <button onClick={handleSetTarget} disabled={setting} className="btn-primary text-sm">
                {setting ? <ButtonSpinner /> : <Target className="w-4 h-4" />}
                Set as Target
              </button>
            )}
          </div>
        </div>

        {/* Skill gap mini summary */}
        {skillGap && (
          <div className="flex gap-6 mt-5 pt-5 border-t border-gray-200 text-sm">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              <span><strong>{skillGap.matchCount}</strong> skills matched</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span><strong>{skillGap.gapCount}</strong> to learn</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Circle className="w-4 h-4" />
              <span>{skillGap.totalRequired} total required</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-1 min-w-max px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t.id ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >{t.label}</button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === 'overview' && (
        <div className="card p-6 animate-fade-in">
          <h2 className="font-bold text-gray-900 mb-3">About this Career</h2>
          <p className="text-gray-600 leading-relaxed">{career.overview}</p>
        </div>
      )}

      {/* ── Skill Gap ── */}
      {activeTab === 'skills' && (
        <div className="space-y-5 animate-fade-in">
          {!skillGap ? (
            <div className="card p-8 text-center">
              <p className="text-gray-500 mb-4">Complete your profile to see personalised skill-gap analysis.</p>
              <Link to={isAuthenticated ? '/assessment' : '/login'} className="btn-primary">
                {isAuthenticated ? 'Go to Assessment' : 'Sign in'}
              </Link>
            </div>
          ) : (
            <>
              {skillGap.alreadyHave.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Already Have ({skillGap.alreadyHave.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGap.alreadyHave.map((s) => <SkillBadge key={s} label={SKILL_LABELS[s] || s} />)}
                  </div>
                </div>
              )}
              {skillGap.needToLearn.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-500" /> Need to Learn ({skillGap.needToLearn.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGap.needToLearn.map((s) => <SkillBadge key={s} label={SKILL_LABELS[s] || s} />)}
                  </div>
                </div>
              )}
              {skillGap.recommendedNext?.length > 0 && (
                <div className="card p-5 border-primary-200">
                  <h3 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" /> Recommended Next Skills (Priority Order)
                  </h3>
                  <ol className="space-y-2">
                    {skillGap.recommendedNext.map((s, i) => (
                      <li key={s} className="flex items-center gap-3 text-sm">
                        <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-800 font-medium">{SKILL_LABELS[s] || s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Roadmap ── */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm text-gray-500 mb-2">Step-by-step learning path for {career.title}</p>
          {career.roadmap?.map((step, i) => (
            <div key={step.step} className="card p-5 flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.step}
                </div>
                {i < career.roadmap.length - 1 && <div className="w-0.5 h-full bg-primary-200 mt-1" />}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{step.duration}</span>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Resources ── */}
      {activeTab === 'resources' && (
        <div className="animate-fade-in">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-xs text-amber-800">
            ⚠️ All resources are external links. CareerPath does not provide courses — we link to free, high-quality content.
          </div>
          {career.resources && Object.entries(career.resources).map(([skillId, links]) => (
            <div key={skillId} className="card p-5 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">{SKILL_LABELS[skillId] || skillId}</h3>
              <div className="space-y-2">
                {links.map((r) => (
                  <a
                    key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`badge text-xs flex-shrink-0 ${RESOURCE_COLORS[r.type] || 'bg-gray-100 text-gray-700'}`}>{r.type}</span>
                      <span className="text-sm font-medium text-gray-800 truncate group-hover:text-primary-700">{r.title}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Projects ── */}
      {activeTab === 'projects' && (
        <div className="animate-fade-in">
          <p className="text-sm text-gray-500 mb-5">Beginner-friendly projects to practise {career.title} skills</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {career.projects?.map((proj) => (
              <div key={proj.title} className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-accent-100 text-accent-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{proj.title}</h3>
                    <span className={`badge text-xs mt-1 ${
                      proj.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      proj.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{proj.difficulty}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
