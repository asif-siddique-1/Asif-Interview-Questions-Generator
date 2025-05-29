export const extractSkillsPrompt = (jobDescription: string) => {
  return `Extract a list of key technical skills required from the following job description. 
Only return a comma-separated list of skills.

Job Description:
"${jobDescription}"
`;
};
