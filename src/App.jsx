import React from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative">
          <HomeScreen />
        </main>
      </div>
    </GameProvider>
  );
}

export default App;