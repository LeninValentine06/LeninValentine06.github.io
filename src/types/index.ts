// Study Session Types
export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface StudySession {
  id: string;
  subject: Subject;
  topic: string;
  description: string;
  duration: number; // in minutes
  scheduledFor: Date;
  completed: boolean;
  notes?: string;
  dateCompleted?: Date;
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  subjectId: string;
  sessionId: string;
}

// App State Types
export interface StudyState {
  subjects: Subject[];
  sessions: StudySession[];
  flashcards: FlashCard[];
}