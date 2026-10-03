const { CAREERS, SKILLS_CATALOG, INTERESTS_CATALOG, DEGREE_OPTIONS, BRANCH_OPTIONS, EXPERIENCE_LEVELS, CAREER_AREAS } = require('../data/careersData');
const { analyzeSkillGap } = require('../utils/recommendationEngine');

// FR7: Get all careers (Career Explorer)
const getAllCareers = (req, res) => {
  const { search, category, difficulty, interest } = req.query;

  let results = CAREERS.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    difficulty: c.difficulty,
    shortDescription: c.shortDescription,
    requiredSkills: c.requiredSkills,
    relatedInterests: c.relatedInterests,
  }));

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'All') {
    results = results.filter((c) => c.category === category);
  }
  if (difficulty && difficulty !== 'All') {
    results = results.filter((c) => c.difficulty === difficulty);
  }
  if (interest) {
    results = results.filter((c) => c.relatedInterests.includes(interest));
  }

  res.json({ success: true, data: { careers: results, total: results.length } });
};

// FR4: Get full career details by id
const getCareerById = (req, res) => {
  const career = CAREERS.find((c) => c.id === req.params.id);
  if (!career) return res.status(404).json({ success: false, message: 'Career not found.' });
  res.json({ success: true, data: career });
};

// FR4: Skill-gap analysis for a specific career given user's skills
const getSkillGap = (req, res) => {
  const career = CAREERS.find((c) => c.id === req.params.id);
  if (!career) return res.status(404).json({ success: false, message: 'Career not found.' });

  const userSkills = req.user ? (req.user.profile && req.user.profile.skills) || [] : [];
  const gap = analyzeSkillGap(career, userSkills);
  res.json({ success: true, data: gap });
};

// Get catalog data for profile form
const getCatalogData = (req, res) => {
  res.json({
    success: true,
    data: {
      skills: SKILLS_CATALOG,
      interests: INTERESTS_CATALOG,
      degrees: DEGREE_OPTIONS,
      branches: BRANCH_OPTIONS,
      experienceLevels: EXPERIENCE_LEVELS,
      careerAreas: CAREER_AREAS,
      categories: ['All', 'Development', 'Data', 'Design', 'Cybersecurity', 'Cloud', 'DevOps'],
    },
  });
};

module.exports = { getAllCareers, getCareerById, getSkillGap, getCatalogData };
