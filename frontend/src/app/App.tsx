import { AppProviders } from './providers';

/**
 * @component App
 * @summary Root React application component that initializes all providers
 * and global configurations.
 * @type root-component
 * @category application
 */
export const App = (): JSX.Element => {
  return <AppProviders />;
};
