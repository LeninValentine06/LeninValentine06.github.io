import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { X, ArrowRight, BookOpen } from 'lucide-react';

const FlashcardList: React.FC = () => {
  const { state, dispatch } = useStudy();
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  
  // Filter flashcards by subject
  const filteredFlashcards = subjectFilter
    ? state.flashcards.filter(fc => fc.subjectId === subjectFilter)
    : state.flashcards;
  
  // Delete flashcard
  const deleteFlashcard = (id: string) => {
    if (confirm('Delete this flashcard?')) {
      dispatch({
        type: 'DELETE_FLASHCARD',
        payload: { id },
      });
      
      // Adjust active index if needed
      if (activeFlashcardIndex >= filteredFlashcards.length - 1) {
        setActiveFlashcardIndex(Math.max(0, filteredFlashcards.length - 2));
      }
    }
  };
  
  // Navigate to next card
  const nextCard = () => {
    if (activeFlashcardIndex < filteredFlashcards.length - 1) {
      setActiveFlashcardIndex(activeFlashcardIndex + 1);
      setShowAnswer(false);
    }
  };
  
  // Navigate to previous card
  const prevCard = () => {
    if (activeFlashcardIndex > 0) {
      setActiveFlashcardIndex(activeFlashcardIndex - 1);
      setShowAnswer(false);
    }
  };
  
  // Toggle answer visibility
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  
  // Get current flashcard
  const currentFlashcard = filteredFlashcards[activeFlashcardIndex];
  
  // Find subject name by ID
  const getSubjectName = (subjectId: string) => {
    const subject = state.subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Study Flashcards</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={subjectFilter === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSubjectFilter(null)}
          >
            All
          </Button>
          {state.subjects.map(subject => (
            <Button
              key={subject.id}
              variant={subjectFilter === subject.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSubjectFilter(subject.id)}
              style={{ 
                backgroundColor: subjectFilter === subject.id ? subject.color : 'transparent',
                borderColor: subject.color,
                color: subjectFilter === subject.id ? 'white' : subject.color 
              }}
            >
              {subject.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredFlashcards.length > 0 ? (
          <>
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Card {activeFlashcardIndex + 1} of {filteredFlashcards.length}
              </span>
              {currentFlashcard && (
                <span 
                  className="text-sm font-medium"
                  style={{ color: state.subjects.find(s => s.id === currentFlashcard.subjectId)?.color }}
                >
                  {getSubjectName(currentFlashcard.subjectId)}
                </span>
              )}
            </div>
            
            <div 
              className="bg-white border rounded-lg p-6 mb-6 min-h-[200px] relative cursor-pointer"
              onClick={toggleAnswer}
            >
              {currentFlashcard && (
                <>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFlashcard(currentFlashcard.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <BookOpen className="text-gray-300 mb-4" size={32} />
                    
                    {!showAnswer ? (
                      <>
                        <h3 className="text-lg font-medium text-center mb-6">
                          {currentFlashcard.question}
                        </h3>
                        <p className="text-sm text-center text-gray-500">
                          Tap to reveal answer
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium text-center mb-2 text-gray-500">
                          {currentFlashcard.question}
                        </h3>
                        <div className="h-px w-16 bg-gray-200 my-4"></div>
                        <p className="text-center font-medium">
                          {currentFlashcard.answer}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={prevCard}
                disabled={activeFlashcardIndex === 0}
                variant="outline"
              >
                Previous
              </Button>
              
              <Button onClick={toggleAnswer}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
              
              <Button
                onClick={nextCard}
                disabled={activeFlashcardIndex === filteredFlashcards.length - 1}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg">No flashcards yet</p>
            <p className="text-sm mt-2">
              Use the AI Generator to create flashcards from your study notes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardList;