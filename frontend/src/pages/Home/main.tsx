import { Helmet } from 'react-helmet-async';

/**
 * @page Home
 * @summary The main landing page of the application.
 * @route /
 * @layout RootLayout
 * @type public-page
 */
export const HomePage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Welcome - Guess The Number</title>
        <meta name="description" content="Welcome to the Guess The Number game. Ready to play?" />
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Guess The Number
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          This is the foundational structure for the GuessNumber game. Features will be built on top of this robust and scalable React architecture.
        </p>
        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            onClick={() => alert('Game feature not implemented yet!')}
          >
            Start New Game
          </button>
        </div>
      </div>
    </>
  );
};
