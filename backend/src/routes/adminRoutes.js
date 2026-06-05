const express = require("express");
const Joi = require("joi");

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const Assignment = require("../models/Assignment");
const { Quiz } = require("../models/Quiz");

const { protect, isAdmin } = require("../middleware/auth");
const { getAdminStats } = require("../controllers/adminController");

const router = express.Router();

// Admin Stats
router.get("/stats", protect, isAdmin, getAdminStats);

// Admin only for everything below
router.use(protect, isAdmin);

/* ============================================
   COURSE SCHEMA + CRUD
============================================ */

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  instructor: Joi.string().required(),
  syllabus: Joi.string().allow(""),
  price: Joi.number().min(0).default(0),
  category: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()).default([]),
});

// Create course
router.post("/courses", async (req, res, next) => {
  try {
    const { error, value } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const course = await Course.create(value);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

// Update course
router.put("/courses/:id", async (req, res, next) => {
  try {
    const { error, value } = courseSchema.min(1).validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const course = await Course.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    next(err);
  }
});

// Delete course
router.delete("/courses/:id", async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted" });
  } catch (err) {
    next(err);
  }
});

/* ============================================
   ADD LESSON
============================================ */

const lessonSchema = Joi.object({
  title: Joi.string().required(),
  videoUrl: Joi.string().uri().allow(""),
  order: Joi.number().integer().min(1).default(1),
});

router.post("/courses/:courseId/lessons", async (req, res, next) => {
  try {
    const { error, value } = lessonSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const lesson = await Lesson.create({
      ...value,
      course: req.params.courseId,
    });

    await Course.findByIdAndUpdate(req.params.courseId, {
      $addToSet: { lessons: lesson._id },
    });

    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
});

/* ============================================
   ADD BATCH
============================================ */

const batchSchema = Joi.object({
  name: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
});

router.post("/courses/:courseId/batches", async (req, res, next) => {
  try {
    const { error, value } = batchSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.batches.push(value);
    await course.save();

    res.json(course.batches);
  } catch (err) {
    next(err);
  }
});

/* ============================================
   ADD QUIZ
============================================ */

const quizSchema = Joi.object({
  questions: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().required(),
        options: Joi.array().items(Joi.string()).min(2).required(),
        correctIndex: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

router.post("/courses/:courseId/lessons/:lessonId/quizzes", async (req, res, next) => {
  try {
    const { error, value } = quizSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const quiz = await Quiz.create({
      ...value,
      course: req.params.courseId,
      lesson: req.params.lessonId,
    });

    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
