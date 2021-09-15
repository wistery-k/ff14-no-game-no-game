function clamp(x, min, max) {
   if (min !== null && x < min) {
      x = min;
   }
   if (max !== null && x > max) {
      x = max;
   }
   return x;
}

function distance(x1, y1, x2, y2) {
   return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export {
   clamp,
   distance,
};