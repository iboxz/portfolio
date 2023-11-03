import { noisyLinesBackground } from "./threejs-toys.module.cdn.min.js";

noisyLinesBackground({
  el: document.getElementById("ParticlesCursor"),
  colors: [0x000000, 0xffffff],
  minStroke: 1,
  maxStroke: 2,
  timeCoef: 0.0002,
  coordScale: 2,
  displacementScale: 0.02,
});
