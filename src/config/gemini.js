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
    workExperience: `Write 4–5 resume bullet points for the following role:
- Company: ${userInput.company}
- Position: ${userInput.position}
- Duration: ${userInput.duration}

Instructions:
- Start each point with a strong action verb
- Use short, clear sentences
- Focus on key achievements and responsibilities
- Include numbers or results if available
- Use industry-relevant terms
- No bullet symbols or numbering
- Output should be plain lines, one per bullet`,

    skills: `List 10–12 relevant skills for a ${userInput.role} role.
- Focus: ${userInput.focusAreas}
- Use short phrases
- Separate with commas only
- No headings or extra text`,

    projects: `Write a brief project description:
- Project Name: ${userInput.name}
- Technologies: ${userInput.technologies}

Instructions:
- 3–4 sentences only
- Explain purpose and impact
- Highlight your role and contributions
- Mention key challenges solved
- Include measurable outcomes
- Be clear and concise`,

    summary: `Write a professional summary for a resume:
- Role: ${userInput.role}
- Years of experience: ${userInput.experience}
- Expertise: ${userInput.expertise}

Instructions:
- 3–4 short sentences
- Start with professional title
- Mention core expertise and strengths
- Highlight top achievements or projects
- Include key technical skills
- State future goals or interests
- Keep it clear, focused, and strong`
  };

  return await getGeminiResponse(prompts[section]);
};

export const generateCoverLetter = async (userInput) => {
  const prompt = `Write a professional cover letter using these details:
- Job Title: ${userInput.jobTitle}
- Company: ${userInput.companyName}
- Industry: ${userInput.industry}
- Key Skills: ${userInput.keySkills}
- Experience Level: ${userInput.experienceLevel}
- Notable Achievements: ${userInput.achievements}
- Company Info: ${userInput.companyInfo}

Instructions:
- Start with a strong introduction
- Show enthusiasm for the role
- Mention something specific about the company
- Highlight your relevant experience and skills
- Include a few key achievements
- End with a clear call to action
- Keep tone professional but engaging
- Use standard business letter format
- Write in paragraphs`

  return await getGeminiResponse(prompt);
};
