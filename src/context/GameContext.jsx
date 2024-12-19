import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState('home');
  const [highScores, setHighScores] = useState({
    flappy: 0,
    dino: 0,
    pomodoro: 0,
  });

  const switchGame = (game) => {
    setCurrentGame(game);
  };

  const updateHighScore = (game, score) => {
    setHighScores(prev => ({
      ...prev,
      [game]: Math.max(prev[game], score)
    }));
  };

  const value = {
    currentGame,
    switchGame,
    highScores,
    updateHighScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};