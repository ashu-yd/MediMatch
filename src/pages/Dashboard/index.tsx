import { useAuth } from '../../hooks/useAuth';
import UserDashboard from './UserDashboard';
import StudentDashboard from './StudentDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {user.role === 'medical_student' ? <StudentDashboard /> : <UserDashboard />}
    </div>
  );
}