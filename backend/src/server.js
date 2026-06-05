const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// ✅ MUST COME FIRST
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ⬅️ WRONG earlier (admin route placed before express.json())
// ⬅️ CORRECT order:
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); // admin should be after others

app.get("/", (req, res) => {
  res.send("CourseMaster API running");
});

// MUST BE LAST
app.use(errorHandler);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
