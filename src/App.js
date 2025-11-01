// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage'; // For Login/Register
import DashboardPage from './pages/DashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AddProductPage from './pages/AddProductPage';
import UserListPage from './pages/UserListPage'; // New page for admin to manage users
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/Auth/PrivateRoute'; // To protect routes
import { ROLES } from './utils/constants'; // For role-based access

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main className="container main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthPage />} />
              {/* Product routes - could be public or protected based on your needs */}
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MANAGER]} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />}>
                <Route path="/products/add" element={<AddProductPage />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="/users" element={<UserListPage />} />
                {/* Potentially other admin-only routes like /users/:id/edit */}
              </Route>

              <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;