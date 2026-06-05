const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctIndex: Number,
    },
  ],
});

const quizSubmissionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [Number],
  score: Number,
});

// EXPORT PROPERLY
const Quiz = mongoose.model("Quiz", quizSchema);
const QuizSubmission = mongoose.model("QuizSubmission", quizSubmissionSchema);

module.exports = { Quiz, QuizSubmission };
