import P5 from "p5";
import * as Tone from "tone";
import { Visualizer } from "../Visualizers";

function randomColor(p5: P5) {
  return p5.color(p5.random(360), 100, 100);
}

export const BeatDetector = new Visualizer(
  "Flashing Lights",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0);

    const values = analyzer.getValue();
    const angleIncrement = p5.TWO_PI / values.length;

    const centerX = width / 2;
    const centerY = height / 2;

    p5.colorMode(p5.HSB, 360, 100, 100);

    for (let i = 0; i < values.length; i++) {
      const value = values[i] as number;

      const lineLength = p5.map(
        Math.abs(value),
        0,
        1,
        Math.max(width, height) / 11,
        Math.max(width, height)
      );

      const angle = angleIncrement * i;
      const endX = centerX + lineLength * Math.cos(angle);
      const endY = centerY + lineLength * Math.sin(angle);
      const color = p5.color(i * (360 / values.length), 100, 100);

      p5.stroke(color);
      p5.strokeWeight(5);
      p5.line(centerX, centerY, endX, endY);
    }

    for (let i = 0; i < 5; i++) {
      const circleX = p5.random(width);
      const circleY = p5.random(height);
      const circleDiameter = p5.random(25, 100);
      const circleColor = randomColor(p5);

      p5.fill(circleColor);
      p5.noStroke();
      p5.ellipse(circleX, circleY, circleDiameter);
    }
  }
);
