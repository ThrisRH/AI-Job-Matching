const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["JS", "RC"] }, // JS: Job Seeker, RC: Recruiter
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
