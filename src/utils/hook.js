import { useEffect, useRef, useState } from "react";

function useValueRef(value) {
   const ref = useRef(value);
   useEffect(() => {
      ref.current = value;
   }, [value]);
   return ref;
}

function useTickHandlers(runningRef, gameStateRef, keyInputRef) {
   const handlers = useRef([]);
   useEffect(() => {
      setInterval(() => {
         if (runningRef.current) {
            handlers.current.forEach(handler => {
               handler(gameStateRef.current, keyInputRef.current);
            });
         }
      }, 1000/60);
   }, []);
   return (handler) => {
      handlers.current.push(handler);
      return () => {
         handlers.current = handlers.current.filter(x => x !== handler);
      };
   };
}

function useStateRef(initialValue){
   const [value, setValue] = useState(initialValue);
   const ref = useValueRef(value);
   return [value, setValue, ref];
}

export {
   useStateRef,
   useTickHandlers,
   useValueRef,
};