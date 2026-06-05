const express = require("express");
const Joi = require("joi");

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const Assignment = require("../models/Assignment");
const { Quiz } = require("../models/Quiz");

const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Admin must be logged in
router.use(protect, isAdmin);

/* ----------------------------
   JOI VALIDATION SCHEMAS
----------------------------- */

// Course validation
const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  instructor: Joi.string().required(),
  syllabus: Joi.string().allow(""),
  price: Joi.number().min(0).default(0),
  category: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()).default([]),
});

// Lesson validation
const lessonSchema = Joi.object({
  title: Joi.string().required(),
  videoUrl: Joi.string().uri().required(),
  order: Joi.number().min(1).required(),
});

// Batch validation
const batchSchema = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.date().required(),
});

// Quiz validation
const quizSchema = Joi.object({
  questions: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().required(),
        options: Joi.array().items(Joi.string()).length(4).required(),
        correctIndex: Joi.number().min(0).max(3).required(),
      })
    )
    .min(1)
    .required(),
});

/* ----------------------------
   COURSE CRUD
----------------------------- */

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

    const updated = await Course.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Course not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete course
router.delete("/courses/:id", async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted" });
  } catch (err) {
    next(err);
  }
});

/* ----------------------------
   ADD LESSON
----------------------------- */

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

/* ----------------------------
   ADD BATCH
----------------------------- */

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

/* ----------------------------
   ADD QUIZ
----------------------------- */

router.post(
  "/courses/:courseId/lessons/:lessonId/quizzes",
  async (req, res, next) => {
    try {
      const { error, value } = quizSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const quiz = await Quiz.create({
        course: req.params.courseId,
        lesson: req.params.lessonId,
        questions: value.questions,
      });

      res.status(201).json(quiz);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
