import React from 'react';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <div className="workshop-loading">
      <div>LOADING WORKSHOP</div>
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
