/**
 * @module game
 * @summary Manages all game-related functionality including starting a new game,
 * making guesses, and tracking game state.
 * @domain functional
 * @dependencies ["core/lib/api", "zustand"]
 * @version 1.0.0
 * @author Artemis
 * @lastModified 2024-05-21
 */

// Public exports will be added here as features are built
// export * from './components/GuessForm';
// export * from './hooks/useGame';
export * from './services/gameAPI';
export * from './stores/gameStore';
export * from './types';

export const gameModuleMetadata = {
  name: 'game',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [],
  publicHooks: [],
  publicServices: ['gameAPI'],
  publicStores: ['useGameStore'],
  dependencies: {
    internal: ['core/lib/api'],
    external: ['zustand', 'axios'],
  },
  routes: ['/game'],
  description: 'Core module for the Guess the Number game logic and state.',
} as const;

export type GameModuleMetadata = typeof gameModuleMetadata;
