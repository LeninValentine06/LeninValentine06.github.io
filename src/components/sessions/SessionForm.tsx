import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../context/StudyContext';
import { Subject } from '../../types';
import Input, { TextArea, Select } from '../ui/Input';
import Button from '../ui/Button';
import { Clock, Calendar, Plus } from 'lucide-react';

const SessionForm: React.FC = () => {
  const { state, dispatch } = useStudy();
  const navigate = useNavigate();
  
  // Form state
  const [subjectId, setSubjectId] = useState('');
  const [showNewSubject, setShowNewSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#ff7f11');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Helper to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const localDate = now.toISOString().split('T')[0];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return {
      date: localDate,
      time: `${hours}:${minutes}`,
    };
  };
  
  // Set default date and time when component mounts
  React.useEffect(() => {
    const { date, time } = getCurrentDateTime();
    setDate(date);
    setTime(time);
  }, []);
  
  // Handle adding new subject
  const handleAddSubject = () => {
    if (!newSubjectName.trim()) {
      setErrors({ ...errors, newSubject: 'Please enter a subject name' });
      return;
    }
    
    const newSubject = {
      name: newSubjectName.trim(),
      color: newSubjectColor,
    };
    
    dispatch({
      type: 'ADD_SUBJECT',
      payload: newSubject,
    });
    
    setNewSubjectName('');
    setShowNewSubject(false);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!subjectId && !showNewSubject) newErrors.subject = 'Please select or create a subject';
    if (!topic) newErrors.topic = 'Please enter a topic';
    if (!date) newErrors.date = 'Please select a date';
    if (!time) newErrors.time = 'Please select a time';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const scheduledFor = new Date(`${date}T${time}`);
    
    dispatch({
      type: 'ADD_SESSION',
      payload: {
        subject: state.subjects.find(s => s.id === subjectId) as Subject,
        topic,
        description,
        duration,
        scheduledFor,
      },
    });
    
    navigate('/');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Plan Study Session</h2>
          
          {!showNewSubject ? (
            <div className="mb-4">
              <Select
                label="Subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                options={[
                  { value: '', label: 'Select a subject...' },
                  ...state.subjects.map(subject => ({
                    value: subject.id,
                    label: subject.name,
                  })),
                ]}
                error={errors.subject}
                fullWidth
              />
              <button
                type="button"
                onClick={() => setShowNewSubject(true)}
                className="mt-2 text-sm text-[#ff7f11] hover:underline flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add New Subject
              </button>
            </div>
          ) : (
            <div className="mb-4 space-y-4">
              <Input
                label="Subject Name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="Enter subject name"
                error={errors.newSubject}
                fullWidth
              />
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Subject Color
                </label>
                <input
                  type="color"
                  value={newSubjectColor}
                  onChange={(e) => setNewSubjectColor(e.target.value)}
                  className="h-10 w-20"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  onClick={handleAddSubject}
                  size="sm"
                >
                  Add Subject
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewSubject(false);
                    setNewSubjectName('');
                    setErrors({});
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <Input
            label="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Quadratic Equations, Chapter 5"
            error={errors.topic}
            fullWidth
          />
          
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you want to study? Add specific goals or materials."
            rows={3}
            fullWidth
          />
          
          <div className="mt-6 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Study Duration
            </label>
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gray-500" />
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              {Math.floor(duration / 60) > 0 && `${Math.floor(duration / 60)} hour${Math.floor(duration / 60) > 1 ? 's' : ''} `}
              {duration % 60 > 0 && `${duration % 60} minutes`}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
              fullWidth
            />
            
            <Input
              label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              error={errors.time}
              fullWidth
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Schedule Session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;