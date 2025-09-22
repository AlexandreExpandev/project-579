import api from '@/core/lib/api';
import { GameState } from '../types';

/**
 * @service gameAPI
 * @summary Provides methods for interacting with the game API endpoints.
 */
export const gameAPI = {
  /**
   * @summary Starts a new game session.
   */
  startNewGame: async (): Promise<GameState> => {
    const response = await api.post('/internal/game/start');
    return response.data.data;
  },

  /**
   * @summary Submits a guess for the current game.
   * @param {number} guess The user's guess.
   */
  makeGuess: async (guess: number): Promise<GameState> => {
    const response = await api.post('/internal/game/guess', { guess });
    return response.data.data;
  },
};
