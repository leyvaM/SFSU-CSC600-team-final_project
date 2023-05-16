//Chris Torrez
// 3rd party library imports; 
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// function ampColor(amplitude: number) {
//   let o = Math.round, r = Math.random, s = 100;
//   return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
// }

export const ElectricWaveform = new Visualizer(
  'Electric Form',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    //adjusting the alpha keeps line lingering 
    p5.background(0, 0, 0, 75);

    //p5.strokeWeight(dim * 0.01);
    p5.stroke(200, 200, 0, 255); //yellow color
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      //swapped x and y values to create vertical line
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * (height * 5); //amplified "wiggle" of visual line
      p5.strokeWeight(5);
      // Place vertex
      p5.vertex(x + 350, y);
    }
    p5.endShape();
  },
);
