import { Consultation } from '../types';
import { format } from 'date-fns';

interface ConsultationListProps {
  consultations: Consultation[];
}

export default function ConsultationList({ consultations }: ConsultationListProps) {
  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <div
          key={consultation.id}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Consultation with User #{consultation.userId}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(consultation.date), 'PPP')} at{' '}
                {consultation.timeSlot.start}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                consultation.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : consultation.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {consultation.status}
            </span>
          </div>
          <p className="text-gray-700">{consultation.topic}</p>
        </div>
      ))}
    </div>
  );
}