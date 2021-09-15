import React, { useContext } from 'react'
import './BattleField.module.scss';
import { GameContext } from './Game';

export default function BattleField({ time }) {
   const { level } = useContext(GameContext);

   const showCountdown = time < 0 && time > -5;
   const countdownDigit = Math.ceil(-time);
   const countdownSize = 100 - 30 * (countdownDigit + time);

   return (
      <div styleName="root">
         {level.objects}
         {showCountdown && (
            <div styleName="countdown-wrapper">
               <div styleName="countdown" style={{fontSize: countdownSize}}>{countdownDigit}</div>
            </div>
         )}
      </div>
   );
};