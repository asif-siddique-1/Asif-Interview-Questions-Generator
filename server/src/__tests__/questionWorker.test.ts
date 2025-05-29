// import { Worker, Queue, QueueEvents } from 'bullmq';
// import { v4 as uuidv4 } from 'uuid';
// import { generateQuestions } from '../utils/generateQuestions';
// import { tryCatch } from '../utils/tryCatch';
// import { AppError } from '../utils/AppError';
// import { connection } from '../config/redis';
// import { questionQueue } from '../jobs/questionsQueue';

// jest.mock('../utils/generateQuestions', () => {
//   return {
//     generateQuestions: jest.fn(
//       async (skills, numQuestions, experienceLevel, questionTypes) => {
//         return Array(numQuestions)
//           .fill(null)
//           .map((_, index) => ({
//             skill: skills[Math.floor(Math.random() * skills.length)],
//             type: questionTypes[
//               Math.floor(Math.random() * questionTypes.length)
//             ],
//             question: `Test question ${index + 1} for ${experienceLevel} level`,
//             evaluationCriteria: 'Test evaluation criteria',
//             difficulty: 'Medium',
//           }));
//       },
//     ),
//   };
// });

// describe('Question Worker', () => {
//   let worker: Worker;
//   let queue: Queue;
//   let queueEvents: QueueEvents;
//   const mockSkills = ['javascript', 'typescript'];
//   const mockNumQuestions = 5;
//   const mockExperienceLevel = 'mid';
//   const mockQuestionTypes = ['conceptual', 'practical'];

//   beforeEach(() => {
//     worker = new Worker(
//       'question-generation',
//       async (job) => {
//         const { skills, numQuestions, experienceLevel, questionTypes } =
//           job.data;

//         const { data: questions, error } = await tryCatch(
//           generateQuestions(
//             skills,
//             numQuestions,
//             experienceLevel,
//             questionTypes,
//           ),
//         );

//         if (error) {
//           throw new AppError(error.message, 500);
//         }

//         return questions;
//       },
//       {
//         connection,
//       },
//     );

//     queue = new Queue('question-generation', {
//       connection,
//     });

//     queueEvents = new QueueEvents('question-generation', {
//       connection,
//     });
//   });

//   afterEach(async () => {
//     await worker.close();
//     await queue.close();
//     await queueEvents.close();
//   });

//   it('should successfully generate questions', async () => {
//     const job = await queue.add('question-generation', {
//       skills: mockSkills,
//       numQuestions: mockNumQuestions,
//       experienceLevel: mockExperienceLevel,
//       questionTypes: mockQuestionTypes,
//     });

//     const result = await job.waitUntilFinished(queueEvents);
//     expect(result).toBeDefined();
//     expect(Array.isArray(result)).toBe(true);
//     expect(result.length).toBe(mockNumQuestions);

//     // Additional assertions to verify the structure of generated questions
//     result.forEach(
//       (
//         question: {
//           skill: string;
//           type: string;
//           question: string;
//           evaluationCriteria: string;
//           difficulty: string;
//         },
//         index: number,
//       ) => {
//         expect(question).toHaveProperty('skill');
//         expect(question).toHaveProperty('type');
//         expect(question).toHaveProperty('question');
//         expect(question).toHaveProperty('evaluationCriteria');
//         expect(question).toHaveProperty('difficulty');
//         expect(mockSkills).toContain(question.skill);
//         expect(mockQuestionTypes).toContain(question.type);
//       },
//     );
//   });

//   it('should throw error when generation fails', async () => {
//     (generateQuestions as jest.Mock).mockRejectedValue(
//       new Error('Generation failed'),
//     );

//     const job = await queue.add('question-generation', {
//       skills: mockSkills,
//       numQuestions: mockNumQuestions,
//       experienceLevel: mockExperienceLevel,
//       questionTypes: mockQuestionTypes,
//     });

//     await expect(job.waitUntilFinished(queueEvents)).rejects.toThrow(
//       'Generation failed',
//     );
//   });

//   it('should handle invalid input gracefully', async () => {
//     const job = await queue.add('question-generation', {
//       skills: [],
//       numQuestions: 0,
//       experienceLevel: mockExperienceLevel,
//       questionTypes: mockQuestionTypes,
//     });

//     const result = await job.waitUntilFinished(queueEvents);
//     expect(result).toBeDefined();
//     expect(Array.isArray(result)).toBe(true);
//     expect(result.length).toBe(0);
//   });

//   it('should handle AppError correctly', async () => {
//     (generateQuestions as jest.Mock).mockRejectedValue(
//       new AppError('Custom error', 400),
//     );

//     const job = await queue.add('question-generation', {
//       skills: mockSkills,
//       numQuestions: mockNumQuestions,
//       experienceLevel: mockExperienceLevel,
//       questionTypes: mockQuestionTypes,
//     });

//     await expect(job.waitUntilFinished(queueEvents)).rejects.toThrow(
//       'Custom error',
//     );
//   });
// });
