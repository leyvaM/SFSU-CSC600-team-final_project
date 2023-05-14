import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const CircleVisualizer = new Visualizer(
  'Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dim = Math.min(width, height);

    p5.background(0);

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
    const amplitude = values[i] as number;
    const hue = p5.map(amplitude, 0, 1, 0, 360); 

    const radius = dim / 2 * amplitude;
    const x = width / 2.5;
    const y = height / 4;

    p5.noStroke();
    const nofillColor = p5.color(166, 189, 201);
    if (amplitude == 0){
      p5.ellipse(x, y, 200, 200);
      p5.fill(nofillColor);
    }
    else{
      const fillColor = p5.color(hue, 100, 100);
      p5.fill(fillColor);
    p5.ellipse(x, y, radius, radius);
    }
  }
},
  
);

