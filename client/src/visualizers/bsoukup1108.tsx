/*import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

const barCount = 10; // Number of bars in the visualizer
const barWidth = 20; // Width of each bar in pixels
const barGap = 5; // Gap between bars in pixels
const barMaxHeight = 200; // Maximum height of a bar in pixels

export const BarVisualizer = new Visualizer(
  'Bar',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0);

    const dataArray = analyzer.getValue();
    const values = dataArray.length;
    const step = Math.floor(dataArray.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const start = i * step;
      const end = (i + 1) * step;
      let sum = 0;

     for (let j = start; j < end; j++) {
        sum += dataArray[j];
      }

      const average = sum / step;
      const barHeight = (average / 255) * barMaxHeight;
      const barX = (width / barCount) * i;
      const barY = height - barHeight;

      p5.fill(255);
      p5.noStroke();
      p5.rect(barX, barY, barWidth, barHeight);
    }
  },
);*/

export {};