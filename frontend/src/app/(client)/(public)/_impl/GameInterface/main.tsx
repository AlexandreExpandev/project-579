'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useGameContext } from '@/contexts/game';
import { gameInterfaceVariant } from './variants';

/**
 * @component GameInterface
 * @description A interface principal para o jogo de adivinhação de números.
 *
 * @returns {JSX.Element} A interface do jogo renderizada.
 */
export const GameInterface = () => {
  // #region Contexts
  const {
    gameState,
    startGame,
    makeGuess,
    isLoading,
  } = useGameContext();
  // #endregion

  // #region States
  const [currentGuess, setCurrentGuess] = useState('');
  // #endregion

  // #region Handlers
  const handleGuessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números inteiros
    if (/^\d*$/.test(value)) {
      setCurrentGuess(value);
    }
  }, []);

  const handleSubmitGuess = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const guessNumber = parseInt(currentGuess, 10);
    if (!isNaN(guessNumber)) {
      await makeGuess(guessNumber);
      setCurrentGuess('');
    }
  }, [currentGuess, makeGuess]);

  const handleStartNewGame = useCallback(async () => {
    await startGame();
    setCurrentGuess('');
  }, [startGame]);
  // #endregion

  // #region Memos
  const isGameFinished = gameState.status === 'finished';
  const isGameInProgress = gameState.status === 'in-progress';
  // #endregion

  // #region Styles
  const styles = gameInterfaceVariant();
  // #endregion

  // #region Renderers
  const renderFeedback = () => {
    if (!gameState.feedback) return null;

    let message = '';
    if (gameState.feedback === 'maior') message = 'O número secreto é MAIOR!';
    if (gameState.feedback === 'menor') message = 'O número secreto é MENOR!';
    if (gameState.feedback === 'correto') message = `Parabéns! Você acertou em ${gameState.attempts} tentativas!`;

    return <p className={styles.feedback({ feedback: gameState.feedback })}>{message}</p>;
  };
  // #endregion

  return (
    <Card // wrapper
      className={styles.wrapper()}
    >
      <h1 // title
        className={styles.title()}
      >
        Adivinhe o Número
      </h1>
      <p // description
        className={styles.description()}
      >
        Eu escolhi um número entre 1 e 100. Tente adivinhar!
      </p>

      {isGameInProgress && (
        <form // gameForm
          onSubmit={handleSubmitGuess} 
          className={styles.gameForm()}
        >
          <Input // guessInput
            nativeProps={{
              type: 'text',
              placeholder: 'Seu palpite',
              value: currentGuess,
              onChange: handleGuessChange,
              disabled: isLoading,
              autoFocus: true,
              pattern: '[0-9]*',
            }}
          />
          <Button // submitButton
            nativeProps={{
              type: 'submit',
              disabled: isLoading || !currentGuess,
            }}
            variant="primary"
          >
            {isLoading ? 'Enviando...' : 'Adivinhar'}
          </Button>
        </form>
      )}

      <div // results
        className={styles.results()}
      >
        {renderFeedback()}
        {isGameInProgress && gameState.attempts > 0 && (
          <p // attempts
            className={styles.attempts()}
          >
            Tentativas: {gameState.attempts}
          </p>
        )}
      </div>

      {(isGameFinished || !gameState.gameId) && (
        <Button // newGameButton
          onClick={handleStartNewGame}
          disabled={isLoading}
          variant="secondary"
          className={styles.newGameButton()}
        >
          {isLoading ? 'Iniciando...' : 'Novo Jogo'}
        </Button>
      )}
    </Card>
  );
};
