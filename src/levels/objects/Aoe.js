import { useContext, useState } from 'react';
import { GameContext, useGameTick } from '../../Game';

export default function Aoe({ hitTime, indicationBegin = -0.1, indicationEnd = 0, hitFunction, setHidden, children }) {
   const { onGameOver } = useContext(GameContext);
   const [done, setDone] = useState(false);
   useGameTick((state, keyInput) => {
      const time = state.time.current;
      setHidden(time < hitTime + indicationBegin || hitTime + indicationEnd < time);
      if (done) {
         return;
      }
      if (time >= hitTime) {
         if (hitFunction(state)) {
            onGameOver();
         }
         setDone(true);
      }
   }, [hitTime, indicationBegin, indicationEnd, hitFunction, setHidden, done]);

   return children;
};