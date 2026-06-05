const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answer: String, // text or drive link
    score: Number,
    reviewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
