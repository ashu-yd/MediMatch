import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { consultations } from '../../lib/api';
import ConsultationList from '../../components/ConsultationList';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: studentConsultations } = useQuery({
    queryKey: ['consultations', user?.id],
    queryFn: () => consultations.getByStudentId(user?.id as string),
    enabled: !!user?.id,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Consultations</h2>
      <ConsultationList consultations={studentConsultations || []} />
    </div>
  );
}