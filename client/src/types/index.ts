export interface Question {
  skill: string;
  type: string;
  question: string;
  difficulty: string;
  evaluationCriteria: string;
  sampleInput?: string;
  expectedOutput?: string;
}

export interface ApiResponse {
  status: string;
  jobId?: string;
  result?: Question[];
  message?: string;
}

export interface QuestionFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  experience: string;
  setExperience: (value: string) => void;
  numQuestions: number;
  setNumQuestions: (value: number) => void;
  questionTypes: string[];
  handleQuestionTypeChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  experienceLevels: string[];
  questionTypeOptions: { value: string; label: string }[];
  statusMessage: string;
}

export interface GeneratedQuestionsProps {
  questions: Question[];
  questionsRef: React.RefObject<HTMLDivElement | null>;
  handleGenerateNew: () => void;
  downloadQuestions: (format: "json" | "pdf") => Promise<void>;
  experience: string;
  questionTypes: string[];
  questionTypeOptions: { value: string; label: string }[];
}
