const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const talentSchema = new Schema(
  {
    teamMember: { type: String, required: true },
    skill: { type: String, required: true }, // TeamMember Skill
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Talent', talentSchema);