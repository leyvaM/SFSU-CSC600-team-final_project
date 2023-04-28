// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

function randomColor() {
  let o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
}

export const BeatDetector = new Visualizer(
  "Flashing Lights",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(randomColor());
    p5.stroke(randomColor());
    p5.strokeWeight(dim / 200);
    p5.noFill();

    const values = analyzer.getValue();
    const numSides = values.length;
    const angleIncrement = p5.TWO_PI / numSides;
    const radius = dim / 2;
    const numKaleidoscopes = 5;
    for (let i = 0; i < numKaleidoscopes; i++) {
      const x = p5.random(width);
      const y = p5.random(height);
      const angleOffset = p5.random(p5.TWO_PI);
      const scale = p5.random(0.5, 1.5);
      p5.push();
      p5.translate(x, y);
      p5.rotate(angleOffset);
      p5.scale(scale);
      p5.beginShape();
      for (let j = 0; j < values.length; j++) {
        const value = values[j] as number;
        const xx = p5.map(j, 0, values.length - 1, 0, radius);
        const yy = p5.map(value, -1, 1, -radius, radius) * p5.random(0.5, 1.5);
        p5.vertex(xx, yy);
      }
      p5.endShape(p5.CLOSE);
      p5.pop();
    }
  },
);

