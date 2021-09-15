import React, { useContext, useEffect } from 'react';
import { GameContext } from './Game';
import './Timer.module.scss';
import { clamp } from './utils/math';

export default function Timer({ time }) {
   const { level, onGameOver } = useContext(GameContext);
   useEffect(() => {
      if (time >= level.totalTime) {
         onGameOver();
      }
   }, [time]);

   return (
      <div styleName="root">
         <div styleName="progress" style={{width: `${clamp(time / level.totalTime, 0, 1) * 100}%`}} />
      </div>
   );
};