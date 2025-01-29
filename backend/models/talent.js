const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const talentSchema = new Schema(
  {
    team: { type: String, required: true },
    skill: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },  
        projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
      
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Talent', talentSchema);