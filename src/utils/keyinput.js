const { useRef, useEffect } = require("react");

function useKeyInput(keys) {
   const keyInputRef = useRef(Object.fromEntries(keys.map((key) => [key, false])));
   useEffect(() => {
      const onKeyDown = (e) => { 
         if (keys.includes(e.keyCode)) {
            keyInputRef.current[e.keyCode] = true;
         }
      }
      const onKeyUp = (e) => {
         if (keys.includes(e.keyCode)) {
            keyInputRef.current[e.keyCode] = false;
         }
      }
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
      return () => {
         window.removeEventListener('keydown', onKeyDown);
         window.removeEventListener('keyup', onKeyUp);
      }
   }, []);
   return keyInputRef;
}

export {
   useKeyInput,
};