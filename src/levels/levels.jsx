import React from 'react';
import Level0 from './Level0';
import Level1 from './Level1';

const levels = {
   'level0': {
      totalTime: 10,
      objects: <Level0 />,
   },
   'level1': {
      totalTime: 40,
      objects: <Level1 />,
   },
};

export {
   levels,
};
