import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro');

  const modes = {
    pomodoro: { name: 'Pomodoro', time: 25, color: 'neon-pink' },
    shortBreak: { name: 'Short Break', time: 5, color: 'neon-blue' },
    longBreak: { name: 'Long Break', time: 15, color: 'light-blue' },
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer complete
            setIsRunning(false);
            // Play sound or notification here
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMinutes(modes[newMode].time);
    setSeconds(0);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setMinutes(modes[mode].time);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-deep-blue to-light-blue flex flex-col items-center justify-start p-5">
      <h1 className="text-neon-blue text-6xl font-minecraft mt-10 animate-glow">
        Pomodoro Timer
      </h1>

      <div className="bg-black/30 backdrop-blur-md w-96 mx-auto p-8 rounded-2xl flex flex-col items-center justify-center mt-20 border-2 border-neon-blue shadow-[0_0_30px_rgba(0,247,255,0.3)]">
        <div className="flex gap-4 bg-black/20 p-2 rounded-xl">
          {Object.entries(modes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleModeChange(key)}
              className={`px-4 py-2 rounded-lg font-minecraft transition-all duration-300 ${
                mode === key
                ? `bg-${value.color} text-black shadow-[0_0_15px_rgba(0,247,255,0.5)]`
                : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              {value.name}
            </button>
          ))}
        </div>

        <div className="text-8xl font-minecraft text-white my-12 tracking-widest">
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-lg font-minecraft text-xl transition-all duration-300 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-neon-blue hover:bg-blue-400'
            } text-black shadow-[0_0_15px_rgba(0,247,255,0.5)]`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-3 rounded-lg font-minecraft text-xl bg-transparent border-2 border-neon-blue text-white hover:bg-white/10 transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="absolute bottom-5 text-white text-base font-minecraft text-shadow-[0_0_10px_rgba(0,247,255,0.5)]">
        Made By Muffakir
      </p>
    </div>
  );
};

export default Pomodoro;