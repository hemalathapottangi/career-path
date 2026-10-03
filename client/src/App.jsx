import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Layout
import Navbar      from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Landing        from './pages/Landing.jsx';
import Login          from './pages/Login.jsx';
import Register       from './pages/Register.jsx';
import Assessment     from './pages/Assessment.jsx';
import Results        from './pages/Results.jsx';
import CareerDetail   from './pages/CareerDetail.jsx';
import Dashboard      from './pages/Dashboard.jsx';
import Explorer       from './pages/Explorer.jsx';
import About          from './pages/About.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/"          element={<Landing />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/register"  element={<Register />} />
              <Route path="/explore"   element={<Explorer />} />
              <Route path="/about"     element={<About />} />

              {/* Career detail — public but skill-gap requires auth */}
              <Route path="/careers/:id" element={<CareerDetail />} />

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/results"    element={<Results />} />
                <Route path="/dashboard"  element={<Dashboard />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>
                <span className="font-semibold text-primary-600">CareerPath</span> — Personalized Career Guidance & Skill Development Platform
              </p>
              <p className="mt-1">
                Built as per SRS by p.hemalatha · Department of CSE · Satya Institute of Technology and Management
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
