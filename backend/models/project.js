const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true }, // Project Name
    description: { type: String, required: true }, // Project Description
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // User reference
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('POST', projectSchema);
