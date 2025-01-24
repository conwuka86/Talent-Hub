const mongoose = require("mongoose");

const TalentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: { type: [String], required: true },
    experience_years: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    contact_info: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Talent", TalentSchema);
