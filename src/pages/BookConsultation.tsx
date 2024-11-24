import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { students, consultations } from '../lib/api';
import { format } from 'date-fns';

export default function BookConsultation() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');

  const { data: student } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => students.getById(studentId!),
  });

  const bookMutation = useMutation({
    mutationFn: consultations.create,
    onSuccess: () => {
      navigate('/dashboard');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !topic) return;

    bookMutation.mutate({
      studentId,
      date: selectedDate,
      timeSlot: {
        start: selectedSlot,
        end: format(new Date(selectedSlot), 'HH:mm'),
      },
      topic,
    });
  };

  if (!student) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Book Consultation with {student.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time Slot</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a time slot</option>
            {student.availability?.[format(new Date(selectedDate), 'EEEE').toLowerCase()]?.map((slot) => (
              <option key={slot.start} value={slot.start}>
                {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Topic</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={bookMutation.isPending}
        >
          {bookMutation.isPending ? 'Booking...' : 'Book Consultation'}
        </button>
      </form>
    </div>
  );
}