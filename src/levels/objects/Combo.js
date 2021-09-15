import React from 'react';

export default function Combo({ children, ...rest }) {
   return React.Children.map(children, (child) => {
      const newProps = {...rest};
      if (child.props.hitTime) {
         newProps.hitTime += child.props.hitTime;
      }
      return React.cloneElement(child, newProps);
   });
};