import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, ClipboardList, BarChart2, Map, TrendingUp,
  Search, CheckCircle, Users, Zap, BookOpen, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const HOW_IT_WORKS = [
  { step: 1, icon: <ClipboardList className="w-6 h-6" />, title: 'Complete Your Profile', desc: 'Tell us your degree, branch, skills, and interests. Takes under 3 minutes.' },
  { step: 2, icon: <BarChart2     className="w-6 h-6" />, title: 'Get Career Matches',    desc: 'Our engine scores all 8 careers against your profile and ranks them by fit.' },
  { step: 3, icon: <Search        className="w-6 h-6" />, title: 'Analyse Skill Gaps',    desc: 'See exactly which skills you already have and which ones to learn next.' },
  { step: 4, icon: <Map           className="w-6 h-6" />, title: 'Follow Your Roadmap',   desc: 'Step-by-step learning path with curated resources and project ideas.' },
  { step: 5, icon: <TrendingUp    className="w-6 h-6" />, title: 'Track Your Progress',   desc: 'Mark skills as In Progress or Completed and watch your dashboard update.' },
];

const WHY_CAREERPATH = [
  { icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: 'Transparent Scoring',    desc: 'No black boxes. See exactly why each career matched your profile.' },
  { icon: <Zap         className="w-5 h-5 text-yellow-500" />, title: 'Instant Results',        desc: 'Recommendations computed in under 100ms — no waiting.' },
  { icon: <BookOpen    className="w-5 h-5 text-blue-500" />,   title: 'Free Resources Only',    desc: 'All learning resources link to free, high-quality external content.' },
  { icon: <Users       className="w-5 h-5 text-purple-500" />, title: 'Built for Beginners',    desc: 'Simple language, clear steps. No prior career knowledge needed.' },
  { icon: <Compass     className="w-5 h-5 text-primary-500" />, title: '8 Tech Careers Covered', desc: 'Dev, Data, Design, Cyber, Cloud, DevOps — all in one place.' },
  { icon: <TrendingUp  className="w-5 h-5 text-red-500" />,    title: 'Progress Tracking',      desc: 'Dashboard shows your learning journey clearly at every stage.' },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <Compass className="w-4 h-4" /> Personalized Career Guidance
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Find Your Career Path
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover tech careers that match your skills and interests, identify gaps, follow structured roadmaps, and track your learning — all in one free platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? '/assessment' : '/register'}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
            >
              Start Career Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <Search className="w-5 h-5" /> Explore Careers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '8',    label: 'Tech Careers' },
              { value: '30+',  label: 'Skill Resources' },
              { value: '100%', label: 'Free to Use' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-primary-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">How It Works</h2>
            <p className="text-gray-500 mt-2">Five simple steps from profile to career clarity</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="card p-5 text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CareerPath ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why CareerPath?</h2>
            <p className="text-gray-500 mt-2">Designed specifically for students and fresh graduates</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CAREERPATH.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Ready to find your path?</h2>
          <p className="text-primary-100 mb-8">It takes less than 3 minutes to complete your profile and see your career matches.</p>
          <Link
            to={isAuthenticated ? '/assessment' : '/register'}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
