import React from 'react';
import './Player.module.scss';
import { useGameRef, useGameState, useGameTick } from '/Game';

export default function Player({ key = 'player', initialX = 400, initialY = 600, initialSpeed = 2.4 }) {
   const playerRef = useGameRef(key, {});
   const [x, setX, xRef] = useGameState('x', initialX, playerRef);
   const [y, setY, yRef] = useGameState('y', initialY, playerRef);
   const [speed, setSpeed, speedRef] = useGameState('speed', initialSpeed, playerRef);

   // tick
   useGameTick((state, keyInput) => {
      if (state.time.current >= 0) {
         let dx = keyInput[68] /* d */ - keyInput[65] /* a */
         let dy = keyInput[83] /* s */ - keyInput[87] /* w */
         dx *= speedRef.current;
         dy *= speedRef.current;
         if (dx !== 0 && dy !== 0) {
            dx /= Math.sqrt(2);
            dy /= Math.sqrt(2);
         }
         setX(xRef.current + dx);
         setY(yRef.current + dy);
      }
   }, []);

   return (
      <div styleName="position-wrapper" style={{left: x, top: y}}>
         <div styleName="player-wrapper">
            <div styleName="player" />
         </div>
      </div>
   );
};