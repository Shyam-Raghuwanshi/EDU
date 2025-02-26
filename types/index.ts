export interface UserContext {
  age: number;
  location?: string;
  studyingFor?: string;
  topicProgress?: {
    totalAttempts: number;
    successRate: number;
    averageTime: number;
    lastLevel: number;
    masteryScore: number;
  };
}

export interface ExploreResponse {
  relatedQuestions: string[];
  relatedTopics: RelatedTopic[];
  content?: string;
}

export interface RelatedTopic {
  query: string;
  type: "prerequisite" | "extension" | "application" | "parallel" | "deeper";
  context: string;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: {correct:any,key_point:any};
  difficulty: number;
  ageGroup: string;
  topic: string;
  subtopic: string;
  index?: number;
  questionType?: any;
}

export interface SearchBarProps {
  key?: string;
  onSearch: (query: string) => Promise<void> | void;
  placeholder: string;
  centered?: boolean;
  title?: string;
  className?: string;
  suggestions?: Array<{
    text: string;
    icon: string;
  }>;
  buttonText?: string;
  initialValue?: string;
  onSubmit?: (query: string) => void;
}

export interface QuestionHistory {
  usedQuestions: Set<string>;
  lastLevel: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  topicStrength: number;
  usedContexts: Set<string>;
  usedConcepts: Set<string>;
  usedApplications: Set<string>;
  usedExamples: Set<string>;
}

export interface MarkdownComponentProps {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface UserContextType {
  userContext: UserContext | null;
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | null>>;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}
// Add other shared types here
