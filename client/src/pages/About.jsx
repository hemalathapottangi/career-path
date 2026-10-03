import React, { useState } from 'react';
import { Compass, MessageCircle, Send, Bot } from 'lucide-react';
import { answerMentorQuestion } from '../services/aiService.js';
import { ButtonSpinner } from '../components/Loader.jsx';

export default function About() {
  const [question, setQuestion] = useState('');
  const [answer,   setAnswer]   = useState(null);
  const [loading,  setLoading]  = useState(false);

  const suggestions = [
    'What skills do I need for web development?',
    'How do I get started as a data analyst?',
    'What is the roadmap for cybersecurity?',
    'How do I identify my skill gap?',
  ];

  const ask = async (q) => {
    const query = q || question.trim();
    if (!query) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await answerMentorQuestion(query);
      setAnswer(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl mb-4">
          <Compass className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About CareerPath</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          A web-based career guidance platform designed to help students and fresh graduates discover suitable tech careers.
        </p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {[
          { title: 'Project', content: 'CareerPath — Personalized Career Guidance & Skill Development Platform' },
          { title: 'Prepared by', content: 'p.hemalatha' },
          { title: 'Department', content: 'Department of Computer Science and Engineering' },
          { title: 'Institution', content: 'Satya Institute of Technology and Management' },
          { title: 'Tech Stack', content: 'React, Node.js, Express, MongoDB, Tailwind CSS' },
          { title: 'SRS Version', content: 'v1.0 — September 29, 2026' },
        ].map((item) => (
          <div key={item.title} className="card p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.title}</p>
            <p className="text-gray-900 font-medium">{item.content}</p>
          </div>
        ))}
      </div>

      {/* AI Assistant — FR9 */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-gray-900">CareerPath AI Assistant</h2>
          <span className="badge bg-yellow-100 text-yellow-700 text-xs">Demo Mode</span>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Ask questions about careers, skills, and learning paths. Runs entirely client-side — no API key required.
        </p>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => (
            <button
              key={s} onClick={() => { setQuestion(s); ask(s); }}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full transition-colors"
            >{s}</button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text" value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
            placeholder="Ask me anything about tech careers…"
            className="input flex-1"
          />
          <button onClick={() => ask()} disabled={loading || !question.trim()} className="btn-primary px-4">
            {loading ? <ButtonSpinner /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Answer */}
        {answer && (
          <div className="mt-5 bg-primary-50 border border-primary-100 rounded-xl p-4 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-primary-600">CareerPath AI (Demo Mode)</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{answer.answer}</p>
            {answer.suggestions?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">Suggestions:</p>
                <ul className="space-y-1">
                  {answer.suggestions.map((s) => (
                    <li key={s} className="text-xs text-primary-700 flex items-start gap-1.5">
                      <span className="mt-0.5">→</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
