import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaMagic, FaRocket, FaRegClock, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { HiOutlineTemplate, HiOutlineDocumentText } from 'react-icons/hi';
import { BsGoogle } from 'react-icons/bs';

const features = [
  {
    icon: <FaMagic className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'AI-Powered Content Generation',
    description: 'Leverage Google\'s Gemini AI to create compelling resumes and cover letters tailored to your industry.',
    delay: 0.2
  },
  {
    icon: <HiOutlineTemplate className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of ATS-friendly templates designed by HR professionals.',
    delay: 0.4
  },
  {
    icon: <FaRegClock className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'Real-time Preview',
    description: 'See changes instantly as you edit, ensuring your document looks perfect before export.',
    delay: 0.6
  },
  {
    icon: <FaRocket className="h-6 w-6 text-[#8B5CF6]" />,
    title: 'Quick Export',
    description: 'Export your documents in multiple formats including PDF and Word, ready for submission.',
    delay: 0.8
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    content: 'The AI suggestions helped me highlight achievements I would have otherwise overlooked. Landed my dream job!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    delay: 0.2
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    content: 'The modern templates and real-time preview feature made creating my resume a breeze.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    delay: 0.4
  }
];

export default function LandingPage() {
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
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors duration-200"
                >
                  Get Started <span className="ml-2">→</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className="inline-flex items-center px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="mr-2">▶</span> Watch video
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Featured Section */}
        <div className="mb-24">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center mb-8">
            Featured in
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center max-w-2xl mx-auto">
            {/* YouTube */}
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-xl font-medium text-gray-400">YouTube</span>
            </div>
            
            {/* Product Hunt */}
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.995-.806-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803c2.207 0 4.001 1.794 4.001 4.001 0 2.205-1.794 4.399-4.001 4.399z"/>
              </svg>
              <span className="text-xl font-medium text-gray-400">Product Hunt</span>
            </div>

            {/* Reddit */}
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-xl font-medium text-gray-400">reddit</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Everything you need to land your dream job
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform helps you create professional resumes and cover letters that get noticed.
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
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              How it Works?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Give mock interview in just 3 simple easy steps
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Trusted by job seekers worldwide
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users have to say about their success stories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-[#8B5CF6]">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-[#8B5CF6]">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to boost your career?
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Start building your resume today.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 text-base font-medium text-[#8B5CF6] bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              {[
                { icon: <FaTwitter className="h-6 w-6" />, href: '#', label: 'Twitter' },
                { icon: <FaGithub className="h-6 w-6" />, href: '#', label: 'GitHub' },
                { icon: <FaLinkedin className="h-6 w-6" />, href: '#', label: 'LinkedIn' }
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-[#8B5CF6]"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="sr-only">{item.label}</span>
                  {item.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
