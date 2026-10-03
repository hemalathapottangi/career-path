/**
 * CareerPath Recommendation Engine
 * SRS Appendix D — Recommendation Logic Reference
 *
 * MatchScore = 100 × (0.50 × skillScore + 0.35 × interestScore + 0.15 × degreeScore)
 * Threshold  = 30 (careers below this are excluded from results)
 */

const { CAREERS } = require('../data/careersData');

const WEIGHTS = { skill: 0.50, interest: 0.35, degree: 0.15 };
const THRESHOLD = 30;

/**
 * Compute degree relevance score (0, 0.5, or 1)
 */
function getDegreeScore(career, branch) {
  if (!branch) return 0;
  if (career.relevantDegrees.includes(branch)) return 1;
  if (career.partlyRelevantDegrees && career.partlyRelevantDegrees.includes(branch)) return 0.5;
  return 0;
}

/**
 * Compute skill match score
 * = matching skills / total required skills  (capped at 1)
 */
function getSkillScore(career, userSkills) {
  if (!career.requiredSkills.length) return 0;
  const userSet = new Set(userSkills);
  const matched = career.requiredSkills.filter((s) => userSet.has(s)).length;
  return matched / career.requiredSkills.length;
}

/**
 * Compute interest match score
 * = matching interests / total career related interests (capped at 1)
 */
function getInterestScore(career, userInterests) {
  if (!career.relatedInterests.length) return 0;
  const userSet = new Set(userInterests);
  const matched = career.relatedInterests.filter((i) => userSet.has(i)).length;
  return Math.min(matched / career.relatedInterests.length, 1);
}

/**
 * Generate a human-readable explanation for the match
 * FR2: "Your profile matches this career because..."
 */
function generateExplanation(career, profile, skillScore, interestScore, degreeScore) {
  const { skills = [], interests = [], branch = '' } = profile;
  const userSkillSet = new Set(skills);
  const userInterestSet = new Set(interests);

  const matchedSkills = career.requiredSkills.filter((s) => userSkillSet.has(s));
  const matchedInterests = career.relatedInterests.filter((i) => userInterestSet.has(i));

  const parts = [];

  if (matchedSkills.length > 0) {
    const labels = matchedSkills.slice(0, 3).join(', ');
    parts.push(`you already have ${matchedSkills.length} required skill${matchedSkills.length > 1 ? 's' : ''} (${labels})`);
  }

  if (matchedInterests.length > 0) {
    const labels = matchedInterests.slice(0, 2).join(', ');
    parts.push(`your interests include ${labels}`);
  }

  if (degreeScore === 1 && branch) {
    parts.push(`your ${branch} background is highly relevant`);
  } else if (degreeScore === 0.5 && branch) {
    parts.push(`your ${branch} background is partly relevant`);
  }

  if (parts.length === 0) {
    return 'This career aligns with your overall profile. Explore it to see if it interests you.';
  }

  return `Your profile matches this career because ${parts.join(', and ')}.`;
}

/**
 * Perform skill-gap analysis for a specific career
 * FR4: Already Have, Need to Learn, Recommended Next Skills
 */
function analyzeSkillGap(career, userSkills) {
  const userSet = new Set(userSkills);
  const alreadyHave = career.requiredSkills.filter((s) => userSet.has(s));
  const needToLearn = career.requiredSkills.filter((s) => !userSet.has(s));

  // Sort by predefined priority (foundational skills first)
  const priority = career.skillPriority || {};
  const recommendedNext = [...needToLearn].sort(
    (a, b) => (priority[a] || 99) - (priority[b] || 99)
  );

  return {
    alreadyHave,
    needToLearn,
    recommendedNext,
    gapCount: needToLearn.length,
    matchCount: alreadyHave.length,
    totalRequired: career.requiredSkills.length,
  };
}

/**
 * Main recommendation function
 * Returns all careers scored ≥ THRESHOLD, sorted by matchScore descending
 */
function getRecommendations(profile) {
  const {
    skills = [],
    interests = [],
    branch = '',
    experienceLevel = '',
    preferredCareerArea = '',
  } = profile;

  const results = CAREERS.map((career) => {
    const skillScore = getSkillScore(career, skills);
    const interestScore = getInterestScore(career, interests);
    const degreeScore = getDegreeScore(career, branch);

    const matchScore = Math.round(
      100 * (WEIGHTS.skill * skillScore + WEIGHTS.interest * interestScore + WEIGHTS.degree * degreeScore)
    );

    const explanation = generateExplanation(career, profile, skillScore, interestScore, degreeScore);
    const skillGap = analyzeSkillGap(career, skills);

    return {
      careerId: career.id,
      title: career.title,
      category: career.category,
      difficulty: career.difficulty,
      shortDescription: career.shortDescription,
      matchScore,
      explanation,
      skillGap,
      weights: {
        skillScore: Math.round(skillScore * 100),
        interestScore: Math.round(interestScore * 100),
        degreeScore: Math.round(degreeScore * 100),
      },
    };
  });

  // FR2: Only show careers at or above threshold, sorted descending
  return results
    .filter((r) => r.matchScore >= THRESHOLD)
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { getRecommendations, analyzeSkillGap, THRESHOLD, WEIGHTS };
