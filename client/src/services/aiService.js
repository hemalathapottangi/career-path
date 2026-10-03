/**
 * CareerPath AI Assistant — Rule-Based Mock AI
 * FR9: No API key required. Returns structured JSON with 800ms simulated delay.
 * Runs in clearly-labeled demo mode as per SRS.
 */

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Knowledge base extracted from career data
const KB = {
  careers: {
    'software developer': { skills: ['Programming', 'Data Structures', 'Git', 'Problem Solving', 'Database Basics'], category: 'Development' },
    'web developer':      { skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'], category: 'Development' },
    'data analyst':       { skills: ['Excel', 'SQL', 'Python', 'Statistics', 'Data Visualization'], category: 'Data' },
    'data scientist':     { skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'], category: 'Data' },
    'ui/ux designer':     { skills: ['UI Design', 'UX Principles', 'Figma', 'Wireframing', 'User Research'], category: 'Design' },
    'cybersecurity analyst': { skills: ['Networking', 'Linux', 'Cybersecurity Fundamentals', 'Security Tools', 'Problem Solving'], category: 'Cybersecurity' },
    'cloud engineer':     { skills: ['Linux', 'Networking', 'Cloud Fundamentals', 'Git', 'Cloud Platforms'], category: 'Cloud' },
    'devops engineer':    { skills: ['Linux', 'Git', 'CI/CD', 'Docker', 'Cloud Fundamentals'], category: 'DevOps' },
  },
  tips: [
    'Start with projects — building real things accelerates learning faster than tutorials alone.',
    'Contribute to open source on GitHub to build a portfolio that speaks for itself.',
    'LinkedIn + GitHub updated weekly makes a big difference in job searches.',
    'Focus on fundamentals first. Frameworks come and go; core concepts stay.',
    'Join communities: Discord servers, Reddit, and local meetups are great for networking.',
  ],
};

/**
 * Answer a user question using the career knowledge base
 * FR9: answerMentorQuestion(question)
 */
export async function answerMentorQuestion(question) {
  await delay(800);

  const q = question.toLowerCase();

  // Career-specific skill questions
  for (const [career, data] of Object.entries(KB.careers)) {
    if (q.includes(career)) {
      return {
        mode: 'demo',
        answer: `For **${career.replace(/\b\w/g, (c) => c.toUpperCase())}**, the key skills to learn are: ${data.skills.join(', ')}. Start with the fundamentals and build a project after each skill to reinforce your learning.`,
        suggestions: [
          `Explore the ${career.replace(/\b\w/g, (c) => c.toUpperCase())} career page for a full roadmap`,
          'Use the Career Assessment to see your match score',
          'Check the Career Explorer for related careers',
        ],
      };
    }
  }

  // Skill gap / what to learn
  if (q.includes('skill gap') || q.includes('missing') || q.includes('what to learn')) {
    return {
      mode: 'demo',
      answer: 'To identify your skill gap, run the Career Assessment. It compares your current skills against each career\'s requirements and shows you exactly what to learn next, ordered by priority (foundational skills first).',
      suggestions: ['Run the Career Assessment', 'Visit Career Details for any career to see skill gap analysis'],
    };
  }

  // Roadmap questions
  if (q.includes('roadmap') || q.includes('path') || q.includes('steps')) {
    return {
      mode: 'demo',
      answer: 'Every career in CareerPath has a step-by-step roadmap. Select a career as your target and visit its detail page to see the full roadmap, learning resources, and beginner projects.',
      suggestions: ['Visit any career from Career Explorer', 'Set a target career on your Dashboard'],
    };
  }

  // Getting started
  if (q.includes('start') || q.includes('begin') || q.includes('new') || q.includes('fresher')) {
    return {
      mode: 'demo',
      answer: 'Great starting point: (1) Complete your profile in Career Assessment, (2) Review your Potential Career Matches, (3) Pick a career and study the roadmap, (4) Work through the recommended resources skill by skill, (5) Build the suggested projects.',
      suggestions: ['Start Career Assessment', 'Explore all careers', 'Check Dashboard for progress tracking'],
    };
  }

  // Best career / which career
  if (q.includes('best career') || q.includes('which career') || q.includes('good career')) {
    return {
      mode: 'demo',
      answer: 'The best career depends on your skills, interests, and degree. Run the Career Assessment — it computes a personalised Match Score for each career using your exact profile. Careers scoring 30+ are shown as Potential Career Matches.',
      suggestions: ['Run Career Assessment', 'Browse Career Explorer'],
    };
  }

  // Progress / dashboard
  if (q.includes('progress') || q.includes('dashboard') || q.includes('track')) {
    return {
      mode: 'demo',
      answer: 'Your Dashboard tracks progress for your selected target career. Each skill can be marked as Not Started, In Progress, or Completed. Overall progress is calculated as (completed skills / total skills) × 100.',
      suggestions: ['Visit My Dashboard', 'Select a target career first'],
    };
  }

  // Generic tip
  const tip = KB.tips[Math.floor(Math.random() * KB.tips.length)];
  return {
    mode: 'demo',
    answer: `I'm running in demo mode and answer questions about CareerPath careers and skills. Here's a tip: ${tip}\n\nTry asking me something like "What skills do I need for web development?" or "How do I start as a data analyst?"`,
    suggestions: [
      'Ask about a specific career (e.g., "What skills for cloud engineer?")',
      'Ask "How do I identify my skill gap?"',
      'Ask "How do I get started?"',
    ],
  };
}

/**
 * Get career recommendations (rule-based, mirrors server logic for offline use)
 * FR2: getCareerRecommendations(profile)
 */
export async function getCareerRecommendations(profile) {
  await delay(800);
  // Actual scoring is done server-side; this is a client-side fallback hint
  return {
    mode: 'demo',
    message: 'For full recommendations, use the Career Assessment page which runs the complete scoring engine.',
  };
}

/**
 * Generate roadmap summary for a career
 * FR5: generateRoadmap(careerId)
 */
export async function generateRoadmap(careerId) {
  await delay(800);
  return {
    mode: 'demo',
    message: `Full roadmap available on the ${careerId} career details page.`,
  };
}
