import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = currentUser ? [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/resume', label: 'ResumAI' },
    { path: '/cover-letter', label: 'Cover Letter' }
  ] : [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#8B5CF6" />
                    <path d="M13 20L18 25L28 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">ResumAI</span>
              </Link>

              {currentUser && (
                <div className="hidden sm:flex sm:ml-8 space-x-8">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.path}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      <Link
                        to={item.path}
                        className={`${
                          isActive(item.path)
                            ? 'text-[#8B5CF6] font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        } text-sm transition-colors duration-200`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {currentUser ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                  >
                    Sign up
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8B5CF6]"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={`sm:hidden overflow-hidden bg-white border-b border-gray-100`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {currentUser ? (
              <>
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${
                        isActive(item.path)
                          ? 'text-[#8B5CF6] bg-[#8B5CF6]/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-2.5 text-sm font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-center text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsSignUpModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-6 py-2.5 text-center text-sm font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </nav>

      {/* Auth Modals */}
      <Login isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <SignUp isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </>
  );
}
