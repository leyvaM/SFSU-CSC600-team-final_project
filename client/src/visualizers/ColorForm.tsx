// 3rd party library imports; 
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

function ampColor(amplitude: number) {
  let o = Math.round, r = Math.random, s = 100;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
}

export const ColorFormVisualizer = new Visualizer(
  'ColorForm',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(100, 100, 100, 100);

    //p5.strokeWeight(dim * 0.01);
    p5.stroke('blue');
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * (height);
      p5.strokeWeight(dim * 0.0003 * x);
      // Place vertex
      p5.vertex(x + 350, y);
    }
    p5.endShape();
  },
);
