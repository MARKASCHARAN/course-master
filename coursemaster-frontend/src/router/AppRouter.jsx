import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequestReset from "../pages/RequestReset";
import ResetPassword from "../pages/ResetPassword";

import StudentDashboard from "../pages/student/StudentDashboard";
import MyCourses from "../pages/student/MyCourses";
import CoursePage from "../pages/student/CoursePage";
import LessonPlayer from "../pages/student/LessonPlayer";

import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCourse from "../pages/admin/CreateCourse";
import AddLesson from "../pages/admin/AddLesson";
import AddBatch from "../pages/admin/AddBatch";
import AddQuiz from "../pages/admin/AddQuiz";

import ProtectedRoute from "../components/ProtectedRoute";
import CourseDetails from "../pages/student/CourseDetails";

function Layout({ children }) {
  const { pathname } = useLocation();

  // Pages where Navbar should NOT appear
  const noNavbarRoutes = [
    "/login",
    "/register",
    "/request-reset",
    "/reset-password",
  ];

  const hideNavbar = noNavbarRoutes.some((p) => pathname.startsWith(p));

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request-reset" element={<RequestReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/courses"
            element={
              <ProtectedRoute role="student">
                <MyCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/course/:courseId"
            element={
              <ProtectedRoute role="student">
                <CoursePage />
              </ProtectedRoute>
            }
          />

          <Route
  path="/student/course/:courseId"
  element={
    <ProtectedRoute role="student">
      <CourseDetails />
    </ProtectedRoute>
  }
/>


          <Route
            path="/student/lesson/:lessonId"
            element={
              <ProtectedRoute role="student">
                <LessonPlayer />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-course"
            element={
              <ProtectedRoute role="admin">
                <CreateCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-lesson"
            element={
              <ProtectedRoute role="admin">
                <AddLesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-batch"
            element={
              <ProtectedRoute role="admin">
                <AddBatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-quiz"
            element={
              <ProtectedRoute role="admin">
                <AddQuiz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
