import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../Game';
import { useStateRef } from '../../utils/hook';
import './Enemy.module.scss';
import { useGameRef, useGameState, useGameTick } from '/Game';

export default function Enemy({ key = 'enemy', initialX = 400, initialY = 400, hp = 500, size = 80, children }) {
   const enemyRef = useGameRef(key, {});
   const [x, setX, xRef] = useGameState('x', initialX, enemyRef);
   const [y, setY, yRef] = useGameState('y', initialY, enemyRef);
   const [damage, setDamage, damageRef] = useGameState('damage', 0, enemyRef);
   const [castLength, setCastLength] = useState(null);
   const [castProgress, setCastProgress] = useState(0);
   const [castName, setCastName] = useState('');
   const { onGameOver } = useContext(GameContext);

   // damage
   useGameTick((state, keyInput) => {
      const player = state.player.current;
      const d = Math.sqrt(Math.pow(player.x.current - xRef.current, 2) + Math.pow(player.y.current - yRef.current, 2));
      if (d <= size + 5 && state.attacking.current) {
         setDamage(damageRef.current + 1);
      }
   }, []);

   // cast
   useGameTick((state, keyInput) => {
      const time = state.time.current;
      let casting = false;
      React.Children.forEach(children, (child) => {
         const { castBegin, castEnd, castName, hitTime } = actualChildProps(child);
         if (time >= hitTime + castBegin && time < hitTime + castEnd) {
            setCastLength(castEnd - castBegin);
            setCastProgress(time - (hitTime + castBegin));
            setCastName(castName);
            casting = true;
         }
      });
      if (!casting) {
         setCastLength(null);
      }
   })

   // kill
   useEffect(() => {
      if (damage >= hp) {
         onGameOver(true);
      }
   }, [damage, hp]);

   return (
      <div styleName="position-wrapper" style={{ left: x, top: y }}>
         <div style={{ width: size * 6.4, height: 4, left: -size * 3.2, top: -size * 1.4 - 20 }} styleName="hpbar">
            <div styleName="health" style={{ width: `${(hp - damage) / hp * 100}%` }} />
         </div>
         {castLength !== null && (
            <div style={{ width: size * 2.4, height: 20, left: size * 0.8, top: -size * 1.2 - 20 }} styleName="castbar">
               <div styleName="cast-progress" style={{ width: `${castProgress / castLength * 100}%` }} />
               <div styleName="text">{castName}</div>
            </div>
         )}
         <div style={{ width: size * 2, height: size * 2, left: -size, top: -size }} styleName="enemy" />
         <div styleName="position-wrapper" style={{ left: -x, top: -y }}>
            {React.Children.map(children, child => React.cloneElement(child, { casterX: x, casterY: y }))}
         </div>
      </div>
   );
};

function actualChildProps(child) {
   if (child.type.name === 'Select') {
      console.log(child);
      const grandchild = child.children[child.props.index];
      const getProperty = (key, defaultValue) => {
         if (Object.hasOwnProperty(child.props, key)) {
            return child.props[key];
         } else if (Object.hasOwnProperty(grandchild.props, key)) {
            return grandchild.props[key];
         } else {
            return defaultValue;
         }
      }
      return [['castBegin', 0], ['castEnd', 0], [castName, ''], [hitTime, null]]
         .reduce((res, params) => (res[params[0]] = getProperty(...params), res), {});
   }
   const { castBegin = 0, castEnd = 0, castName = "", hitTime } = child.props;
   return { castBegin, castEnd, castName, hitTime };
}