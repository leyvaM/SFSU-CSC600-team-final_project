//Chris Torrez
// 3rd party library imports; 
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

function ampColor(amplitude: number) {
  let o = Math.round, r = Math.random, s = 100;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
}

export const ElectricWaveform = new Visualizer(
  'ColorForm',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 75);

    //p5.strokeWeight(dim * 0.01);
    p5.stroke(200, 200, 0, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * (height * 5);
      p5.strokeWeight(5);
      // Place vertex
      p5.vertex(x + 350 + amplitude, y);
    }
    p5.endShape();
  },
);
