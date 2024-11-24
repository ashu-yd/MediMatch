import { MedicalStudent } from '../types';
import { Link } from 'react-router-dom';

interface StudentCardProps {
  student: MedicalStudent;
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img
          src={student.profileImage || 'https://via.placeholder.com/60'}
          alt={student.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.specialization}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{student.bio}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{student.rating.toFixed(1)}</span>
        </div>
        <Link
          to={`/book/${student.id}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}