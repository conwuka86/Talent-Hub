const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    skills: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Talent' },
        name: String,  // Team Name
        skill: String, // Talent Skill
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);


