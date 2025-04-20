import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { StudyState, StudySession, Subject, FlashCard } from '../types';
import { loadState, saveState, generateId } from '../utils/storageUtils';

// Define action types
type ActionType = 
  | { type: 'ADD_SESSION'; payload: Omit<StudySession, 'id' | 'completed'> }
  | { type: 'COMPLETE_SESSION'; payload: { id: string; notes?: string } }
  | { type: 'DELETE_SESSION'; payload: { id: string } }
  | { type: 'ADD_SUBJECT'; payload: Omit<Subject, 'id'> }
  | { type: 'DELETE_SUBJECT'; payload: { id: string } }
  | { type: 'ADD_FLASHCARD'; payload: Omit<FlashCard, 'id'> }
  | { type: 'DELETE_FLASHCARD'; payload: { id: string } };

// Create study context
interface StudyContextType {
  state: StudyState;
  dispatch: React.Dispatch<ActionType>;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

// Reducer function
const studyReducer = (state: StudyState, action: ActionType): StudyState => {
  switch (action.type) {
    case 'ADD_SESSION':
      const newSession: StudySession = {
        ...action.payload,
        id: generateId(),
        completed: false,
      };
      return {
        ...state,
        sessions: [...state.sessions, newSession],
      };
      
    case 'COMPLETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(session => 
          session.id === action.payload.id 
            ? { 
                ...session, 
                completed: true, 
                dateCompleted: new Date(),
                notes: action.payload.notes || session.notes,
              } 
            : session
        ),
      };
      
    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload.id),
      };
      
    case 'ADD_SUBJECT':
      const newSubject: Subject = {
        ...action.payload,
        id: generateId(),
      };
      return {
        ...state,
        subjects: [...state.subjects, newSubject],
      };
      
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== action.payload.id),
      };
      
    case 'ADD_FLASHCARD':
      const newFlashcard: FlashCard = {
        ...action.payload,
        id: generateId(),
      };
      return {
        ...state,
        flashcards: [...state.flashcards, newFlashcard],
      };
      
    case 'DELETE_FLASHCARD':
      return {
        ...state,
        flashcards: state.flashcards.filter(flashcard => flashcard.id !== action.payload.id),
      };
      
    default:
      return state;
  }
};

// Provider component
export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studyReducer, loadState());
  
  // Save to localStorage when state changes
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyContext.Provider>
  );
};

// Custom hook to use the context
export const useStudy = (): StudyContextType => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};