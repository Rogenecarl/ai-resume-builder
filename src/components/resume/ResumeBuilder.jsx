import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ModernTemplate, MinimalTemplate } from './ResumeTemplates';
import { generateResumeContent } from '../../config/gemini';
import { countries } from '../../config/locationData';
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
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
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
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  // Watch for country changes
  const watchCountry = watch('country');

  // Update cities when country changes
  React.useEffect(() => {
    if (watchCountry) {
      const country = countries.find(c => c.name === watchCountry);
      if (country) {
        setAvailableCities(country.cities);
        setValue('city', ''); // Reset city when country changes
      }
    }
  }, [watchCountry, setValue]);

  // Add phone country codes data
  const phoneCountryCodes = [
    { code: '+1', country: 'United States/Canada' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+61', country: 'Australia' },
    { code: '+63', country: 'Philippines' },
    { code: '+65', country: 'Singapore' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+60', country: 'Malaysia' },
    { code: '+66', country: 'Thailand' },
    { code: '+84', country: 'Vietnam' },
    { code: '+62', country: 'Indonesia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' }
  ];

  const degreeOptions = [
    "Bachelor of Science (BS)",
    "Bachelor of Arts (BA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Engineering (BE/BEng)",
    "Bachelor of Technology (BTech)",
    "Master of Science (MS/MSc)",
    "Master of Arts (MA)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (ME/MEng)",
    "Doctor of Philosophy (PhD)",
    "Associate Degree",
    "High School Diploma",
    "Other"
  ];

  // Add this after phoneCountryCodes
  const universities = {
    "United States": [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology",
      "Yale University",
      "Princeton University"
    ],
    "United Kingdom": [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London",
      "London School of Economics"
    ],
    "Canada": [
      "University of Toronto",
      "University of British Columbia",
      "McGill University",
      "University of Montreal",
      "University of Alberta"
    ],
    // Add more countries and their universities as needed
  };

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
          // Ensure each achievement starts with a bullet point and is concise
          const achievements = generatedContent.split('\n')
            .map(item => item.trim())
            .filter(item => item)
            .map(item => {
              // Remove existing bullet points or dashes if any
              let clean = item.replace(/^[-•*]\s*/, '');
              // Ensure it starts with a bullet point
              return `- ${clean}`;
            });

          parsedContent = {
            position: data.position,
            company: data.company,
            startDate: data.startDate,
            endDate: data.endDate,
            achievements: achievements,
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, parsedContent],
          }));
          break;

        case 'skills':
          // Format skills as a concise list
          parsedContent = generatedContent
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);
          setResumeData(prev => ({
            ...prev,
            skills: parsedContent,
          }));
          break;

        case 'projects':
          // Format project description as bullet points
          const description = generatedContent
            .split('\n')
            .map(item => item.trim())
            .filter(item => item)
            .map(item => {
              let clean = item.replace(/^[-•*]\s*/, '');
              return `- ${clean}`;
            })
            .join('\n');

          parsedContent = {
            name: data.name,
            description: description,
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
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const month = date.toLocaleDateString('en-US', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`; // Will return format like "July 2024"
          };

          const newExperience = {
            position: data.position,
            company: data.company,
            startDate: formatDate(data.startDate),
            endDate: data.currentlyWorking ? 'Present' : formatDate(data.endDate),
            achievements: data.achievements.split('\n').filter(item => item.trim()),
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, newExperience],
          }));
        }
        break;

      case 'education':
        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          const month = date.toLocaleDateString('en-US', { month: 'long' });
          const year = date.getFullYear();
          return `${month} ${year}`; // Will return format like "July 2024"
        };

        const newEducation = {
          degree: data.degree === 'Other' ? data.customDegree : data.degree,
          school: data.school === 'Other' ? data.customSchool : data.school,
          yearStarted: formatDate(data.yearStarted),
          yearGraduated: data.currentlyStudying ? 'Present' : formatDate(data.yearGraduated),
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
    const selectClasses = "mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-0 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] sm:text-sm appearance-none cursor-pointer";
    const aiBoxClasses = "flex items-center space-x-2 bg-[#8B5CF6]/5 p-4 rounded-md border border-[#8B5CF6]/10";
    const checkboxClasses = "h-5 w-5 rounded border-gray-200 text-[#8B5CF6] focus:ring-[#8B5CF6] shadow-sm";
    const selectWrapperClasses = "relative mt-1";
    const selectIconClasses = "absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400";
    
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
                <label className={labelClasses}>Country</label>
                <div className={selectWrapperClasses}>
                  <select {...register('country')} className={selectClasses}>
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className={selectIconClasses}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClasses}>City</label>
                <div className={selectWrapperClasses}>
                  <select {...register('city')} className={selectClasses} disabled={!watchCountry}>
                    <option value="">Select a city</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className={selectIconClasses}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClasses}>Phone</label>
              <div className="phone-input-group">
                <div className={selectWrapperClasses}>
                  <select {...register('phoneCountry')} className={selectClasses} defaultValue="+1">
                    {phoneCountryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} {country.country}
                      </option>
                    ))}
                  </select>
                  <div className={selectIconClasses}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input type="tel" {...register('phone')} className={inputClasses} placeholder="(555) 123-4567" />
              </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Start Date</label>
                <input 
                  type="date" 
                  {...register('startDate')} 
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>End Date</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="date" 
                    {...register('endDate')} 
                    className={`${inputClasses} ${watch('currentlyWorking') ? 'opacity-50' : ''}`}
                    disabled={watch('currentlyWorking')}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                {...register('currentlyWorking')} 
                className="h-4 w-4 rounded border-gray-300 text-[#8B5CF6] focus:ring-[#8B5CF6]"
              />
              <label className="text-sm text-gray-700">I currently work here</label>
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
              <div className="relative">
                <select 
                  {...register('degree')} 
                  className={`${selectClasses} ${watch('degree') === 'Other' ? 'hidden' : 'block'}`}
                >
                  <option value="">Select a degree</option>
                  {degreeOptions.map((degree) => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                  <option value="Other">Other - Type your own</option>
                </select>
                {watch('degree') === 'Other' && (
                  <input
                    type="text"
                    {...register('customDegree')}
                    className={inputClasses}
                    placeholder="Enter your degree"
                  />
                )}
              </div>
            </div>
            <div>
              <label className={labelClasses}>School</label>
              <div className="relative">
                <select 
                  {...register('school')} 
                  className={`${selectClasses} ${watch('school') === 'Other' ? 'hidden' : 'block'}`}
                >
                  <option value="">Select a school</option>
                  {universities[watch('country')] && universities[watch('country')].map((school) => (
                    <option key={school} value={school}>{school}</option>
                  ))}
                  <option value="Other">Other - Type your own</option>
                </select>
                {watch('school') === 'Other' && (
                  <input
                    type="text"
                    {...register('customSchool')}
                    className={inputClasses}
                    placeholder="Enter your school name"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Year Started</label>
                <input 
                  type="date" 
                  {...register('yearStarted')} 
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Year Graduated</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="date" 
                    {...register('yearGraduated')} 
                    className={`${inputClasses} ${watch('currentlyStudying') ? 'opacity-50' : ''}`}
                    disabled={watch('currentlyStudying')}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                {...register('currentlyStudying')} 
                className="h-4 w-4 rounded border-gray-300 text-[#8B5CF6] focus:ring-[#8B5CF6]"
              />
              <label className="text-sm text-gray-700">I am currently studying here</label>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
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
    </motion.div>
  );
}
