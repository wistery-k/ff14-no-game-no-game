import React, { useContext, useEffect, useRef, useState } from 'react';
import BattleField from './BattleField';
import Timer from './Timer';
import { useTickHandlers, useValueRef } from './utils/hook';
import { useKeyInput } from './utils/keyinput';

export default function Game({ running, level, onGameOver}) {
   const runningRef = useValueRef(running);
   const gameStateRef = useRef({});
   const keyInputRef = useKeyInput([87, 65, 83, 68]);
   const addTickHandler = useTickHandlers(runningRef, gameStateRef, keyInputRef);
   return (
      <GameContext.Provider value={{level, gameStateRef, addTickHandler, running, onGameOver}}>
         <_Game />
      </GameContext.Provider>
   )   
}

function _Game() {
   const [time, setTime, timeRef] = useGameState('time', -5);
   
   useGameTick((state, keyInput) => {
      setTime(timeRef.current + 1/60);
   }, []);

   return (
      <div>
         <BattleField time={time} />
         <Timer time={time} />
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
