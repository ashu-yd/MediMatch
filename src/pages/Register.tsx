import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { FormField, Button } from '../components/Form';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'medical_student']),
});

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Name"
          name="name"
          register={register}
          error={errors}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors}
          required
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors}
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account Type</label>
          <select
            {...register('role')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="user">User</option>
            <option value="medical_student">Medical Student</option>
          </select>
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}