import React, { useState } from 'react'
import './App.module.scss';
import Game from './Game';
import { levels } from './levels/levels';

export default function App() {
   const [levelId, setLevelId] = useState('level0');
   const [running, setRunning] = useState(false);
   const [gameClear, setGameClear] = useState(null);

   const onChangeLevel = (levelId) => {
      setLevelId(levelId);
   }

   const onGameOver = (gameClear = false) => {
      setRunning(false);
      setGameClear(gameClear);
   }

   const gameStart = () => {
      setGameClear(null);
      setRunning(true);
   }
   
   return (
      <div styleName="root">
         <Game level={levels[levelId]} running={running} onGameOver={onGameOver} />
         <div>
            <div>
               <select disabled={running} value={levelId} onChange={(e) => onChangeLevel(e.target.value)}>
                  <option value="level0">Level 0: 木人討滅戦</option>
                  <option value="level1">Level 1: ダイナモチャリオット</option>
               </select>
            </div>
            <div>
               <button disabled={running} onClick={gameStart}>スタート</button>
            </div>
            <div>
               {gameClear !== null && <div>{gameClear ? 'You win!' : 'You lose...'}</div>}
            </div>
         </div>
      </div>
   );
};