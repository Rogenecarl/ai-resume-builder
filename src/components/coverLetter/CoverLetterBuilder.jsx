import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ModernTemplate, MinimalTemplate } from './CoverLetterTemplates';
import { generateCoverLetter } from '../../config/gemini';
import ExportOptions from '../resume/ExportOptions';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaBuilding, FaInfoCircle, FaMagic, FaDownload } from 'react-icons/fa';

const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const FormCard = ({ children, title, icon: Icon }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-lg shadow-sm p-6"
  >
    <div className="flex items-center space-x-2 mb-6">
      <Icon className="h-5 w-5 text-[#8B5CF6]" />
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default function CoverLetterBuilder() {
  const [template, setTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState({
    personalInfo: {},
    recipientName: '',
    companyName: '',
    companyAddress: '',
    content: '',
  });
  
  const componentRef = useRef();
  const { register, handleSubmit, watch } = useForm();

  const handleGenerate = async (data) => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateCoverLetter({
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        industry: data.industry,
        keySkills: data.keySkills,
        experienceLevel: data.experienceLevel,
        achievements: data.achievements,
        companyInfo: data.companyInfo,
      });

      setCoverLetterData({
        personalInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
        },
        recipientName: data.recipientName,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        content: generatedContent,
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm";
  const textareaClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm min-h-[120px] resize-none";
  const labelClasses = "block text-sm font-medium text-gray-900";
  const selectClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm";

  const TemplateComponent = templates[template];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Design your cover letter</h1>
          <p className="mt-1 text-sm text-gray-500">
            Follow the steps below to create your cover letter. Your progress will be saved automatically.
          </p>
        </div>

        {/* Template Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Template Style</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(templates).map(([key]) => (
                <button
                  key={key}
                  onClick={() => setTemplate(key)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                    template === key
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-[#8B5CF6]'
                      : 'border-gray-200 text-gray-700 hover:border-[#8B5CF6]/50'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit(handleGenerate)} className="space-y-6">
              <FormCard title="Personal Information" icon={FaUser}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" {...register('name')} className={inputClasses} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className={labelClasses}>Email</label>
                    <input type="email" {...register('email')} className={inputClasses} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone</label>
                    <input type="tel" {...register('phone')} className={inputClasses} placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className={labelClasses}>Location</label>
                    <input type="text" {...register('location')} className={inputClasses} placeholder="City, State" />
                  </div>
                </div>
              </FormCard>

              <FormCard title="Job Details" icon={FaBriefcase}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Job Title</label>
                    <input type="text" {...register('jobTitle')} className={inputClasses} placeholder="Software Engineer" />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Name</label>
                    <input type="text" {...register('companyName')} className={inputClasses} placeholder="Tech Company Inc." />
                  </div>
                  <div>
                    <label className={labelClasses}>Recipient Name (optional)</label>
                    <input type="text" {...register('recipientName')} className={inputClasses} placeholder="Mr. John Smith" />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Address</label>
                    <input type="text" {...register('companyAddress')} className={inputClasses} placeholder="123 Company St, City, State" />
                  </div>
                </div>
              </FormCard>

              <FormCard title="Additional Information" icon={FaInfoCircle}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Industry</label>
                    <input type="text" {...register('industry')} className={inputClasses} placeholder="Technology, Healthcare, Finance" />
                  </div>
                  <div>
                    <label className={labelClasses}>Key Skills</label>
                    <input type="text" {...register('keySkills')} className={inputClasses} placeholder="Project Management, React.js, Team Leadership" />
                  </div>
                  <div>
                    <label className={labelClasses}>Experience Level</label>
                    <select {...register('experienceLevel')} className={selectClasses}>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Notable Achievements</label>
                    <textarea {...register('achievements')} className={textareaClasses} 
                      placeholder="List your relevant achievements..." />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Research</label>
                    <textarea {...register('companyInfo')} className={textareaClasses}
                      placeholder="What interests you about this company? Any recent news or developments?" />
                  </div>
                </div>
              </FormCard>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${
                    isGenerating
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
                  }`}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    'Generating...'
                  ) : (
                    <>
                      <FaMagic className="mr-2 h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <ExportOptions 
                resumeData={coverLetterData}
                componentRef={componentRef}
              />
            </div>
            <div ref={componentRef} className="bg-white border rounded-lg">
              <TemplateComponent data={coverLetterData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
