import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * @page NotFound
 * @summary Page displayed when a route is not found (404).
 * @route *
 * @layout RootLayout
 * @type public-page
 */
export const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - Guess The Number</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-4">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
        <div className="bg-gray-800 text-white px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};
