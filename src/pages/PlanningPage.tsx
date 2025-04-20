import React from 'react';
import SessionForm from '../components/sessions/SessionForm';
import SessionList from '../components/sessions/SessionList';

const PlanningPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Study Planning</h1>
        <p className="text-gray-600 mt-1">Create and manage your study sessions</p>
      </div>
      
      <SessionForm />
      
      <div className="mt-12">
        <SessionList />
      </div>
    </div>
  );
};

export default PlanningPage;