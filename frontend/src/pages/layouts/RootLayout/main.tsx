import { Outlet } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';

/**
 * @component RootLayout
 * @summary The main layout for the application, including header, footer, and content area.
 * @type layout-component
 */
export const RootLayout = (): JSX.Element => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            GuessNumber
          </div>
          <div>
            {isAuthenticated && user ? (
              <span className="text-gray-700">Welcome, {user.name}!</span>
            ) : (
              <span className="text-gray-500">Loading user...</span>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} GuessNumber. All rights reserved.</p>
      </footer>
    </div>
  );
};
