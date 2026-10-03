import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { careerAPI, assessmentAPI, profileAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { safeGet, safeSet, KEYS } from '../utils/storage.js';
import Loader, { ButtonSpinner } from '../components/Loader.jsx';

const STEPS = ['Education', 'Skills', 'Interests', 'Preferences'];

export default function Assessment() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [step,    setStep]    = useState(0);
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,   setError]   = useState('');

  // Form state — pre-populate from saved profile
  const saved = safeGet(KEYS.PROFILE) || user?.profile || {};
  const [form, setForm] = useState({
    degree:              saved.degree              || '',
    branch:              saved.branch              || '',
    currentYear:         saved.currentYear         || '',
    experienceLevel:     saved.experienceLevel     || '',
    preferredCareerArea: saved.preferredCareerArea || '',
    skills:              saved.skills              || [],
    interests:           saved.interests           || [],
  });

  // Load catalog data for options
  useEffect(() => {
    careerAPI.getCatalog()
      .then((r) => setCatalog(r.data.data))
      .catch(() => setError('Failed to load catalog. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  const toggleArr = (field, val) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter((v) => v !== val)
        : [...prev[field], val],
    }));
  };

  const validateStep = () => {
    if (step === 0 && !form.degree) return 'Please select your degree.';
    if (step === 1 && form.skills.length === 0) return 'Please select at least one skill.';
    if (step === 2 && form.interests.length === 0) return 'Please select at least one interest.';
    return '';
  };

  const next = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep((s) => s + 1);
  };
  const back = () => { setError(''); setStep((s) => s - 1); };

  const submit = async () => {
    setError('');
    setSubmitting(true);
    try {
      // Save profile first
      await profileAPI.update(form);
      safeSet(KEYS.PROFILE, form);

      // Run assessment
      const res = await assessmentAPI.run(form);
      safeSet(KEYS.RESULTS, res.data.data);
      await refreshUser();

      navigate('/results');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader message="Loading assessment form…" />;

  return (
    <div className="page-container max-w-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
          <ClipboardList className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="section-heading">Career Assessment</h1>
        <p className="text-gray-500 mt-2 text-sm">Tell us about yourself and we'll find your best career matches</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8 gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-1.5 ${i <= step ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                i < step  ? 'bg-primary-600 border-primary-600 text-white' :
                i === step ? 'border-primary-600 text-primary-600' :
                             'border-gray-300 text-gray-400'
              }`}>{i + 1}</div>
              <span className="text-xs font-medium hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 max-w-[40px] h-0.5 ${i < step ? 'bg-primary-500' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="card p-6 sm:p-8 animate-fade-in">
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* ── Step 0: Education ── */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Education Details</h2>

            <div>
              <label className="label">Degree <span className="text-red-500">*</span></label>
              <select className="input" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}>
                <option value="">Select your degree</option>
                {catalog?.degrees?.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Branch / Specialization</label>
              <select className="input" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                <option value="">Select your branch</option>
                {catalog?.branches?.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Current Year / Status</label>
              <select className="input" value={form.currentYear} onChange={(e) => setForm({ ...form, currentYear: e.target.value })}>
                <option value="">Select year</option>
                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated', 'Post-Graduate'].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Experience Level <span className="text-red-500">*</span></label>
              <div className="flex gap-3 flex-wrap">
                {catalog?.experienceLevels?.map((lvl) => (
                  <button
                    key={lvl} type="button"
                    onClick={() => setForm({ ...form, experienceLevel: lvl })}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      form.experienceLevel === lvl
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                    }`}
                  >{lvl}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Skills ── */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Your Current Skills</h2>
            <p className="text-sm text-gray-500 mb-5">Select all skills you already have. Be honest — this improves your matches.</p>
            <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto pr-1">
              {catalog?.skills?.map((sk) => (
                <button
                  key={sk.id} type="button"
                  onClick={() => toggleArr('skills', sk.id)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                    form.skills.includes(sk.id)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >{sk.label}</button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">{form.skills.length} selected</p>
          </div>
        )}

        {/* ── Step 2: Interests ── */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Your Interests</h2>
            <p className="text-sm text-gray-500 mb-5">What areas excite you? Select all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {catalog?.interests?.map((int) => (
                <button
                  key={int.id} type="button"
                  onClick={() => toggleArr('interests', int.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    form.interests.includes(int.id)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >{int.label}</button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">{form.interests.length} selected</p>
          </div>
        )}

        {/* ── Step 3: Preferences ── */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Preferences</h2>
            <p className="text-sm text-gray-500 mb-4">Optional — helps narrow down your recommendations.</p>

            <div>
              <label className="label">Preferred Career Area</label>
              <select className="input" value={form.preferredCareerArea} onChange={(e) => setForm({ ...form, preferredCareerArea: e.target.value })}>
                <option value="">No preference</option>
                {catalog?.careerAreas?.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Summary */}
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-primary-800 mb-2">Your profile summary</p>
              <p><span className="text-gray-600">Degree:</span> <span className="font-medium">{form.degree || '—'}</span></p>
              <p><span className="text-gray-600">Branch:</span> <span className="font-medium">{form.branch || '—'}</span></p>
              <p><span className="text-gray-600">Skills selected:</span> <span className="font-medium">{form.skills.length}</span></p>
              <p><span className="text-gray-600">Interests selected:</span> <span className="font-medium">{form.interests.length}</span></p>
              <p><span className="text-gray-600">Experience:</span> <span className="font-medium">{form.experienceLevel || '—'}</span></p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-5 border-t border-gray-200">
          <button
            type="button" onClick={back} disabled={step === 0}
            className="btn-secondary disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={submitting} className="btn-primary px-8">
              {submitting ? <><ButtonSpinner /> Running assessment…</> : 'Get My Career Matches'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
