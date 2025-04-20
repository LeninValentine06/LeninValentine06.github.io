import React from 'react';
import FlashcardGenerator from '../components/flashcards/FlashcardGenerator';
import FlashcardList from '../components/flashcards/FlashcardList';

const FlashcardsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Study Flashcards</h1>
        <p className="text-gray-600 mt-1">Create and practice with AI-generated flashcards</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlashcardGenerator />
        <FlashcardList />
      </div>
    </div>
  );
};

export default FlashcardsPage;