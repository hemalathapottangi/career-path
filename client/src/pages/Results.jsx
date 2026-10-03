import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart2, RefreshCw, Search, AlertCircle } from 'lucide-react';
import { assessmentAPI } from '../services/api.js';
import { safeGet, KEYS } from '../utils/storage.js';
import CareerCard from '../components/CareerCard.jsx';
import Loader from '../components/Loader.jsx';

export default function Results() {
  const navigate = useNavigate();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    // Try cache first for instant load, then verify with server
    const cached = safeGet(KEYS.RESULTS);
    if (cached) { setData(cached); setLoading(false); }

    assessmentAPI.getResults()
      .then((r) => { if (r.data.data) setData(r.data.data); })
      .catch(() => { /* use cached */ })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Loading your career matches…" />;

  if (!data) {
    return (
      <div className="page-container max-w-lg text-center">
        <div className="card p-10">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No results yet</h2>
          <p className="text-gray-500 mb-6">Run the Career Assessment to see your matches.</p>
          <Link to="/assessment" className="btn-primary">Start Assessment</Link>
        </div>
      </div>
    );
  }

  const { recommendations = [], profile } = data;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-5 h-5 text-primary-600" />
            <h1 className="section-heading">Your Career Matches</h1>
          </div>
          <p className="text-sm text-gray-500">
            Based on {profile?.skills?.length || 0} skills and {profile?.interests?.length || 0} interests.{' '}
            <span className="text-primary-600 font-medium">Potential Career Matches</span> — not guarantees.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => navigate('/assessment')} className="btn-secondary text-sm">
            <RefreshCw className="w-4 h-4" /> Retake
          </button>
          <Link to="/explore" className="btn-ghost text-sm">
            <Search className="w-4 h-4" /> Explorer
          </Link>
        </div>
      </div>

      {/* Score weights note */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 text-xs text-blue-700 flex flex-wrap gap-4">
        <span>⚖️ Scoring weights:</span>
        <span>Skills 50%</span>
        <span>Interests 35%</span>
        <span>Degree 15%</span>
        <span>· Threshold: 30/100</span>
      </div>

      {/* Results */}
      {recommendations.length === 0 ? (
        <div className="card p-10 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-800 mb-2">No close career matches found</h2>
          <p className="text-gray-500 mb-6">
            No close career matches were found based on your current profile. Try adding more skills or interests.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/assessment" className="btn-primary">Update Profile</Link>
            <Link to="/explore"    className="btn-secondary">Explore All Careers</Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-5">
            Found <span className="font-semibold text-primary-700">{recommendations.length}</span> career{recommendations.length !== 1 ? 's' : ''} matching your profile
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendations.map((career) => (
              <CareerCard key={career.careerId} career={career} showScore />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
