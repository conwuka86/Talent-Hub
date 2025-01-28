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
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Talent'}],
  },
  { timestamps: true }
);

module.exports = mongoose.model('POST', projectSchema);
