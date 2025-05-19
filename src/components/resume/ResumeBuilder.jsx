import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ModernTemplate, MinimalTemplate } from './ResumeTemplates';
import { generateResumeContent } from '../../config/gemini';
import ExportOptions from './ExportOptions';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaTools, FaProjectDiagram, FaMagic, FaDownload, FaChevronRight } from 'react-icons/fa';

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

const FormCard = ({ children }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-lg shadow-sm p-6"
  >
    {children}
  </motion.div>
);

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [template, setTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const componentRef = useRef();
  const { register, handleSubmit, reset } = useForm();

  const sections = [
    { id: 'personalInfo', label: 'Personal info', icon: FaUser },
    { id: 'workExperience', label: 'Work experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'skills', label: 'Skills', icon: FaTools },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
  ];

  const handleGenerateContent = async (section, data) => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateResumeContent(section, data);
      
      // Parse the generated content based on section type
      let parsedContent;
      switch (section) {
        case 'workExperience':
          parsedContent = {
            position: data.position,
            company: data.company,
            duration: data.duration,
            achievements: generatedContent.split('\n').filter(item => item.trim()),
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, parsedContent],
          }));
          break;

        case 'skills':
          parsedContent = generatedContent.split(',').map(skill => skill.trim());
          setResumeData(prev => ({
            ...prev,
            skills: parsedContent,
          }));
          break;

        case 'projects':
          parsedContent = {
            name: data.name,
            description: generatedContent,
          };
          setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, parsedContent],
          }));
          break;

        default:
          setResumeData(prev => ({
            ...prev,
            [section]: generatedContent,
          }));
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    switch (activeSection) {
      case 'personalInfo':
        setResumeData(prev => ({
          ...prev,
          personalInfo: data,
        }));
        break;

      case 'workExperience':
        if (data.useAI) {
          await handleGenerateContent('workExperience', data);
        } else {
          const newExperience = {
            position: data.position,
            company: data.company,
            duration: data.duration,
            achievements: data.achievements.split('\n').filter(item => item.trim()),
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, newExperience],
          }));
        }
        break;

      case 'education':
        const newEducation = {
          degree: data.degree,
          school: data.school,
          year: data.year,
          gpa: data.gpa,
        };
        setResumeData(prev => ({
          ...prev,
          education: [...prev.education, newEducation],
        }));
        break;

      case 'skills':
        if (data.useAI) {
          await handleGenerateContent('skills', data);
        } else {
          const skillsList = data.skills.split(',').map(skill => skill.trim());
          setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, ...skillsList],
          }));
        }
        break;

      case 'projects':
        if (data.useAI) {
          await handleGenerateContent('projects', data);
        } else {
          const newProject = {
            name: data.name,
            description: data.description,
            technologies: data.technologies,
          };
          setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject],
          }));
        }
        break;
    }
    reset();
  };

  const renderForm = () => {
    const inputClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm";
    const textareaClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm min-h-[120px] resize-none";
    const labelClasses = "block text-sm font-medium text-gray-900";
    const aiBoxClasses = "flex items-center space-x-2 bg-[#8B5CF6]/5 p-4 rounded-md border border-[#8B5CF6]/10";
    const checkboxClasses = "h-5 w-5 rounded border-gray-200 text-[#8B5CF6] focus:ring-[#8B5CF6] shadow-sm";
    
    const formContent = {
      personalInfo: (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>First name</label>
                <input type="text" {...register('firstName')} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Last name</label>
                <input type="text" {...register('lastName')} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Job title</label>
              <input type="text" {...register('jobTitle')} className={inputClasses} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>City</label>
                <input type="text" {...register('city')} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Country</label>
                <input type="text" {...register('country')} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Phone</label>
              <input type="tel" {...register('phone')} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Email</label>
              <input type="email" {...register('email')} className={inputClasses} />
            </div>
          </div>
        </>
      ),
      workExperience: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Position</label>
              <input type="text" {...register('position')} className={inputClasses} placeholder="Software Engineer" />
            </div>
            <div>
              <label className={labelClasses}>Company</label>
              <input type="text" {...register('company')} className={inputClasses} placeholder="Tech Company Inc." />
            </div>
            <div>
              <label className={labelClasses}>Duration</label>
              <input type="text" {...register('duration')} className={inputClasses} placeholder="Jan 2020 - Present" />
            </div>
            <div>
              <label className={labelClasses}>Achievements</label>
              <textarea {...register('achievements')} className={textareaClasses} 
                placeholder="• Led development of feature X&#10;• Improved performance by Y%&#10;• Managed team of Z engineers" />
            </div>
            <div className={aiBoxClasses}>
              <input type="checkbox" {...register('useAI')} className={checkboxClasses} />
              <div className="flex items-center">
                <FaMagic className="text-[#8B5CF6] mr-2" />
                <span className="text-sm text-gray-700">Use AI to generate professional description</span>
              </div>
            </div>
          </div>
        </>
      ),
      education: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Degree</label>
              <input type="text" {...register('degree')} className={inputClasses} 
                placeholder="Bachelor of Science in Computer Science" />
            </div>
            <div>
              <label className={labelClasses}>School</label>
              <input type="text" {...register('school')} className={inputClasses} placeholder="University Name" />
            </div>
            <div>
              <label className={labelClasses}>Year</label>
              <input type="text" {...register('year')} className={inputClasses} placeholder="2020 - 2024" />
            </div>
            <div>
              <label className={labelClasses}>GPA (optional)</label>
              <input type="text" {...register('gpa')} className={inputClasses} placeholder="3.8/4.0" />
            </div>
          </div>
        </>
      ),
      skills: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Skills</label>
              <textarea {...register('skills')} className={textareaClasses} 
                placeholder="JavaScript, React, Node.js, Python, etc." />
            </div>
            <div>
              <label className={labelClasses}>Role (for AI generation)</label>
              <input type="text" {...register('role')} className={inputClasses} placeholder="Full Stack Developer" />
            </div>
            <div>
              <label className={labelClasses}>Focus Areas</label>
              <input type="text" {...register('focusAreas')} className={inputClasses} 
                placeholder="Web Development, Cloud Computing" />
            </div>
            <div className={aiBoxClasses}>
              <input type="checkbox" {...register('useAI')} className={checkboxClasses} />
              <div className="flex items-center">
                <FaMagic className="text-[#8B5CF6] mr-2" />
                <span className="text-sm text-gray-700">Use AI to generate relevant skills</span>
              </div>
            </div>
          </div>
        </>
      ),
      projects: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Project Name</label>
              <input type="text" {...register('name')} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Role</label>
              <input type="text" {...register('role')} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Description</label>
              <textarea {...register('description')} className={textareaClasses} />
            </div>
            <div>
              <label className={labelClasses}>Technologies Used</label>
              <input type="text" {...register('technologies')} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Project URL (optional)</label>
              <input type="url" {...register('url')} className={inputClasses} />
            </div>
            <div className={aiBoxClasses}>
              <input type="checkbox" {...register('useAI')} className={checkboxClasses} />
              <div className="flex items-center">
                <FaMagic className="text-[#8B5CF6] mr-2" />
                <span className="text-sm text-gray-700">Use AI to enhance project description</span>
              </div>
            </div>
          </div>
        </>
      ),
    };

    return (
      <FormCard>
        {formContent[activeSection]}
      </FormCard>
    );
  };

  const TemplateComponent = templates[template];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Design your resume</h1>
          <p className="mt-1 text-sm text-gray-500">
            Follow the steps below to create your resume. Your progress will be saved automatically.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
                {index < sections.length - 1 && (
                  <FaChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderForm()}
              
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
                  {isGenerating ? 'Saving...' : 'Save and Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <ExportOptions 
                resumeData={resumeData}
                componentRef={componentRef}
              />
            </div>
            <div ref={componentRef} className="bg-white border rounded-lg">
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
