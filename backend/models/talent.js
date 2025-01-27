const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const talentSchema = new Schema(
  {
    skill: { type: String, required: true },
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