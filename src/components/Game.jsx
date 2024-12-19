import React, { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import '../styles/Game.css';

const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const PIPE_SPEED = 3;
const PIPE_SPAWN_RATE = 1500;
const GAP_SIZE = 200;

const Game = () => {
  const [birdPos, setBirdPos] = useState(window.innerHeight / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const jump = useCallback(() => {
    if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
      if (!gameStarted) {
        setGameStarted(true);
      }
    }
  }, [gameOver, gameStarted]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        setBirdPos((pos) => {
          const newPos = pos + birdVelocity;
          if (newPos < 0 || newPos > windowHeight - 40) { 
            setGameOver(true);
            return pos;
          }
          return newPos;
        });
        setBirdVelocity((vel) => vel + GRAVITY);

        setPipes((pipes) =>
          pipes
            .map((pipe) => ({
              ...pipe,
              x: pipe.x - PIPE_SPEED,
            }))
            .filter((pipe) => pipe.x > -100)
        );
      }, 20);

      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, gameOver, birdVelocity, windowHeight]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnPipe = setInterval(() => {
        const height = Math.random() * (windowHeight - GAP_SIZE - 100); 
        setPipes((pipes) => [
          ...pipes,
          {
            x: window.innerWidth,
            topHeight: height,
            bottomHeight: windowHeight - height - GAP_SIZE,
          },
        ]);
      }, PIPE_SPAWN_RATE);

      return () => clearInterval(spawnPipe);
    }
  }, [gameStarted, gameOver, windowHeight]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      pipes.forEach((pipe) => {
        if (
          50 >= pipe.x - 40 &&
          50 <= pipe.x + 60 &&
          (birdPos <= pipe.topHeight || birdPos >= pipe.topHeight + GAP_SIZE - 40)
        ) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('highScore', score.toString());
          }
        }
        if (pipe.x <= 50 && pipe.x >= 47) {  
          setScore(prevScore => prevScore + 1);
        }
      });
    }
  }, [birdPos, pipes, gameStarted, gameOver, score, highScore]);

  return (
    <div className="game" onClick={jump} style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <div className="game-container">
        <Bird position={birdPos} />
        {pipes.map((pipe, index) => (
          <React.Fragment key={index}>
            <Pipe position={pipe.x} height={pipe.topHeight} isTop={true} />
            <Pipe position={pipe.x} height={pipe.bottomHeight} isTop={false} />
          </React.Fragment>
        ))}
      </div>
      <div className="score-container">
        <div className="current-score">Score: {score}</div>
        <div className="high-score">Best: {highScore}</div>
      </div>
      {!gameStarted && (
        <div className="start-message">Press SPACE or Click to Start</div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <div className="final-score">Score: {score}</div>
          <div className="high-score-label">Best: {highScore}</div>
          {score === highScore && score > 0 && (
            <div className="new-high-score">New High Score!</div>
          )}
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
      <p className="muffakir">Made By Muffakir</p>
    </div>
  );
};

export default Game;

