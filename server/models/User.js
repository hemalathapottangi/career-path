const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// FR1: User Profile Management
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name must be at most 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    // FR1: Profile fields
    profile: {
      degree: { type: String, default: '' },
      branch: { type: String, default: '' },
      currentYear: { type: String, default: '' },
      skills: { type: [String], default: [] },
      interests: { type: [String], default: [] },
      experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', ''], default: '' },
      preferredCareerArea: { type: String, default: '' },
    },
    // FR2 / FR6: Assessment results and selected career
    assessmentResults: { type: mongoose.Schema.Types.Mixed, default: null },
    selectedCareer: { type: String, default: '' },
    // FR6: Skill progress map  { careerId: { skillId: 'Not Started'|'In Progress'|'Completed' } }
    skillProgress: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
