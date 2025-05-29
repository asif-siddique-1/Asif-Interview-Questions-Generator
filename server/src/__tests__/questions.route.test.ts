import request from 'supertest';
import app from '../app';

describe('Questions Routes', () => {
  const mockJobDescription =
    'This is a job description for a Full Stack Software Engineer position at ABC Inc. The ideal candidate will have 5+ years of experience in software development, proficiency in React, Node.js, and MongoDB, and be well-versed in Agile methodologies. The successful candidate will be responsible for developing new features for our web application, participating in code reviews, and collaborating with cross-functional teams to deliver high-quality software products.';
  const mockExperienceLevel = 'mid-level';
  const mockNumQuestions = 3;
  const mockQuestionTypes = ['Theoretical', 'Coding'];

  describe('POST /generate', () => {
    it('should generate questions with valid input', async () => {
      const response = await request(app)
        .post('/api/v1/questions/generate')
        .send({
          jobDescription: mockJobDescription,
          numQuestions: mockNumQuestions,
          experienceLevel: mockExperienceLevel,
          questionTypes: mockQuestionTypes,
        })
        .expect(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(mockNumQuestions);
    });

    it('should return 400 with invalid input', async () => {
      const response = await request(app)
        .post('/api/v1/questions/generate')
        .send({
          skills: [], // Invalid input
          numQuestions: mockNumQuestions,
          experienceLevel: mockExperienceLevel,
          questionTypes: mockQuestionTypes,
        })
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /status/:jobId', () => {
    it('should return job status', async () => {
      const jobId = 'test-job-id';
      const response = await request(app)
        .get(`/api/v1/questions/status/${jobId}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.jobId).toBe(jobId);
    });
  });
});
