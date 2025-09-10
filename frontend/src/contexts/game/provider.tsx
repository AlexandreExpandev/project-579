'use client';

import React, { useState, useCallback, useMemo } from 'react';
import * as gameService from '@/services/game';
import { GameProviderInternal } from './context';
import type { GameProviderProps, GameState } from './types';

const INITIAL_GAME_STATE: GameState = {
  gameId: null,
  attempts: 0,
  status: 'finished',
  feedback: null,
};

/**
 * @provider GameProvider
 * @description Provedor de estado para o jogo GuessNumber.
 */
export const GameProvider = ({ children }: GameProviderProps) => {
  // #region States
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isLoading, setIsLoading] = useState(false);
  // #endregion

  // #region Callbacks
  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const { gameId } = await gameService.startGame();
      setGameState({
        gameId,
        attempts: 0,
        status: 'in-progress',
        feedback: null,
      });
    } catch (error) {
      console.error('Failed to start game:', error);
      // TODO: Adicionar tratamento de erro para o usuário
    } finally {
      setIsLoading(false);
    }
  }, []);

  const makeGuess = useCallback(async (guess: number) => {
    if (!gameState.gameId) return;

    setIsLoading(true);
    try {
      const result = await gameService.makeGuess(gameState.gameId, guess);
      setGameState(prevState => ({
        ...prevState,
        attempts: result.attempts,
        status: result.status,
        feedback: result.feedback,
      }));
    } catch (error) {
      console.error('Failed to make guess:', error);
      // TODO: Adicionar tratamento de erro para o usuário
    } finally {
      setIsLoading(false);
    }
  }, [gameState.gameId]);
  // #endregion

  // #region Memos
  const contextValue = useMemo(() => ({
    gameState,
    isLoading,
    startGame,
    makeGuess,
  }), [gameState, isLoading, startGame, makeGuess]);
  // #endregion

  return (
    <GameProviderInternal value={contextValue}>
      {children}
    </GameProviderInternal>
  );
};
