const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL;

export const getGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(`${BASE_URL}/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error with Gemini AI:", error);
    throw error;
  }
};

export const generateResumeContent = async (section, userInput) => {
  const prompts = {
    workExperience: `Generate a professional and impactful list of achievements and responsibilities for the following role:
      Company: ${userInput.company}
      Position: ${userInput.position}
      Duration: ${userInput.duration}
      
      Please provide 4-5 bullet points that:
      1. Start with strong action verbs
      2. Include quantifiable results where possible
      3. Highlight key achievements and impacts
      4. Use industry-relevant terminology
      
      Format each point on a new line, without bullet points or numbers.`,
    
    skills: `Return only 10-12 relevant skills for a ${userInput.role} position with ${userInput.focusAreas} focus. Format as a comma-separated list with no introduction or additional text.`,
    
    projects: `Generate a compelling project description for:
      Project Name: ${userInput.name}
      Technologies: ${userInput.technologies}
      
      Create a concise description that:
      1. Explains the project's purpose and impact
      2. Highlights technical challenges overcome
      3. Emphasizes your role and contributions
      4. Includes measurable outcomes
      
      Keep it under 3-4 sentences, focusing on impact and technical excellence.`,

    summary: `Create a professional summary for a ${userInput.role} with ${userInput.experience} years of experience.
      Expertise: ${userInput.expertise}
      
      Create a compelling summary that:
      1. Highlights your professional identity
      2. Emphasizes key achievements
      3. Mentions relevant technical skills
      4. States your career objectives
      
      Keep it under 3-4 sentences, making it impactful and memorable.`
  };

  return await getGeminiResponse(prompts[section]);
};

export const generateCoverLetter = async (userInput) => {
  const prompt = `Generate a professional cover letter with the following details:
    Job Title: ${userInput.jobTitle}
    Company Name: ${userInput.companyName}
    Industry: ${userInput.industry}
    Key Skills: ${userInput.keySkills}
    Experience Level: ${userInput.experienceLevel}
    Specific Achievements: ${userInput.achievements}
    Company Research: ${userInput.companyInfo}

    Please create a compelling cover letter that:
    1. Opens with a strong introduction showing enthusiasm for the role
    2. Demonstrates knowledge of the company
    3. Highlights relevant skills and experiences
    4. Includes specific achievements that align with the role
    5. Closes with a clear call to action
    6. Maintains a professional yet engaging tone
    7. Is structured in clear paragraphs
    
    Format the letter in a professional business letter style.`;

  return await getGeminiResponse(prompt);
};