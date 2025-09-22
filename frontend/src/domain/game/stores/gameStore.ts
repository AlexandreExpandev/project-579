import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GameState, GameStore } from '../types';

/**
 * @store useGameStore
 * @summary Zustand store for managing the state of the GuessNumber game.
 * @domain game
 * @type domain-store
 * @stateManager zustand
 */
export const useGameStore = create<GameStore>()(
  immer((set) => ({
    // #region State
    gameId: null,
    attempts: 0,
    isGameOver: false,
    feedback: null,
    isLoading: false,
    error: null,
    // #endregion

    // #region Actions
    setGameState: (state: Partial<GameState>) =>
      set((draft) => {
        Object.assign(draft, state);
      }),

    setLoading: (isLoading) =>
      set((draft) => {
        draft.isLoading = isLoading;
      }),

    setError: (error) =>
      set((draft) => {
        draft.error = error;
      }),

    resetGame: () =>
      set({
        gameId: null,
        attempts: 0,
        isGameOver: false,
        feedback: null,
        isLoading: false,
        error: null,
      }),
    // #endregion
  })),
);

// #region Selectors
export const useGameActions = () =>
  useGameStore((state) => ({
    setGameState: state.setGameState,
    setLoading: state.setLoading,
    setError: state.setError,
    resetGame: state.resetGame,
  }));
