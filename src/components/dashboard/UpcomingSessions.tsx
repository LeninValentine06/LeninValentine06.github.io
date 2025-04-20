import React from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '../../context/StudyContext';
import { formatDate, getRelativeDay, formatDuration } from '../../utils/dateUtils';
import { Calendar, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';

const UpcomingSessions: React.FC = () => {
  const { state } = useStudy();
  
  // Get upcoming sessions (not completed, sorted by date)
  const upcomingSessions = state.sessions
    .filter(session => !session.completed)
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Sessions</h2>
        <Link to="/plan" className="text-[#ff7f11] hover:underline text-sm flex items-center">
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div 
                key={session.id} 
                className="p-4 rounded-lg border border-gray-100 hover:border-[#ff7f11] transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div 
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2"
                      style={{ 
                        backgroundColor: `${session.subject.color}25`,
                        color: session.subject.color,
                      }}
                    >
                      {session.subject.name}
                    </div>
                    <h3 className="font-medium">{session.topic}</h3>
                    <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatDuration(session.duration)}</div>
                  </div>
                </div>
                <div className="flex items-center mt-3 text-xs text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {getRelativeDay(new Date(session.scheduledFor))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={40} className="mx-auto mb-2 opacity-40" />
            <p>No upcoming sessions</p>
            <Link to="/plan" className="text-[#ff7f11] hover:underline text-sm mt-2 inline-block">
              Plan new study session
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;