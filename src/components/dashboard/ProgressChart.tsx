import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Subject } from '../../types';
import { PieChart, Activity } from 'lucide-react';

const ProgressChart: React.FC = () => {
  const { state } = useStudy();
  
  // Calculate study time per subject
  const subjectTimeMap = state.sessions
    .filter(session => session.completed)
    .reduce((acc, session) => {
      const subjectId = session.subject.id;
      if (!acc[subjectId]) {
        acc[subjectId] = {
          subject: session.subject,
          totalMinutes: 0,
          sessionCount: 0,
        };
      }
      acc[subjectId].totalMinutes += session.duration;
      acc[subjectId].sessionCount += 1;
      return acc;
    }, {} as Record<string, { subject: Subject; totalMinutes: number; sessionCount: number }>);
  
  const subjectStats = Object.values(subjectTimeMap).sort(
    (a, b) => b.totalMinutes - a.totalMinutes
  );
  
  // Calculate total study time
  const totalStudyMinutes = subjectStats.reduce(
    (total, stat) => total + stat.totalMinutes, 0
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Study Progress</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Activity size={16} />
          <span>Subject Breakdown</span>
        </div>
      </div>
      
      {totalStudyMinutes > 0 ? (
        <div className="space-y-4">
          {subjectStats.map(({ subject, totalMinutes, sessionCount }) => {
            const percentage = Math.round((totalMinutes / totalStudyMinutes) * 100);
            
            return (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
                    <span className="text-xs text-gray-500 ml-1">
                      ({sessionCount} sessions)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: subject.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <PieChart size={48} className="mb-2 opacity-40" />
          <p className="text-lg">No completed study sessions yet</p>
          <p className="text-sm">Complete study sessions to see your progress</p>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;