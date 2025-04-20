import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { TextArea, Select } from '../ui/Input';
import { Sparkles, BookMarked } from 'lucide-react';

const FlashcardGenerator: React.FC = () => {
  const { state, dispatch } = useStudy();
  const [sessionId, setSessionId] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get completed sessions with notes
  const sessionsWithNotes = state.sessions.filter(
    session => session.completed && session.notes && session.notes.trim() !== ''
  );
  
  // When session is selected, load its notes
  const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSessionId(id);
    
    if (id) {
      const session = state.sessions.find(s => s.id === id);
      if (session && session.notes) {
        setNotes(session.notes);
      } else {
        setNotes('');
      }
    } else {
      setNotes('');
    }
  };
  
  // Generate flashcards (simulated AI function)
  const generateFlashcards = () => {
    if (!sessionId || !notes.trim()) return;
    
    setLoading(true);
    
    // Find the selected session
    const session = state.sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    // Simulate AI processing time
    setTimeout(() => {
      // Extract potential flashcards from the notes (simplified simulation)
      const sentences = notes.split(/[.!?]\s+/);
      const flashcardCount = Math.min(5, Math.ceil(sentences.length / 2));
      
      // Simulate generating flashcards
      for (let i = 0; i < flashcardCount; i++) {
        const questionPart = sentences[i * 2 % sentences.length].trim();
        const answerPart = sentences[(i * 2 + 1) % sentences.length].trim();
        
        if (questionPart && answerPart) {
          const question = `${questionPart}?`;
          const answer = answerPart;
          
          dispatch({
            type: 'ADD_FLASHCARD',
            payload: {
              question,
              answer,
              subjectId: session.subject.id,
              sessionId: session.id,
            },
          });
        }
      }
      
      setLoading(false);
      setSessionId('');
      setNotes('');
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">AI Flashcard Generator</h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Generate study flashcards from your session notes using AI.
          Select a completed session or enter custom notes.
        </p>
        
        <Select
          label="Select Study Session"
          value={sessionId}
          onChange={handleSessionChange}
          options={[
            { value: '', label: 'Select a session...' },
            ...sessionsWithNotes.map(session => ({
              value: session.id,
              label: `${session.subject.name}: ${session.topic}`,
            })),
          ]}
          fullWidth
        />
        
        <TextArea
          label="Study Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter your study notes here to generate flashcards..."
          rows={6}
          fullWidth
        />
        
        <Button
          onClick={generateFlashcards}
          disabled={loading || !notes.trim()}
          className="mt-4 w-full"
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Generate Flashcards
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlashcardGenerator;