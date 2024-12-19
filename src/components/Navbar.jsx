import React from 'react';
import { useGameContext } from '../context/GameContext';

const Navbar = () => {
  const { currentGame, switchGame, highScores } = useGameContext();

  const navItems = [
    { id: 'home', name: 'Home' },
    { id: 'flappy', name: 'Flappy Bird', score: highScores.flappy },
    { id: 'dino', name: 'Dino Game', score: highScores.dino },
    { id: 'pomodoro', name: 'Pomodoro' },
  ];

  return (
    <nav className="bg-black/30 backdrop-blur-md border-b-2 border-neon-blue">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => switchGame(item.id)}
                className={`px-4 py-2 rounded-lg font-minecraft transition-all duration-300 ${
                  currentGame === item.id
                    ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,247,255,0.5)]'
                    : 'text-white hover:text-neon-blue'
                }`}
              >
                <span>{item.name}</span>
                {item.score !== undefined && (
                  <span className="ml-2 text-sm">
                    High: {item.score}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;