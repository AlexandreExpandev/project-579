import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AppRouter } from './router';
import { AuthProvider } from '@/core/contexts/auth';

/**
 * @provider AppProviders
 * @summary Centralized configuration of all application context providers.
 * @type provider-configuration
 * @category setup
 *
 * @providers
 * - QueryClientProvider: Server state management
 * - AuthProvider: Authentication context
 * - HelmetProvider: SEO and document head management
 * - Toaster: Toast notifications
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders = (): JSX.Element => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
