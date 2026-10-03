/**
 * localStorage helpers — SRS Appendix E
 * Keys: careerpath_profile, careerpath_results, careerpath_selectedCareer, careerpath_progress
 * NFR3: Corrupted data falls back to empty default safely.
 */

const KEYS = {
  TOKEN:           'careerpath_token',
  USER:            'careerpath_user',
  PROFILE:         'careerpath_profile',
  RESULTS:         'careerpath_results',
  SELECTED_CAREER: 'careerpath_selectedCareer',
  PROGRESS:        'careerpath_progress',
};

const safeGet = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const safeSet = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota exceeded — silently skip */ }
};

const remove = (key) => {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
};

// NFR1: Clear all saved data
const clearAll = () => {
  Object.values(KEYS).forEach(remove);
};

export { KEYS, safeGet, safeSet, remove, clearAll };
