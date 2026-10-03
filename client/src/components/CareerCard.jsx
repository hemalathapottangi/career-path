import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BookOpen, TrendingUp } from 'lucide-react';

const CATEGORY_COLORS = {
  Development:   'bg-blue-100   text-blue-800',
  Data:          'bg-purple-100 text-purple-800',
  Design:        'bg-pink-100   text-pink-800',
  Cybersecurity: 'bg-red-100    text-red-800',
  Cloud:         'bg-sky-100    text-sky-800',
  DevOps:        'bg-orange-100 text-orange-800',
};

const DIFFICULTY_COLORS = {
  'Beginner-Friendly': 'bg-green-100  text-green-700',
  'Intermediate':      'bg-yellow-100 text-yellow-700',
  'Advanced':          'bg-red-100    text-red-700',
};

/**
 * CareerCard — FR3 results card & FR7 explorer card
 * Shows: title, description, match score (if given), skill counts, View Career button
 */
export default function CareerCard({ career, showScore = false }) {
  const {
    careerId,
    id,
    title,
    category,
    difficulty,
    shortDescription,
    matchScore,
    explanation,
    skillGap,
  } = career;

  const careerIdResolved = careerId || id;

  return (
    <div className="card p-5 flex flex-col gap-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`badge ${CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700'}`}>{category}</span>
            <span className={`badge ${DIFFICULTY_COLORS[difficulty] || 'bg-gray-100 text-gray-700'}`}>{difficulty}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>

        {showScore && matchScore !== undefined && (
          <div className="flex-shrink-0 text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 ${
              matchScore >= 70 ? 'border-green-400 text-green-700 bg-green-50' :
              matchScore >= 45 ? 'border-yellow-400 text-yellow-700 bg-yellow-50' :
              'border-gray-300 text-gray-600 bg-gray-50'
            }`}>
              {matchScore}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">match</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{shortDescription}</p>

      {/* Explanation — FR2 match explanation */}
      {explanation && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-3">
          <p className="text-xs text-primary-700 leading-relaxed">
            <span className="font-semibold">Why this matches: </span>{explanation}
          </p>
        </div>
      )}

      {/* Skill counts */}
      {skillGap && (
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>{skillGap.matchCount} skill{skillGap.matchCount !== 1 ? 's' : ''} matched</span>
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span>{skillGap.gapCount} to learn</span>
          </span>
        </div>
      )}

      {/* CTA */}
      <Link
        to={`/careers/${careerIdResolved}`}
        className="btn-primary mt-auto self-start text-sm"
      >
        View Career <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
