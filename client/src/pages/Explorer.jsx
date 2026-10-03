import React, { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { careerAPI } from '../services/api.js';
import CareerCard from '../components/CareerCard.jsx';
import Loader from '../components/Loader.jsx';

const CATEGORIES  = ['All', 'Development', 'Data', 'Design', 'Cybersecurity', 'Cloud', 'DevOps'];
const DIFFICULTIES = ['All', 'Beginner-Friendly', 'Intermediate', 'Advanced'];

export default function Explorer() {
  const [careers,  setCareers]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    careerAPI.getAll()
      .then((r) => setCareers(r.data.data.careers))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Client-side filter (server also supports it, but this is instant)
  const filtered = careers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.shortDescription.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    const matchCat    = category   === 'All' || c.category   === category;
    const matchDiff   = difficulty === 'All' || c.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const clearFilters = () => { setSearch(''); setCategory('All'); setDifficulty('All'); };
  const hasFilters   = search || category !== 'All' || difficulty !== 'All';

  if (loading) return <Loader message="Loading careers…" />;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-primary-600" />
          <h1 className="section-heading">Career Explorer</h1>
        </div>
        <p className="text-gray-500 text-sm">Browse all 8 tech careers — no account required</p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers…"
            className="input pl-9"
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="input w-40"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Difficulty */}
        <select
          value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
          className="input w-44"
        >
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button onClick={clearFilters} className="btn-ghost text-sm flex-shrink-0">
            <X className="w-4 h-4" /> Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <strong>{filtered.length}</strong> of {careers.length} careers
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No careers match your search</p>
          <p className="text-gray-400 text-sm mt-1">Try different keywords or clear the filters</p>
          <button onClick={clearFilters} className="btn-secondary mt-4 text-sm">
            <X className="w-4 h-4" /> Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CareerCard key={c.id} career={c} showScore={false} />
          ))}
        </div>
      )}
    </div>
  );
}
