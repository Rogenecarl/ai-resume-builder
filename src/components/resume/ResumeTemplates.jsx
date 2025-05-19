import React from 'react';

export const ModernTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8">
    <header className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-lg text-[#8B5CF6] mt-1">{data.personalInfo.jobTitle}</p>
          <div className="text-gray-600 mt-2 space-x-2 text-sm">
            <span>{data.personalInfo.city}, {data.personalInfo.country}</span>
            <span className="text-gray-300"></span>
            <span>{data.personalInfo.phone}</span>
            <span className="text-gray-300"></span>
            <span>{data.personalInfo.email}</span>
          </div>
        </div>
        {data.personalInfo.photo && (
          <img 
            src={data.personalInfo.photo} 
            alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}
      </div>
    </header>

    {data.workExperience.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b">Work Experience</h2>
        {data.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-gray-900">{exp.position}</h3>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                {`${exp.startDate} - ${exp.endDate}`}
              </span>
            </div>
            <p className="text-[#8B5CF6] text-sm mb-2">{exp.company}</p>
            <ul className="text-gray-600 text-sm space-y-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <span className="block">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    )}

    {data.projects?.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <span className="text-[#8B5CF6] text-sm">{project.role}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
            {project.technologies && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.split(',').map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            {project.url && (
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] text-sm hover:underline mt-1 inline-block"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </section>
    )}

    {data.education.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-gray-900">{edu.degree}</h3>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                {`${edu.yearStarted} - ${edu.yearGraduated}`}
              </span>
            </div>
            <p className="text-[#8B5CF6] text-sm">{edu.school}</p>
            <p className="text-gray-500 text-sm whitespace-nowrap">
              {`${edu.gpa}`}
            </p>
          </div>
        ))}
      </section>
    )}

    {data.skills.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
);

export const MinimalTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8">
    <header className="mb-8">
      <h1 className="text-3xl font-light text-gray-900">
        {data.personalInfo.firstName} {data.personalInfo.lastName}
      </h1>
      <p className="text-[#8B5CF6] mt-1">{data.personalInfo.jobTitle}</p>
      <div className="text-gray-600 mt-2 space-x-2 text-sm">
        <span>{data.personalInfo.city}, {data.personalInfo.country}</span>
        <span className="text-gray-300"></span>
        <span>{data.personalInfo.phone}</span>
        <span className="text-gray-300"></span>
        <span>{data.personalInfo.email}</span>
      </div>
    </header>

    {data.workExperience.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Experience</h2>
        {data.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-gray-900">{exp.position}</h3>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                {`${exp.startDate} - ${exp.endDate}`}
              </span>
            </div>
            <p className="text-[#8B5CF6] text-sm mb-2">{exp.company}</p>
            <ul className="text-gray-600 text-sm space-y-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <span className="block">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    )}

    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {`${edu.yearStarted} - ${edu.yearGraduated}`}
                  </span>
                </div>
                <p className="text-[#8B5CF6] text-sm">{edu.school}</p>
                <p className="text-gray-500 text-sm whitespace-nowrap">
                  {`${edu.yearStarted} - ${edu.yearGraduated}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {data.projects?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <p className="text-[#8B5CF6] text-sm">{project.role}</p>
              <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.split(',').map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
              {project.url && (
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B5CF6] text-sm hover:underline mt-1 inline-block"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  </div>
);
