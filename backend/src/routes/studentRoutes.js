const express = require("express");
const Joi = require("joi");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Assignment = require("../models/Assignment");
const { Quiz, QuizSubmission } = require("../models/Quiz");
const Course = require("../models/Course");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All student routes require login
router.use(protect);

/* ===================================================
   ENROLL STUDENT IN A COURSE
=================================================== */
const enrollSchema = Joi.object({
  batchName: Joi.string().min(3).required(),
});

router.post("/enroll/:courseId", async (req, res, next) => {
  try {
    const { error, value } = enrollSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const enrollment = await Enrollment.findOneAndUpdate(
      { student: req.user._id, course: req.params.courseId },
      { student: req.user._id, course: req.params.courseId, batchName: value.batchName },
      { new: true, upsert: true }
    );

    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
});

/* ===================================================
   GET STUDENT ENROLLMENTS
=================================================== */
router.get("/me/courses", async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate("course")
      .populate("completedLessons");

    res.json(enrollments);
  } catch (err) {
    next(err);
  }
});

/* ===================================================
   MARK LESSON AS COMPLETED
=================================================== */
router.post("/lessons/:lessonId/complete", async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: lesson.course,
    }).populate("course");

    if (!enrollment)
      return res.status(400).json({ message: "Not enrolled in this course" });

    // Add completed lesson
    if (!enrollment.completedLessons.includes(lesson._id)) {
      enrollment.completedLessons.push(lesson._id);
    }

    // Update progress
    const totalLessons = enrollment.course.lessons.length || 1;
    const completed = enrollment.completedLessons.length;
    enrollment.progress = Math.round((completed / totalLessons) * 100);

    await enrollment.save();

    res.json(enrollment);
  } catch (err) {
    next(err);
  }
});

/* ===================================================
   SUBMIT ASSIGNMENT
=================================================== */
const assignmentSchema = Joi.object({
  answer: Joi.string().min(5).required(),
});

router.post("/lessons/:lessonId/assignments", async (req, res, next) => {
  try {
    const { error, value } = assignmentSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const assignment = await Assignment.create({
      ...value,
      lesson: lesson._id,
      course: lesson.course,
      student: req.user._id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    next(err);
  }
});

/* ===================================================
   SUBMIT QUIZ & GET SCORE
=================================================== */
const quizSubmitSchema = Joi.object({
  answers: Joi.array().items(Joi.number().integer().min(0)).required(),
});

router.post("/quizzes/:quizId/submit", async (req, res, next) => {
  try {
    const { error, value } = quizSubmitSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    quiz.questions.forEach((q, idx) => {
      if (value.answers[idx] === q.correctIndex) score++;
    });

    const submission = await QuizSubmission.create({
      quiz: quiz._id,
      student: req.user._id,
      answers: value.answers,
      score,
    });

    res.json({
      score,
      total: quiz.questions.length,
      submissionId: submission._id,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
