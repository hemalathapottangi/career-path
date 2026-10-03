/**
 * In-memory data store — fallback when no MongoDB URI is provided.
 * Data resets on server restart (demo mode).
 */
const memoryStore = {
  users: [],       // { _id, name, email, password, profile, assessmentResults, selectedCareer, skillProgress, createdAt }
  nextId: 1,
};

module.exports = memoryStore;
