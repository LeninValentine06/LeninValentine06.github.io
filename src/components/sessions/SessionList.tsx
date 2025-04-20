import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { StudySession } from '../../types';
import { formatDate, formatDuration } from '../../utils/dateUtils';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Clock, Calendar, Check, X } from 'lucide-react';
import Button from '../ui/Button';
import { TextArea } from '../ui/Input';

const SessionList: React.FC = () => {
  const { state, dispatch } = useStudy();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedSession, setSelectedSession] = useState<StudySession | null>(null);
  const [notes, setNotes] = useState('');
  
  // Filter sessions based on selected filter
  const filteredSessions = state.sessions.filter(session => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !session.completed;
    if (filter === 'completed') return session.completed;
    return true;
  }).sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime());
  
  // Open completion dialog
  const openCompletionDialog = (session: StudySession) => {
    setSelectedSession(session);
    setNotes(session.notes || '');
  };
  
  // Close dialog
  const closeDialog = () => {
    setSelectedSession(null);
    setNotes('');
  };
  
  // Mark session as complete
  const completeSession = () => {
    if (selectedSession) {
      dispatch({
        type: 'COMPLETE_SESSION',
        payload: {
          id: selectedSession.id,
          notes,
        },
      });
      closeDialog();
    }
  };
  
  // Delete session
  const deleteSession = (id: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      dispatch({
        type: 'DELETE_SESSION',
        payload: { id },
      });
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Study Sessions</h2>
          <div className="flex space-x-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'pending' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === 'completed' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSessions.length > 0 ? (
            <div className="space-y-4">
              {filteredSessions.map(session => (
                <div 
                  key={session.id} 
                  className={`
                    p-4 rounded-lg border transition-all duration-200 
                    ${session.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-[#ff7f11]'}
                  `}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
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
                      
                      {session.completed && session.notes && (
                        <div className="mt-3 p-3 bg-white rounded-md border border-gray-100">
                          <p className="text-sm italic text-gray-700">{session.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                      <div className="flex items-center justify-start md:justify-end text-sm font-medium">
                        <Clock size={16} className="mr-1" />
                        {formatDuration(session.duration)}
                      </div>
                      <div className="flex items-center justify-start md:justify-end text-xs text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(new Date(session.scheduledFor))}
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        {!session.completed && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openCompletionDialog(session)}
                            className="border-green-500 text-green-500 hover:bg-green-50"
                          >
                            <Check size={16} className="mr-1" />
                            Complete
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteSession(session.id)}
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        >
                          <X size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No sessions found</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Completion Dialog */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Complete Study Session</h2>
            <p className="mb-4">
              You're marking <span className="font-medium">{selectedSession.topic}</span> as complete.
            </p>
            
            <TextArea
              label="Session Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn? Any key takeaways?"
              rows={4}
              fullWidth
            />
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={closeDialog}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={completeSession}
              >
                Complete Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionList;