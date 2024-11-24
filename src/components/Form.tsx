import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  error?: FieldErrors;
  required?: boolean;
}

export const FormField = ({
  label,
  name,
  type = 'text',
  register,
  error,
  required = false,
}: FormFieldProps) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      {...register(name, { required })}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
    {error && error[name] && (
      <p className="mt-1 text-sm text-red-600">{error[name]?.message as string}</p>
    )}
  </div>
);

export const Button = ({
  type = 'button',
  children,
  onClick,
  className = '',
}: {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);