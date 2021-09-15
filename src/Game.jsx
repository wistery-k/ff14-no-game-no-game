import React, { useContext, useEffect, useRef, useState } from 'react';
import BattleField from './BattleField';
import Timer from './Timer';
import { useTickHandlers, useValueRef } from './utils/hook';
import { useKeyInput } from './utils/keyinput';

const calcBotPos = (x) => {
   const a = x % 750;
   const b = Math.floor(x / 750);
   if (b % 2 == 0) {
      return a;
   }
   return 750 - a;
}

export default function Game({ running, level, onGameOver }) {
   const runningRef = useValueRef(running);
   const gameStateRef = useRef({});
   const keyInputRef = useKeyInput([87, 65, 83, 68]);
   const addTickHandler = useTickHandlers(runningRef, gameStateRef, keyInputRef);
   return (
      <GameContext.Provider value={{ level, gameStateRef, addTickHandler, running, onGameOver }}>
         <_Game />
      </GameContext.Provider>
   )
}

function _Game() {
   const [time, setTime, timeRef] = useGameState('time', -5);
   const [attacking, setAttacking, attackingRef] = useGameState('attacking', false);
   const [strafeBotX, setStrafeBotX, strafeBotXRef] = useGameState('strafeBotX', 0);
   const [strafeBotSpeed, setStrafeBotSpeed, strafeBotSpeedRef] = useGameState('strafeBotSpeed', 3);

   useGameTick((state, keyInput) => {
      console.log("AAA");
      setTime(timeRef.current + 1 / 60);

      console.log(strafeBotXRef.current);

      setStrafeBotX(strafeBotXRef.current + strafeBotSpeedRef.current);
   }, []);

   const strafeBotWidth = 50;

   const onMouseOver = () => {
      setAttacking(true);
   };
   const onMouseOut = () => {
      setAttacking(false);
   };

   return (
      <div>
         <BattleField time={time} />
         <Timer time={time} />
         <div style={{ backgroundColor: "lightgray", width: '800px', height: '50px', border: '1px solid black' }}>
            <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={{ width: `${strafeBotWidth}px`, marginLeft: calcBotPos(strafeBotX), backgroundColor: 'red', height: '50px' }}>{' '}</div>
         </div>
      </div>
   );
};

const GameContext = React.createContext();

function useInitialize(setValue, initialValue) {
   const { running } = useContext(GameContext);
   useEffect(() => {
      if (running) {
         setValue(initialValue);
      }
   }, [running]);
}

function useGameRef(key, initialValue, parent = null) {
   const ref = useRef(initialValue);
   if (parent === null) {
      const { gameStateRef } = useContext(GameContext);
      parent = gameStateRef;
   }
   parent.current[key] = ref;
   return ref;
}

function useGameState(key, initialValue, parent = null) {
   const [value, setValue] = useState(initialValue);
   const ref = useValueRef(value);
   if (parent === null) {
      const { gameStateRef } = useContext(GameContext);
      parent = gameStateRef;
   }
   parent.current[key] = ref;

   // initialize
   useInitialize(setValue, initialValue);

   return [value, setValue, ref];
}

function useInitializedState(initialValue) {
   const [value, setValue] = useState(initialValue);
   useInitialize(setValue, initialValue);
   return [value, setValue];
}

function useGameTick(handler, ...args) {
   const { addTickHandler } = useContext(GameContext);
   useEffect(() => {
      return addTickHandler(handler);
   }, ...args);
}

export {
   GameContext,
   useGameRef,
   useGameState,
   useGameTick,
   useInitialize,
   useInitializedState,
};
