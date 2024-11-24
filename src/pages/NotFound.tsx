import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Go back home
      </Link>
    </div>
  );
}