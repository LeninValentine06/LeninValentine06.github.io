import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, LineChart, BookMarked } from 'lucide-react';
import SessionSummary from '../components/dashboard/SessionSummary';
import ProgressChart from '../components/dashboard/ProgressChart';
import UpcomingSessions from '../components/dashboard/UpcomingSessions';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your study progress</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/plan">
            <Button>
              <Clock size={16} className="mr-2" />
              New Study Session
            </Button>
          </Link>
        </div>
      </div>
      
      <SessionSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingSessions />
        <ProgressChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Smart Scheduler</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Get AI-powered suggestions for optimal study schedules based on your learning preferences and subject difficulty.
            </p>
            <Link to="/plan">
              <Button variant="outline" fullWidth>
                <Clock size={16} className="mr-2" />
                Get Scheduling Suggestions
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Flashcards</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate and practice with flashcards created from your study notes using AI technology.
            </p>
            <Link to="/flashcards">
              <Button variant="outline" fullWidth>
                <BookMarked size={16} className="mr-2" />
                Manage Flashcards
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;