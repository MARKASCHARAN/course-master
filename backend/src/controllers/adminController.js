const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

exports.getAdminStats = async (req, res) => {
  try {
    const courses = await Course.countDocuments();
    const lessons = await Lesson.countDocuments();

    const allCourses = await Course.find();
    const batches = allCourses.reduce(
      (total, c) => total + (c.batches?.length || 0),
      0
    );

    res.json({
      courses,
      lessons,
      batches,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
