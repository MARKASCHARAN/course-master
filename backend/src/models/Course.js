const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: String,
    instructor: { type: String, required: true, index: true },
    syllabus: String,
    price: { type: Number, default: 0 },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    batches: [batchSchema],
  },
  { timestamps: true }
);

courseSchema.index({ title: "text", instructor: "text", description: "text" });


module.exports = mongoose.model("Course", courseSchema);
