import { StudyState, StudySession, Subject, FlashCard } from '../types';

// Default initial state
const initialState: StudyState = {
  subjects: [],
  sessions: [],
  flashcards: [],
};

// Load data from localStorage
export const loadState = (): StudyState => {
  try {
    const serializedState = localStorage.getItem('studyWiseState');
    if (!serializedState) return initialState;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

// Save data to localStorage
export const saveState = (state: StudyState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('studyWiseState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

// Generate a unique ID for new items
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};