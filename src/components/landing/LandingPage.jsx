import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRobot, FaRegClock, FaRegFileAlt, FaMagic } from 'react-icons/fa';
import { HiOutlineTemplate, HiOutlineDocumentText } from 'react-icons/hi';
import { BsSpeedometer } from 'react-icons/bs';
import SignUp from '../auth/SignUp';

const features = [
  {
    icon: <FaRobot className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'AI-Powered Writing',
    description: 'Our advanced AI analyzes your experience and generates professional, tailored content for your resume.',
    delay: 0.2
  },
  {
    icon: <HiOutlineTemplate className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'ATS-Friendly Templates',
    description: 'Choose from professionally designed templates that are optimized for Applicant Tracking Systems.',
    delay: 0.4
  },
  {
    icon: <FaRegClock className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'Quick Generation',
    description: 'Create a professional resume in minutes, not hours. Let AI handle the writing while you focus on the content.',
    delay: 0.6
  },
  {
    icon: <FaMagic className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'Smart Formatting',
    description: 'Automatic formatting and layout optimization ensures your resume looks perfect on any device.',
    delay: 0.8
  }
];

const howItWorks = [
  {
    icon: <FaRegFileAlt className="h-8 w-8 text-[#8B5CF6]" />,
    title: '1. Enter Your Details',
    description: 'Input your work experience, skills, and achievements.',
    delay: 0.2
  },
  {
    icon: <BsSpeedometer className="h-8 w-8 text-[#8B5CF6]" />,
    title: '2. AI Generation',
    description: 'Our AI crafts compelling content and optimizes your resume.',
    delay: 0.4
  },
  {
    icon: <HiOutlineDocumentText className="h-8 w-8 text-[#8B5CF6]" />,
    title: '3. Download & Apply',
    description: 'Export your polished resume and start applying to jobs.',
    delay: 0.6
  }
];

export default function LandingPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Build Your Resume{' '}
              <span className="text-[#8B5CF6]">With AI</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setIsSignUpModalOpen(true)}
                  className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                >
                  Get Started <span className="ml-2">→</span>
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Resume Preview Section */}
        <div className="relative mt-20 mb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white transform -skew-y-6"></div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex">
                  {/* Left Preview */}
                  <div className="w-2/3 p-8 border-r border-gray-100">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-3xl font-bold text-gray-900">John Developer</h2>
                        <p className="text-[#8B5CF6] mt-1">Senior Software Engineer</p>
                      </div>
                      
                      {/* Experience */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between">
                              <p className="font-medium">Tech Solutions Inc.</p>
                              <p className="text-gray-500">2020 - Present</p>
                            </div>
                            <p className="text-[#8B5CF6] text-sm">Lead Developer</p>
                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                              <li>• Led development of cloud-native applications</li>
                              <li>• Managed team of 5 developers</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Preview */}
                  <div className="w-1/3 bg-gray-50 p-8">
                    <div className="space-y-6">
                      {/* Contact */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>john@example.com</p>
                          <p>(555) 123-4567</p>
                          <p>San Francisco, CA</p>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                        <div>
                          <p className="font-medium">Computer Science, BS</p>
                          <p className="text-sm text-gray-600">Tech University</p>
                          <p className="text-sm text-gray-500">2016 - 2020</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-[#8B5CF6]/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#8B5CF6]/20 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50 rounded-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Our AI Resume Builder?
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Create a professional resume that stands out and gets you noticed by hiring managers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                  <p className="text-gray-600">
                      {feature.description}
                    </p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

        {/* How it Works Section */}
        <div className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Build Your Resume in 3 Simple Steps
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes resume creation quick and effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
        </div>
      </div>

      {/* CTA Section */}
        <div className="py-24 bg-[#8B5CF6] rounded-3xl">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Join thousands of successful job seekers who found their dream jobs
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="inline-flex items-center px-8 py-3 text-base font-medium text-[#8B5CF6] bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
              >
                Get Started Free
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Resume AI Builder. All rights reserved.
          </p>
      </footer>
      </div>

      {/* Sign Up Modal */}
      <SignUp isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </div>
  );
}
