import React from 'react';
import Game from './Game';
import Dino from './Dino';
import Pomodoro from './Pomodoro';
import { useGameContext } from '../context/GameContext';
import dinoImage from '../assets/dino.png';
import flappyImage from '../assets/flappy.png';
import pomodoroImage from '../assets/pomodoro.png';

const HomeScreen = () => {
  const { currentGame, switchGame } = useGameContext();

  const renderGame = () => {
    switch (currentGame) {
      case 'flappy':
        return <Game />;
      case 'dino':
        return <Dino />;
      case 'pomodoro':
        return <Pomodoro />;
      default:
        return (
          <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-deep-blue to-light-blue flex flex-col items-center justify-center p-5 relative overflow-hidden">
            <h1 className="text-neon-blue text-4xl text-center cursor-pointer mb-12 hover:animate-glow">
              I have made some old games with modern touch.
            </h1>

            <p className='text-white text-2xl text-shadow-[0_0_10px_rgba(0,247,255,0.5)]'>
              Choose a game
            </p>
            
            <div className="flex gap-10 justify-center items-center p-5 max-w-7xl w-full">
              <div 
                className="game-card border-neon-pink hover:shadow-[0_0_30px_rgba(255,0,234,0.3)]"
                onClick={() => switchGame('flappy')}
              >
                <img 
                  src={flappyImage}
                  alt="Flappy Bird"
                  className="drop-shadow-[0_0_10px_rgba(255,0,234,0.5)]"
                />
                <p className="text-shadow-[0_0_10px_rgba(255,0,234,0.5)]">
                  Flappy Bird | Futuristic Version
                </p>
              </div>
              
              <div 
                className="game-card border-neon-blue hover:shadow-[0_0_30px_rgba(0,247,255,0.3)]"
                onClick={() => switchGame('dino')}
              >
                <img 
                  src={dinoImage}
                  alt="Dino Game"
                  className="drop-shadow-[0_0_10px_rgba(0,247,255,0.5)]"
                />
                <p className="text-shadow-[0_0_10px_rgba(0,247,255,0.5)]">
                  Dino Game | Futuristic Version
                </p>
              </div>

              <div 
                className="game-card border-neon-blue hover:shadow-[0_0_30px_rgba(0,247,255,0.3)]"
                onClick={() => switchGame('pomodoro')}
              >
                <img 
                  src={pomodoroImage}
                  alt="Pomodoro Timer"
                  className="drop-shadow-[0_0_10px_rgba(0,247,255,0.5)]"
                />
                <p className="text-shadow-[0_0_10px_rgba(0,247,255,0.5)]">
                  PomoDoro | Futuristic Version
                </p>
              </div>
            </div>
            
            <p className="absolute bottom-5 text-white text-base font-minecraft text-shadow-[0_0_10px_rgba(0,247,255,0.5)]">
              Made By Muffakir
            </p>
          </div>
        );
    }
  };

  return renderGame();
};

export default HomeScreen;