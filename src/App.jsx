import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Saves from "./pages/Saves";
import People from "./pages/People";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="saves" element={<Saves />} />
          <Route path="peoples" element={<People />} />
          <Route path="poste/:id" element={<PostDetails />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
