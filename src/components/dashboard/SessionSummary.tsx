import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Clock, CheckCircle2, Calendar } from 'lucide-react';
import { formatDuration } from '../../utils/dateUtils';

const SessionSummary: React.FC = () => {
  const { state } = useStudy();
  
  // Calculate summary statistics
  const totalSessions = state.sessions.length;
  const completedSessions = state.sessions.filter(session => session.completed).length;
  const completionRate = totalSessions > 0 
    ? Math.round((completedSessions / totalSessions) * 100) 
    : 0;
  
  // Calculate total study time (in minutes)
  const totalStudyTime = state.sessions
    .filter(session => session.completed)
    .reduce((total, session) => total + session.duration, 0);
  
  // Get upcoming sessions
  const upcomingSessions = state.sessions
    .filter(session => !session.completed)
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Summary Cards */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 mr-4">
          <Calendar className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
          <p className="text-2xl font-bold">{totalSessions}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
        <div className="p-3 rounded-full bg-green-100 mr-4">
          <CheckCircle2 className="text-green-600" size={24} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
        <div className="p-3 rounded-full bg-purple-100 mr-4">
          <Clock className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Study Time</h3>
          <p className="text-2xl font-bold">{formatDuration(totalStudyTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;