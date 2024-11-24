import { useQuery } from '@tanstack/react-query';
import { students } from '../../lib/api';
import { MedicalStudent } from '../../types';
import StudentCard from '../../components/StudentCard';

export default function UserDashboard() {
  const { data: medicalStudents } = useQuery<MedicalStudent[]>({
    queryKey: ['students'],
    queryFn: students.getAll,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Medical Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicalStudents?.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}