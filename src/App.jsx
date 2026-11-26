import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { LandingPage } from './pages/LandingPage';
import { AdminPage } from './pages/admin/AdminPage';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Commercial Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Private Standalone Admin Management Dashboard */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
