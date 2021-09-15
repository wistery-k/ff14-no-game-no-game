import classNames from 'classnames';
import React, { useState } from 'react';
import Aoe from './Aoe';
import './LunarDynamo.module.scss';
import { distance } from '/utils/math';

export default function LunarDynamo(props) {
   const { size, size2, casterX, casterY } = props;
   const [hidden, setHidden] = useState(true);

   const hitFunction = (state) => {
      const player = state.player.current;
      const playerX = player.x.current;
      const playerY = player.y.current;
      const d = distance(casterX, casterY, playerX, playerY);
      return size < d && d < size2;
   }

   const styleName = classNames({
      'position-wrapper': true,
      hidden,
   });

   return (
      <Aoe {...props} hitFunction={hitFunction} setHidden={setHidden}>
         <div style={{left: casterX, top: casterY}} styleName={styleName}>
            <div style={{width: size * 2, height: size * 2, left: -size, top: -size, boxShadow: `0 0 0 ${size2 - size}px rgba(216, 150, 74, 0.4)`}} styleName="aoe">
            </div>
         </div>
      </Aoe>
   );
};