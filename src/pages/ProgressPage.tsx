import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { formatDuration } from '../utils/dateUtils';
import ProgressChart from '../components/dashboard/ProgressChart';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { TrendingUp, Clock, Calendar, BookOpen } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const { state } = useStudy();
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('week');
  
  // Get study stats
  const getTimeframeData = () => {
    const now = new Date();
    let startDate = new Date();
    
    if (timeframe === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeframe === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else {
      // All time - set to a very old date
      startDate = new Date(0);
    }
    
    return state.sessions.filter(session => 
      session.completed && 
      new Date(session.dateCompleted || 0) >= startDate
    );
  };
  
  const filteredSessions = getTimeframeData();
  
  // Calculate total study time in minutes
  const totalStudyTime = filteredSessions.reduce(
    (total, session) => total + session.duration, 0
  );
  
  // Calculate study time per day (for last 7 days)
  const getStudyByDay = () => {
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyMinutes = Array(7).fill(0);
    
    // Get sessions from last 7 days
    const lastWeekSessions = state.sessions.filter(session => {
      if (!session.completed || !session.dateCompleted) return false;
      const sessionDate = new Date(session.dateCompleted);
      const daysAgo = Math.floor((new Date().getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysAgo < 7;
    });
    
    // Populate daily minutes
    lastWeekSessions.forEach(session => {
      if (session.dateCompleted) {
        const day = new Date(session.dateCompleted).getDay();
        dailyMinutes[day] += session.duration;
      }
    });
    
    return { dayLabels, dailyMinutes };
  };
  
  const { dayLabels, dailyMinutes } = getStudyByDay();
  const maxDailyMinutes = Math.max(...dailyMinutes, 60); // Set minimum scale to 60 minutes
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="text-gray-600 mt-1">Visualize your study progress</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Card className="w-full md:w-[calc(33%-1rem)] flex flex-col items-center justify-center p-6">
          <div className="p-3 rounded-full bg-blue-100 mb-3">
            <Clock className="text-blue-600" size={24} />
          </div>
          <p className="text-gray-500 text-sm">Total Study Time</p>
          <h3 className="text-2xl font-bold">{formatDuration(totalStudyTime)}</h3>
        </Card>
        
        <Card className="w-full md:w-[calc(33%-1rem)] flex flex-col items-center justify-center p-6">
          <div className="p-3 rounded-full bg-green-100 mb-3">
            <BookOpen className="text-green-600" size={24} />
          </div>
          <p className="text-gray-500 text-sm">Sessions Completed</p>
          <h3 className="text-2xl font-bold">{filteredSessions.length}</h3>
        </Card>
        
        <Card className="w-full md:w-[calc(33%-1rem)] flex flex-col items-center justify-center p-6">
          <div className="p-3 rounded-full bg-purple-100 mb-3">
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          <p className="text-gray-500 text-sm">Avg. Session Length</p>
          <h3 className="text-2xl font-bold">
            {filteredSessions.length ? formatDuration(totalStudyTime / filteredSessions.length) : '0m'}
          </h3>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Study Time Distribution</h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'week' 
                  ? 'bg-[#ff7f11] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'month' 
                  ? 'bg-[#ff7f11] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeframe('all')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'all' 
                  ? 'bg-[#ff7f11] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Time
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <ProgressChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Daily Study Time (Last 7 Days)</h2>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-end justify-between px-2">
            {dayLabels.map((day, index) => (
              <div key={day} className="flex flex-col items-center">
                <div 
                  className="w-12 bg-[#ff7f11] rounded-t-md transition-all duration-500 ease-out"
                  style={{ 
                    height: `${(dailyMinutes[index] / maxDailyMinutes) * 100}%`,
                    minHeight: dailyMinutes[index] > 0 ? '4px' : '0'
                  }}
                ></div>
                <div className="mt-2 text-sm">{day}</div>
                <div className="text-xs text-gray-500">
                  {formatDuration(dailyMinutes[index])}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;