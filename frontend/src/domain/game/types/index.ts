export type Feedback = 'too-low' | 'too-high' | 'correct' | null;

export interface GameState {
  gameId: string | null;
  attempts: number;
  isGameOver: boolean;
  feedback: Feedback;
}

export interface GameStore extends GameState {
  isLoading: boolean;
  error: string | null;
  setGameState: (state: Partial<GameState>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetGame: () => void;
}
