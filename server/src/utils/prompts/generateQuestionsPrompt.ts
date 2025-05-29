export const genrateQuestionsPrompt = (
  skills: string[],
  numQuestions: number,
  experienceLevel: string,
  questionTypes: string[] = ['Theoretical', 'Coding'],
) => {
  return `You are an expert technical interviewer. Given the following skills: ${skills.join(
    ', ',
  )}, DO NOT more than ${numQuestions} questions. Generate ${numQuestions} interview questions for ${experienceLevel} level candidates.
  
  IMPORTANT GUIDELINES:
  1. Create questions of the following types: ${questionTypes.join(', ')}.
     ${questionTypes.length > 1 ? `Create an equal distribution among these types.` : ''}
  
  2. For coding challenges, include specific problems that require writing actual code, with sample inputs and expected outputs.
  
  3. Vary the difficulty levels appropriately for the ${experienceLevel} experience level.
  
  4. For each skill, try to include at least one question if possible.
  
  5. For each question, provide:
     - The skill it assesses
     - Question type (${questionTypes.map((type) => `"${type}"`).join(' or ')})
     - The detailed question
     - Sample input/output for coding questions
     - Evaluation criteria for assessing the candidate's answer
     - Difficulty rating (Easy, Medium, Hard)
  
  Format the output as a JSON array as specified below:
  [
      {
        "skill": "React",
        "type": "Theoretical",
        "question": "Explain the concept of virtual DOM in React and how it improves performance.",
        "evaluationCriteria": "Candidate should explain how the virtual DOM works, its role in efficient UI updates, and its benefits over direct DOM manipulation.",
        "difficulty": "Medium"
      },
      {
        "skill": "JavaScript",
        "type": "Coding",
        "question": "Write a function that flattens a nested array of arbitrary depth.",
        "sampleInput": "[1, [2, [3, 4], 5]]",
        "expectedOutput": "[1, 2, 3, 4, 5]",
        "evaluationCriteria": "Assess solution correctness, handling of edge cases, and understanding of recursion or stack-based approaches.",
        "difficulty": "Medium"
      },
      {
        "skill": "Node.js",
        "type": "Theoretical",
        "question": "Explain the event loop in Node.js and how it enables non-blocking I/O operations.",
        "evaluationCriteria": "Look for understanding of the event-driven architecture, callback queue, and how asynchronous operations are handled in Node.js.",
        "difficulty": "Medium"
      }
    ]
  
  NOTE: Only return the JSON array as shown above, do not include any additional text, markdown, or explanation.`;
};
