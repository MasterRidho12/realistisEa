import React from 'react';
import { useData } from '../../context/DataContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminPage = () => {
  const { isAdminLoggedIn } = useData();

  // If not logged in, render the dedicated centered Login card
  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  // If logged in, render the standalone Full-screen Admin Dashboard
  return <AdminDashboard />;
};

export default AdminPage;
