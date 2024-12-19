import React, { useState, useEffect, useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import '../styles/Dino.css';

const JUMP_FORCE = 150;
const DOUBLE_JUMP_FORCE = 120;
const GRAVITY = 6;
const OBSTACLE_SPEED = 8;
const SPAWN_RATE = 1500;
const DOUBLE_JUMP_WINDOW = 500;
const DINO_HEIGHT = 60;
const MAX_OBSTACLE_HEIGHT = 45;

const Dino = () => {
  const { updateHighScore } = useGameContext();
  const [dinoPos, setDinoPos] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [canDoubleJump, setCanDoubleJump] = useState(false);
  const [hasDoubleJumped, setHasDoubleJumped] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('dinoHighScore') || '0')
  );
  const [obstacles, setObstacles] = useState([]);
  const [lastJumpTime, setLastJumpTime] = useState(0);

  const jump = useCallback(() => {
    const currentTime = Date.now();
    
    if (!gameOver) {
      if (!isJumping) {
        setIsJumping(true);
        setDinoPos(JUMP_FORCE);
        setLastJumpTime(currentTime);
        setCanDoubleJump(true);
        setHasDoubleJumped(false);
        if (!gameStarted) {
          setGameStarted(true);
        }
      } else if (canDoubleJump && !hasDoubleJumped && 
                currentTime - lastJumpTime < DOUBLE_JUMP_WINDOW) {
        setDinoPos((pos) => pos + DOUBLE_JUMP_FORCE);
        setHasDoubleJumped(true);
        setCanDoubleJump(false);
      }
    }
  }, [isJumping, canDoubleJump, hasDoubleJumped, gameOver, gameStarted, lastJumpTime]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const obstacleSpawner = setInterval(() => {
        setObstacles((obstacles) => [
          ...obstacles,
          {
            x: window.innerWidth,
            height: Math.floor(Math.random() * MAX_OBSTACLE_HEIGHT) + 20,
            passed: false,
            scored: false,
          },
        ]);
      }, SPAWN_RATE);

      return () => clearInterval(obstacleSpawner);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        setDinoPos((pos) => {
          if (pos <= 0) {
            setIsJumping(false);
            setCanDoubleJump(false);
            setHasDoubleJumped(false);
            return 0;
          }
          return Math.max(0, pos - GRAVITY);
        });

        setObstacles((obstacles) => {
          const updatedObstacles = obstacles
            .map((obstacle) => ({
              ...obstacle,
              x: obstacle.x - OBSTACLE_SPEED,
              passed: obstacle.passed || 
                     (obstacle.x < 50 && !obstacle.scored && dinoPos > obstacle.height)
            }))
            .filter((obstacle) => obstacle.x > -50);

          updatedObstacles.forEach((obstacle) => {
            if (obstacle.passed && !obstacle.scored) {
              setScore((prevScore) => {
                const newScore = prevScore + 10;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  localStorage.setItem('dinoHighScore', newScore.toString());
                  updateHighScore('dino', newScore);
                }
                return newScore;
              });
              obstacle.scored = true;
            }
          });

          return updatedObstacles;
        });

        // Collision detection
        obstacles.forEach((obstacle) => {
          const dinoRight = 110;
          const dinoLeft = 50;
          const obstacleLeft = obstacle.x;
          const obstacleRight = obstacle.x + 20;
          const dinoBottom = dinoPos;
          const obstacleTop = obstacle.height;

          if (
            dinoRight > obstacleLeft &&
            dinoLeft < obstacleRight &&
            dinoBottom < obstacleTop
          ) {
            setGameOver(true);
          }
        });
      }, 16);

      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, gameOver, obstacles, dinoPos, highScore, updateHighScore]);

  const resetGame = () => {
    setDinoPos(0);
    setIsJumping(false);
    setCanDoubleJump(false);
    setHasDoubleJumped(false);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
  };

  return (
    <div className="dino-game" onClick={jump}>
      <div className="score-display">Score: {score}</div>
      <div className="high-score">High Score: {highScore}</div>
      
      <div
        className={`dino-character ${isJumping ? 'jumping' : ''}`}
        style={{ transform: `translateY(-${dinoPos}px)` }}
      />
      
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className={`obstacle ${obstacle.height > 35 ? 'tall' : ''}`}
          style={{
            left: `${obstacle.x}px`,
            height: `${obstacle.height}px`,
          }}
        />
      ))}
      
      <div className="ground" />
      
      {gameOver && (
        <div className="game-over-screen">
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      
      {!gameStarted && !gameOver && (
        <div className="start-screen">
          <h2>Press Space or Click to Start</h2>
          <p>Double jump available!</p>
        </div>
      )}
    </div>
  );
};

export default Dino;