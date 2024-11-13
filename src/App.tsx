import React from 'react';
import { Scene } from './components/Scene';
import { FinanceOverlay } from './components/visualizations/FinanceOverlay';

export default function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Scene />
      <FinanceOverlay />
    </div>
  );
}