import classNames from 'classnames';
import React, { useState } from 'react';
import Aoe from './Aoe';
import './IronChariot.module.scss';
import { distance } from '/utils/math';

export default function IronChariot(props) {
   const { size, casterX, casterY } = props;
   const [hidden, setHidden] = useState(true);

   const hitFunction = (state) => {
      const player = state.player.current;
      const playerX = player.x.current;
      const playerY = player.y.current;
      return distance(casterX, casterY, playerX, playerY) < size;
   }

   const styleName = classNames({
      'position-wrapper': true,
      hidden,
   });

   return (
      <Aoe {...props} hitFunction={hitFunction} setHidden={setHidden}>
         <div style={{left: casterX, top: casterY}} styleName={styleName}>
            <div style={{width: size * 2, height: size * 2, left: -size, top: -size}} styleName="aoe">
            </div>
         </div>
      </Aoe>
   );
};